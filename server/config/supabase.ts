import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Warning: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set. Some features may not work.')
  // Create a mock client for development
  const mockSupabase = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
    auth: {
      signUp: () => ({ data: { user: null }, error: null }),
      signInWithPassword: () => ({ data: { user: null }, error: null }),
      signOut: () => ({ error: null }),
      getUser: () => ({ data: { user: null }, error: null }),
    },
  }
  module.exports = mockSupabase
} else {
  
export const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-node'
    }
  }
})

// Also export regular supabase client for consistency with other files
export const supabase = createClient(supabaseUrl, supabaseServiceKey)
}