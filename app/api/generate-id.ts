import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const serverSecret = process.env.SERVER_SECRET || 'default-secret';

    const userId = crypto.randomUUID();

    const hash = crypto.createHash('sha256');
    hash.update(userId + serverSecret);
    const hashedId = hash.digest('hex');

    res.status(200).json({ userId: hashedId });
}
