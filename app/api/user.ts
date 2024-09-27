import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate fetching user data
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
    return res.status(200).json(user);
  }

  if (req.method === 'POST') {
    // Simulate creating a user
    const { name, email } = req.body;
    return res.status(201).json({ id: 2, name, email });
  }

  return res.status(405).end(); // Method Not Allowed
}