// src/pages/api/articles.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import clientPromise from '@/lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('mydatabase');
      const collection = db.collection('articles');

      const result = await collection.insertOne({
        title,
        content,
        authorEmail: session.user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json({ _id: result.insertedId, title, content, authorEmail: session.user.email });
    } catch (error) {
      console.error('Failed to insert article:', error);
      res.status(500).json({ error: 'Failed to insert article' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
