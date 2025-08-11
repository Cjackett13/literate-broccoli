
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_AI_Student_Journal_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;