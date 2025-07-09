
import { Router } from 'express'
// import { supabase } from '../config/supabase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get dashboard data
router.get('/', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    // TODO: Replace all supabase DB queries with MySQL queries
    // Get crop count
    const cropCount = 0 // Placeholder
    
    // Get latest scan
    const latestScan = null // Placeholder
    
    // Calculate disease risk
    const diseaseCount = 0 // Placeholder
    const totalScans = 0 // Placeholder
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
