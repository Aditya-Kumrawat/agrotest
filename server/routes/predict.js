// routes/predict.js
import express from 'express'
import multer from 'multer'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const form = new FormData()
    form.append('file', fs.createReadStream(req.file.path))

    const response = await axios.post('http://localhost:5050/predict', form, {
      headers: form.getHeaders()
    })

    fs.unlinkSync(req.file.path) // remove temp image

    const prediction = response.data

    // Optionally: Insert into MySQL here using your `pool.query(...)`
    res.json(prediction)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Prediction failed' })
  }
})

export default router
