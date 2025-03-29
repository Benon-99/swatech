import { MongoClient, MongoClientOptions, Db } from 'mongodb';

// Connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'swatech_db';

// Connection options
const options: MongoClientOptions = {
  // Add your options here if needed
};

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  // If we have cached connections, use them
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // If no cached connection, create new connection
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri, options);
  }

  // Get database
  if (!cachedDb) {
    cachedDb = cachedClient.db(dbName);
  }

  return { client: cachedClient, db: cachedDb };
}

// Function to close database connection (useful for testing)
export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
