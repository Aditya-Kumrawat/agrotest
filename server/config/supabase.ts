
// server/config/supabase.ts

import dotenv from 'dotenv'
import path from 'path'

// Load .env from root before accessing process.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error('SUPABASE_URL environment variable is required')
  console.log('Please add SUPABASE_URL to your .env file')
}
if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is required')
  console.log('Please add SUPABASE_SERVICE_ROLE_KEY to your .env file')
}
if (!supabaseAnonKey) {
  console.error('SUPABASE_ANON_KEY environment variable is required')
  console.log('Please add SUPABASE_ANON_KEY to your .env file')
}

// ✅ Server-side (admin-level access)
export const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

// ✅ Client-side (limited access)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabaseClient
