import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseKey!)

export type WaitlistEntry = {
  id?: number
  name: string
  email: string
  phone: string
  insurances: string[]
  problem?: string
  created_at?: string
}
