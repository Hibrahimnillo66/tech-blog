// src/lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri: string = process.env.MONGODB_URI || '';

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the client is not recreated on every hot reload
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a separate module,
// the client can be shared across functions.
export default clientPromise;
