import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../supabase/client';

export default async function getAllTeams(req: NextApiRequest, res: NextApiResponse) {
    const { data, error } = await supabase.from('teams').select('*');

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
}

export default async function createTeam(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, description } = req.body;
        const { data, error } = await supabase.from('teams').insert([{ name, description }]);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(201).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
}