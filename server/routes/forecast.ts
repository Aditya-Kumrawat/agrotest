
import { Router } from 'express'
import axios from 'axios'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get weather forecast and disease risk
router.get('/', authenticateUser, async (req: any, res) => {
  try {
    const { lat, lng } = req.query
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude required' })
    }
    
    // Fetch weather data from Open-Meteo
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast`,
      {
        params: {
          latitude: lat,
          longitude: lng,
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,humidity_relative_2m_mean',
          forecast_days: 7
        }
      }
    )
    
    const weatherData = weatherResponse.data.daily
    const forecast = []
    
    for (let i = 0; i < 7; i++) {
      const date = weatherData.time[i]
      const maxTemp = weatherData.temperature_2m_max[i]
      const minTemp = weatherData.temperature_2m_min[i]
      const precipitation = weatherData.precipitation_sum[i]
      const humidity = weatherData.humidity_relative_2m_mean[i]
      
      const riskLevel = calculateDiseaseRisk(maxTemp, minTemp, precipitation, humidity)
      const preventiveActions = getPreventiveActions(riskLevel)
      
      forecast.push({
        date,
        maxTemp,
        minTemp,
        precipitation,
        humidity,
        riskLevel,
        preventiveActions
      })
    }
    
    res.json({ forecast })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})

function calculateDiseaseRisk(maxTemp: number, minTemp: number, precipitation: number, humidity: number): string {
  // Simple disease risk calculation based on weather conditions
  let riskScore = 0
  
  // High humidity increases risk
  if (humidity > 80) riskScore += 3
  else if (humidity > 60) riskScore += 2
  else if (humidity > 40) riskScore += 1
  
  // Moderate temperatures with moisture increase risk
  if (maxTemp > 20 && maxTemp < 30 && precipitation > 5) riskScore += 2
  
  // High precipitation increases risk
  if (precipitation > 10) riskScore += 2
  else if (precipitation > 5) riskScore += 1
  
  if (riskScore >= 5) return 'High'
  if (riskScore >= 3) return 'Medium'
  return 'Low'
}

function getPreventiveActions(riskLevel: string): string[] {
  switch (riskLevel) {
    case 'High':
      return [
        'Apply preventive fungicide spray',
        'Improve field drainage',
        'Increase air circulation',
        'Monitor crops twice daily'
      ]
    case 'Medium':
      return [
        'Monitor crops daily',
        'Ensure proper spacing',
        'Apply organic preventive treatments'
      ]
    default:
      return [
        'Continue regular monitoring',
        'Maintain good field hygiene'
      ]
  }
}

export default router
