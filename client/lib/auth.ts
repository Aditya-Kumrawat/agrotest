
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone
        }
      }
    })
    
    if (error) throw error
    return data
  },

  // Sign in
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    
    // Store auth state
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(data.user))
    
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    
    // Clear local storage
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    
    if (error) throw error
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
