import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // If the user is logged in, redirect to the board page
    redirect('/board');
  } else {
    // If the user is not logged in, redirect to the login page
    redirect('/login');
  }

  // This return statement will never be reached, but it's needed to satisfy TypeScript
  return null;
}