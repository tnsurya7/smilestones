import { neon } from '@neondatabase/serverless';

// Get connection string from environment
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️ DATABASE_URL environment variable is not set. Database features will be disabled.');
}

// Create Neon client (will be null if no connection string)
export const sql = connectionString ? neon(connectionString) : null;

// Helper function to test connection
export async function testConnection() {
  if (!sql) {
    console.error('❌ Database not configured');
    return false;
  }
  
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected successfully:', result[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
