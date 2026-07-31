import { createClient } from '@supabase/supabase-js'

const URL = 'https://kxleqziyqxfsnbtfpxug.supabase.co'
const API_KEY = 'sb_publishable_EwwtsJ4RkbO-K2hxRx5eBA_yH86pFmg'

export const supabase = createClient(URL, API_KEY)