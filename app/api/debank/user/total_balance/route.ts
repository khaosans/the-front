import type { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from 'app/middleware/authMiddleware'; // Updated to absolute path

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Your existing API logic here
  res.status(200).json({ message: 'Success' });
};

export default authMiddleware(handler);
