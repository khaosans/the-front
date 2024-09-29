import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../supabase/client';

export default async function getNotifications(req: NextApiRequest, res: NextApiResponse) {
    const { user } = await supabase.auth.getUser();

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
}