
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''

// For server-side operations (admin access)
export const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

// For client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabaseClient
