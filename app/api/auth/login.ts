import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../supabase/client';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const { user, error } = await supabase.auth.signIn({ email, password });

        if (error) return res.status(401).json({ error: error.message });
        return res.status(200).json({ user });
    }
    return res.status(405).json({ error: 'Method not allowed' });
}