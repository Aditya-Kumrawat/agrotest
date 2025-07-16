
import { Router } from 'express'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { db } from '../config/firebase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get dashboard data
router.get('/', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    // Get crop count (assuming you have a crops collection)
    const cropsQuery = query(
      collection(db, "crops"),
      where("userId", "==", req.user.id)
    );
    const cropsSnapshot = await getDocs(cropsQuery);
    const cropCount = cropsSnapshot.docs.length;
    
    // Get latest scan
    const latestScanQuery = query(
      collection(db, "diagnosis_history"),
      where("userId", "==", req.user.id),
      orderBy("upload_date", "desc"),
      limit(1)
    );
    const latestScanSnapshot = await getDocs(latestScanQuery);
    const latestScan = latestScanSnapshot.docs.length > 0 ? 
      { id: latestScanSnapshot.docs[0].id, ...latestScanSnapshot.docs[0].data() } : null;
    
    // Calculate disease risk
    const allScansQuery = query(
      collection(db, "diagnosis_history"),
      where("userId", "==", req.user.id)
    );
    const allScansSnapshot = await getDocs(allScansQuery);
    const allScans = allScansSnapshot.docs.map(doc => doc.data());
    
    const diseaseCount = allScans.filter(scan => !scan.is_healthy).length;
    const totalScans = allScans.length;
    const riskLevel = calculateRiskLevel(diseaseCount, totalScans)
    
    // Get local disease map data
    const diseaseMap = await getLocalDiseaseMap()
    
    // Get crop calendar
    const cropCalendar = getCropCalendar()
    
    res.json({
      cropCount: cropCount || 0,
      riskLevel,
      latestScan,
      diseaseMap,
      cropCalendar,
      stats: {
        totalScans,
        healthyScans: totalScans - diseaseCount,
        diseaseScans: diseaseCount
      }
    })
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' })
  }
})

function calculateRiskLevel(diseaseCount: number, totalScans: number): string {
  if (totalScans === 0) return 'Low'
  const ratio = diseaseCount / totalScans
  if (ratio >= 0.5) return 'High'
  if (ratio >= 0.3) return 'Medium'
  return 'Low'
}

async function getLocalDiseaseMap() {
  // Simulate local disease data
  return [
    { lat: 28.6139, lng: 77.2090, severity: 'High', disease: 'Leaf Blight' },
    { lat: 28.6169, lng: 77.2060, severity: 'Medium', disease: 'Powdery Mildew' },
    { lat: 28.6109, lng: 77.2120, severity: 'Low', disease: 'Rust' }
  ]
}

function getCropCalendar() {
  return [
    { crop: 'Wheat', stage: 'Growth', daysRemaining: 45 },
    { crop: 'Rice', stage: 'Planting', daysRemaining: 15 },
    { crop: 'Maize', stage: 'Harvest', daysRemaining: 7 }
  ]
}

export default router
