
import { Router } from 'express'
import { supabaseClient } from '../config/supabase'

const router = Router()

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body
    
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone
        }
      }
    })
    
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ user: data.user, session: data.session })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Sign in
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ user: data.user, session: data.session })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Sign out
router.post('/signout', async (req, res) => {
  try {
    const { error } = await supabaseClient.auth.signOut()
    
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ message: 'Signed out successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
