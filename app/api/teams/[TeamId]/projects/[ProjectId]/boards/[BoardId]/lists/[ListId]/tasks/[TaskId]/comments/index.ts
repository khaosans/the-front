import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../../../supabase/client';

export default async function addComment(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { TaskId } = req.query;
        const { comment } = req.body;
        const { data, error } = await supabase
            .from('comments')
            .insert([{ task_id: TaskId, comment }]);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(201).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
}