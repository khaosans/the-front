import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getAuth } from '@clerk/nextjs/server'; // Use Clerk's server-side auth
import { kvClient } from '@/app/lib/kvClient'; // Ensure this path is correct

// This function can be used to protect API routes
export const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { sessionId, userId } = getAuth(req);

    // Check if the user is authenticated
    if (!sessionId || !userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Example of using the KV client
    try {
      const userSession = await kvClient.get(`session:${sessionId}`);
      if (!userSession) {
        return res.status(401).json({ message: 'Session not found in KV store' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error accessing KV store' });
    }

    // If authenticated, proceed with the original handler
    return handler(req, res);
  };
};
