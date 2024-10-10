import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getAuth } from '@clerk/nextjs/server'; // Use Clerk's server-side auth

// This function can be used to protect API routes
export const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { sessionId, userId } = getAuth(req);

    // Check if the user is authenticated
    if (!sessionId || !userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // If authenticated, proceed with the original handler
    return handler(req, res);
  };
};
