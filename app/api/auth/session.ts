import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!session) {
        return res.status(401).json({ error: 'No active session' });
    }

    return res.status(200).json({ user: session.user });
}