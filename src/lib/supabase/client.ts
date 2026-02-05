import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  // Make Supabase optional - only create client if credentials are provided
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return null if Supabase is not configured (using localStorage instead)
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
