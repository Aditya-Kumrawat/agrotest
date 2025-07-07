
import { Router } from 'express'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Chat with bot
router.post('/chat', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { message } = req.body
    
    // Simple rule-based chatbot (replace with OpenAI integration if needed)
    const response = generateBotResponse(message.toLowerCase())
    
    res.json({ 
      response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

function generateBotResponse(message: string): string {
  // Simple keyword-based responses
  if (message.includes('disease') || message.includes('pest')) {
    return "I can help you identify crop diseases! Upload a photo of your crop leaves for AI-powered diagnosis. Common signs include yellowing, spots, or wilting."
  }
  
  if (message.includes('weather') || message.includes('forecast')) {
    return "Check the Forecast section for 7-day weather predictions and disease risk assessment based on humidity and temperature conditions."
  }
  
  if (message.includes('fertilizer') || message.includes('nutrition')) {
    return "For proper nutrition, ensure balanced NPK fertilizers. Organic compost improves soil health. Soil testing helps determine specific nutrient needs."
  }
  
  if (message.includes('watering') || message.includes('irrigation')) {
    return "Water early morning or evening to reduce evaporation. Drip irrigation is most efficient. Avoid overwatering which can cause root rot."
  }
  
  if (message.includes('harvest') || message.includes('when')) {
    return "Harvest timing depends on the crop. Look for visual cues like color change, firmness, and maturity indicators specific to your crop type."
  }
  
  if (message.includes('hello') || message.includes('hi')) {
    return "Hello! I'm your AgroSaarthi assistant. I can help with crop diseases, farming tips, weather advice, and more. What would you like to know?"
  }
  
  return "I'm here to help with your farming questions! You can ask me about crop diseases, weather conditions, fertilizers, irrigation, or harvest timing. Try uploading a crop image for disease diagnosis!"
}

export default router
