import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
    }
  }
}

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    cachedClient = client;
    return client;
  } catch (e) {
    console.error('Failed to connect to database:', e);
    throw new Error('Unable to connect to database');
  }
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db('Prakharbase');
    
    const blogs = await db
      .collection('blogs')
      .find({})
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(blogs, {
      headers: {
        'Cache-Control': 'no-store, max-age=0', // Disable caching
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Database error:', error.message);
    } else {
      console.error('Database error:', error);
    }

    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
