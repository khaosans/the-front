import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../supabase/client';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const { user, error } = await supabase.auth.signUp({ email, password });

        if (error) return res.status(400).json({ error: error.message });
        return res.status(201).json({ user });
    }
    return res.status(405).json({ error: 'Method not allowed' });
}