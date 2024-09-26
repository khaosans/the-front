import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user, error } = await supabase.auth.api.getUserByCookie(req);
    
    if (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    return res.status(200).json({ user });
}