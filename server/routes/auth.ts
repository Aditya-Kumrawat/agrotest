
import { Router } from 'express'
import { supabaseClient } from '../config/supabase'

const router = Router()

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body
    
    // Input validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }
    
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
      console.error('Signup error:', error.message)
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ user: data.user, session: data.session })
  } catch (error) {
    console.error('Signup server error:', error)
    res.status(500).json({ error: 'Server error during signup' })
  }
})

// Sign in
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('Signin error:', error.message)
      return res.status(400).json({ error: error.message })
    }
    
    res.json({ user: data.user, session: data.session })
  } catch (error) {
    console.error('Signin server error:', error)
    res.status(500).json({ error: 'Server error during signin' })
  }
})

// Sign out
router.post('/signout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (token) {
      const { error } = await supabaseClient.auth.signOut()
      
      if (error) {
        console.error('Signout error:', error.message)
        return res.status(400).json({ error: error.message })
      }
    }
    
    res.json({ message: 'Signed out successfully' })
  } catch (error) {
    console.error('Signout server error:', error)
    res.status(500).json({ error: 'Server error during signout' })
  }
})

export default router
