'use server';

import { createClient } from '@supabase/supabase-js';

export async function signOut() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  await supabase.auth.signOut();
}