
import { Router } from 'express'
import { supabase } from '../config/supabase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get dashboard data
router.get('/', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    // Get crop count
    const { count: cropCount } = await supabase
      .from('crop_scans')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.id)
    
    // Get latest scan
    const { data: latestScan } = await supabase
      .from('crop_scans')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    // Calculate disease risk
    const { data: recentScans } = await supabase
      .from('crop_scans')
      .select('is_healthy')
      .eq('user_id', req.user.id)
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    
    const diseaseCount = recentScans?.filter(scan => !scan.is_healthy).length || 0
    const totalScans = recentScans?.length || 0
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
