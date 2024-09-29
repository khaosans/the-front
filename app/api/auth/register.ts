import { NextApiRequest, NextApiResponse } from 'next';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Your registration logic here
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
