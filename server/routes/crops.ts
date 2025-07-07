
import { Router } from 'express'
import { supabase } from '../config/supabase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'
import multer from 'multer'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

// Upload crop scan
router.post('/scan', authenticateUser, upload.single('image'), async (req: AuthenticatedRequest, res) => {
  try {
    const { cropType, location, fieldName } = req.body
    const file = req.file
    
    if (!file) {
      return res.status(400).json({ error: 'No image provided' })
    }
    
    // Upload image to Supabase Storage
    const fileName = `crop-scans/${req.user.id}/${Date.now()}-${file.originalname}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('crop-images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype
      })
    
    if (uploadError) {
      return res.status(400).json({ error: uploadError.message })
    }
    
    // Simulate AI diagnosis (replace with actual AI service)
    const aiResult = simulateAIDiagnosis(cropType)
    
    // Store scan data in database
    const { data: scanData, error: dbError } = await supabase
      .from('crop_scans')
      .insert({
        user_id: req.user.id,
        crop_type: cropType,
        location,
        field_name: fieldName,
        image_url: uploadData.path,
        ai_result: aiResult.disease,
        confidence_score: aiResult.confidence,
        is_healthy: aiResult.disease === 'Healthy',
        recommendations: aiResult.recommendations
      })
      .select()
      .single()
    
    if (dbError) {
      return res.status(400).json({ error: dbError.message })
    }
    
    res.json({ scan: scanData, aiResult })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get scan history
router.get('/history', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { disease_type, crop_type, action_taken } = req.query
    
    let query = supabase
      .from('crop_scans')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
    
    if (disease_type) {
      query = query.eq('ai_result', disease_type)
    }
    if (crop_type) {
      query = query.eq('crop_type', crop_type)
    }
    if (action_taken) {
      query = query.eq('action_taken', action_taken)
    }
    
    const { data, error } = await query
    
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ scans: data })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Update action taken
router.patch('/scan/:id/action', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params
    const { action_taken } = req.body
    
    const { data, error } = await supabase
      .from('crop_scans')
      .update({ action_taken })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single()
    
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ scan: data })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

function simulateAIDiagnosis(cropType: string) {
  const diseases = [
    'Healthy',
    'Leaf Blight',
    'Powdery Mildew',
    'Rust',
    'Bacterial Spot',
    'Viral Disease'
  ]
  
  const disease = diseases[Math.floor(Math.random() * diseases.length)]
  const confidence = Math.floor(Math.random() * 30) + 70 // 70-100%
  
  const recommendations = disease === 'Healthy' 
    ? ['Continue current care routine', 'Monitor regularly']
    : ['Apply appropriate fungicide', 'Improve air circulation', 'Remove affected leaves']
  
  return { disease, confidence, recommendations }
}

export default router
