import path from 'node:path';

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import * as schema from '@/models/Schema';
import 'dotenv/config'; // Add this as the FIRST import

export async function getDbConnection() {
  const databaseUrl = process.env.DATABASE_URL;

  // eslint-disable-next-line no-console
  console.log('🔍 DATABASE_URL check:', databaseUrl ? '✅ Found' : '❌ Not found');

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required for seeding');
  }

  const client = new Client({
    connectionString: databaseUrl,
  });

  await client.connect();

  const db = drizzle(client, { schema });

  // Run migrations
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });

  return { db, client };
}
