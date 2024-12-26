import getAuth0Token from '@/services/authService';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tokenResponse = await getAuth0Token();
    res.status(200).json(tokenResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch token' });
  }
};

export default handler;