import { Router } from 'express'
// import { supabase } from '../config/supabase'
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth'
import multer from 'multer'
import pool from '../config/mysql'

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
    
    // TODO: Replace Supabase storage upload with S3/local storage
    // TODO: Replace Supabase DB insert with MySQL insert
    
    // Simulate AI diagnosis (replace with actual AI service)
    const aiResult = simulateAIDiagnosis(cropType)
    
    // Store scan data in database
    // const { data: scanData, error: dbError } = await supabase
    //   .from('crop_scans')
    //   .insert({
    //     user_id: req.user.id,
    //     crop_type: cropType,
    //     location,
    //     field_name: fieldName,
    //     image_url: uploadData.path,
    //     ai_result: aiResult.disease,
    //     confidence_score: aiResult.confidence,
    //     is_healthy: aiResult.disease === 'Healthy',
    //     recommendations: aiResult.recommendations
    //   })
    //   .select()
    //   .single()
    
    // if (dbError) {
    //   return res.status(400).json({ error: dbError.message })
    // }
    
    res.json({ scan: null, aiResult }) // Placeholder for scan data
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get scan history
router.get('/history', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { disease_type, crop_type, action_taken } = req.query
    // TODO: Replace Supabase query with MySQL query
    let query = null // Placeholder for query
    if (disease_type) {
      // query = query.eq('ai_result', disease_type) // Placeholder for query
    }
    if (crop_type) {
      // query = query.eq('crop_type', crop_type) // Placeholder for query
    }
    if (action_taken) {
      // query = query.eq('action_taken', action_taken) // Placeholder for query
    }
    const data: any[] = [] // Placeholder for data
    
    // if (error) {
    //   return res.status(400).json({ error: error.message })
    // }
    
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
    
    // TODO: Replace Supabase update with MySQL update
    const data: any = {} // Placeholder for data
    
    // const { data, error } = null // Placeholder for data and error
    
    // if (error) {
    //   return res.status(400).json({ error: error.message })
    // }
    
    res.json({ scan: data })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/profile', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const { payload } = req.user
    const userId = (payload as any).id;
    const [rows]: any = await pool.query('SELECT id, email, name, phone FROM profiles WHERE id = ?', [userId]);
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ profile: rows[0] })
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
