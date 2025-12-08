import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xuflabtorzlrhdzemsfa.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_h9hh-B1NsjK_BpaIYW2RZg_kTp5egZH';

export const supabase = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
