import { NextApiRequest, NextApiResponse } from 'next';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createRouteHandlerClient({ cookies });
    // ... rest of your login logic
}