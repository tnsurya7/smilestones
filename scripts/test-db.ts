import { config } from 'dotenv';
import { resolve } from 'path';
import { neon } from '@neondatabase/serverless';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.log('❌ DATABASE_URL environment variable is not set');
    console.log('\n🔧 Please check your .env.local file');
    return false;
  }
  
  try {
    const sql = neon(connectionString);
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected successfully!');
    console.log('📅 Server time:', result[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

async function main() {
  console.log('🔍 Testing Neon database connection...\n');
  
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log('\n✅ SUCCESS! Your Neon database is connected and ready to use.');
    console.log('\n📋 Next steps:');
    console.log('1. Run the schema.sql in Neon SQL Editor to create tables');
    console.log('2. Start migrating from localStorage to Neon database');
    console.log('3. Update your components to use async database calls');
  } else {
    console.log('\n❌ FAILED! Could not connect to Neon database.');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your DATABASE_URL in .env.local');
    console.log('2. Verify your Neon project is active');
    console.log('3. Check your internet connection');
  }
  
  process.exit(isConnected ? 0 : 1);
}

main();
