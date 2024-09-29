import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabase/client';

export default async function getCurrentUser(req: NextApiRequest, res: NextApiResponse) {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ user });
}
