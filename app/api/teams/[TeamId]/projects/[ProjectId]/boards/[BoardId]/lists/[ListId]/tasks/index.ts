import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase/client';

export default async function createTask(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { ListId } = req.query;
        const { title, description, status } = req.body;
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ title, description, status, list_id: ListId }]);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(201).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
}
