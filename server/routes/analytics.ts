import { Router } from 'express'
// import { supabase } from '../config/supabase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get analytics data
router.get('/', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    
    // TODO: Replace all supabase DB queries with MySQL queries
    // Get diseases detected this week
    const weeklyDiseases = []
    
    // Get all user scans for field health score
    const allScans: any[] = []
    
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
    res.status(500).json({ error: 'Server error' })
  }
})

async function getWeeklyScanData(userId: string) {
  const data = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString()
    
    // TODO: Replace all supabase DB queries with MySQL queries
    const count = 0
    
    data.push({
      date: date.toISOString().split('T')[0],
      scans: count || 0
    })
  }
  return data
}

async function getDiseaseBreakdown(userId: string) {
  // TODO: Replace all supabase DB queries with MySQL queries
  const data: any[] = []
  
  const breakdown: Record<string, number> = {}
  data?.forEach(scan => {
    breakdown[scan.ai_result] = (breakdown[scan.ai_result] || 0) + 1
  })
  
  return Object.entries(breakdown).map(([disease, count]) => ({
    disease,
    count
  }))
}

export default router
