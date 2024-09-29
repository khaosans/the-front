import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase/client';

export default async function searchTasks(req: NextApiRequest, res: NextApiResponse) {
    const { ListId } = req.query;
    const { searchTerm } = req.body;

    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .ilike('title', `%${searchTerm}%`)
        .eq('list_id', ListId);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
}
