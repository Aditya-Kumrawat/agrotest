
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface AuthUser {
  id: string
  email: string
  name?: string
  phone?: string
}

export const authService = {
  // Sign up
  async signUp(email: string, password: string, name: string, phone?: string) {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, phone })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }
      
      if (data.user) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      
      return data
    } catch (error) {
      throw error
    }
  },

  // Sign in
  async signIn(email: string, password: string) {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }
      
      if (data.user) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('session', JSON.stringify(data.session))
      }
      
      return data
    } catch (error) {
      throw error
    }
  },

  // Sign out
  async signOut() {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      // Clear local storage regardless of response
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      localStorage.removeItem('session')
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Signout failed')
      }
    } catch (error) {
      // Clear local storage even if request fails
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      localStorage.removeItem('session')
      throw error
    }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) throw error
    return user
  },

  // Get session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) throw error
    return session
  },

  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true'
  },

  // Get stored user
  getStoredUser(): AuthUser | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(session.user))
  } else if (event === 'SIGNED_OUT') {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }
})
