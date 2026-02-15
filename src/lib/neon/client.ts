import { neon } from '@neondatabase/serverless';

// Get connection string from environment (server-side only)
const connectionString = typeof window === 'undefined' ? process.env.DATABASE_URL : null;

if (typeof window === 'undefined' && !connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Please configure it in your environment.');
}

// Create Neon client (only on server-side)
export const sql = connectionString ? neon(connectionString) : null;

// Helper function to test connection
export async function testConnection() {
  if (!sql) {
    console.error('❌ Database not configured or running on client-side');
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
