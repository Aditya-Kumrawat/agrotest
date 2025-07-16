
import { Router } from 'express'
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get analytics data
router.get('/', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    
    // Get diseases detected this week
    const weeklyDiseasesQuery = query(
      collection(db, "diagnosis_history"),
      where("userId", "==", req.user.id),
      where("upload_date", ">=", oneWeekAgo),
      where("is_healthy", "==", false)
    );
    const weeklyDiseasesSnapshot = await getDocs(weeklyDiseasesQuery);
    const weeklyDiseases = weeklyDiseasesSnapshot.docs;
    
    // Get all user scans for field health score
    const allScansQuery = query(
      collection(db, "diagnosis_history"),
      where("userId", "==", req.user.id)
    );
    const allScansSnapshot = await getDocs(allScansQuery);
    const allScans = allScansSnapshot.docs.map(doc => doc.data());
    
    const healthyCount = allScans?.filter(scan => scan.is_healthy).length || 0
    const totalScans = allScans?.length || 0
    const fieldHealthScore = totalScans > 0 ? Math.round((healthyCount / totalScans) * 100) : 100
    
    // Get weekly scan counts for graph
    const weeklyData = await getWeeklyScanData(req.user.id)
    
    // Get disease breakdown
    const diseaseBreakdown = await getDiseaseBreakdown(req.user.id)
    
    res.json({
      diseasesThisWeek: weeklyDiseases?.length || 0,
      fieldHealthScore,
      weeklyData,
      diseaseBreakdown,
      totalScans,
      healthyScans: healthyCount
    })
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Server error' })
  }
})

async function getWeeklyScanData(userId: string) {
  const data = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const startOfDay = new Date(date.setHours(0, 0, 0, 0))
    const endOfDay = new Date(date.setHours(23, 59, 59, 999))
    
    const q = query(
      collection(db, "diagnosis_history"),
      where("userId", "==", userId),
      where("upload_date", ">=", startOfDay),
      where("upload_date", "<=", endOfDay)
    );
    
    const snapshot = await getDocs(q);
    const count = snapshot.docs.length;
    
    data.push({
      date: date.toISOString().split('T')[0],
      scans: count || 0
    })
  }
  return data
}

async function getDiseaseBreakdown(userId: string) {
  const q = query(
    collection(db, "diagnosis_history"),
    where("userId", "==", userId),
    where("is_healthy", "==", false)
  );
  
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map(doc => doc.data());
  
  const breakdown: Record<string, number> = {}
  data?.forEach(scan => {
    breakdown[scan.disease_detected] = (breakdown[scan.disease_detected] || 0) + 1
  })
  
  return Object.entries(breakdown).map(([disease, count]) => ({
    disease,
    count
  }))
}

export default router
