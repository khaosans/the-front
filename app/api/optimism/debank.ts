import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    // Validate the wallet ID
    if (!id || typeof id !== 'string') {
      console.error("Invalid wallet ID:", id); // Log invalid wallet ID
      return res.status(400).json({ error: 'Invalid wallet ID' });
    }

    console.log("Received request for wallet ID:", id); // Log the received wallet ID

    try {
      const total_usd_value = await getTotalBalance(id as string); // Ensure id is treated as a string
      console.log("Total USD Value:", total_usd_value); // Log the total USD value
      res.status(200).json({ total_usd_value });
    } catch (error) {
      console.error("Error fetching balance:", error); // Log error
      res.status(500).json({ error: 'Failed to fetch balance data' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Function to fetch balance from Debank
async function getTotalBalance(walletId: string): Promise<number> {
  console.log("Fetching balance from Debank for wallet ID:", walletId); // Log the wallet ID being fetched
  const response = await fetch(`https://pro-openapi.debank.com/v1/user/total_balance?id=${walletId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.DEBANK_API_KEY}`, // Include the API key in the headers
    },
  });
  
  console.log("Debank API Response Status:", response.status); // Log Debank response status

  if (!response.ok) {
    const errorData = await response.json(); // Get error details
    console.error("Debank Error Response Data:", errorData); // Log error response data
    throw new Error('Failed to fetch data from Debank');
  }

  const data = await response.json();
  console.log("Debank Response Data:", data); // Log the response from Debank
  
  return data.total_usd_value || 0; // Return the total balance or 0 if not available
}