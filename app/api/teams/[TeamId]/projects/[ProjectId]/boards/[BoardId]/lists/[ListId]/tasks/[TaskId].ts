import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase/client';

export default async function deleteTask(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { TaskId } = req.query;
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', TaskId);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(204).send(null);
    }
    return res.status(405).json({ error: 'Method not allowed' });
}
