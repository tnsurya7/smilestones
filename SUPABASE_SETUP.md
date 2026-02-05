# Supabase Setup Guide for Smilestones Admin Panel

## 🚀 Quick Start

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email

### Step 2: Create New Project
1. Click "New Project"
2. Enter project details:
   - Name: `smilestones`
   - Database Password: (create a strong password)
   - Region: Choose closest to your location
3. Wait for project to be created (2-3 minutes)

### Step 3: Get API Keys
1. Go to Project Settings → API
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`
   - **service_role key**: `eyJhbGc...` (keep this secret!)

### Step 4: Update .env.local
Replace the placeholder values in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
```

### Step 5: Create Database Tables
1. Go to SQL Editor in Supabase dashboard
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'sub_doctor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Children table
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  diagnosis TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  assigned_doctor_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  attendance BOOLEAN NOT NULL,
  eye_contact BOOLEAN NOT NULL,
  follow_instructions BOOLEAN NOT NULL,
  speech_attempt BOOLEAN NOT NULL,
  motor_improvement BOOLEAN NOT NULL,
  skill_level TEXT NOT NULL CHECK (skill_level IN ('poor', 'average', 'good', 'excellent')),
  activities TEXT[] NOT NULL,
  notes TEXT,
  next_goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_children_assigned_doctor ON children(assigned_doctor_id);
CREATE INDEX idx_sessions_child ON sessions(child_id);
CREATE INDEX idx_sessions_doctor ON sessions(doctor_id);
CREATE INDEX idx_sessions_date ON sessions(date);
```

4. Click "Run" to execute

### Step 6: Create First Super Admin User
Run this SQL to create your first admin account:

```sql
-- Install pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create super admin user
-- Replace 'your_username' and 'your_password' with values from your .env.local
INSERT INTO users (name, username, password_hash, role)
VALUES (
  'Super Admin',
  'your_username',  -- Use value from ADMIN_USERNAME in .env.local
  crypt('your_password', gen_salt('bf')),  -- Use value from ADMIN_PASSWORD in .env.local
  'super_admin'
);
```

**Login Credentials:**
- Username: (from `ADMIN_USERNAME` in `.env.local`)
- Password: (from `ADMIN_PASSWORD` in `.env.local`)

⚠️ **IMPORTANT**: Keep your `.env.local` file secure and never commit it to git!

### Step 7: Enable Row Level Security (RLS)
For security, enable RLS on all tables:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users: Super admin can see all, sub doctors can only see themselves
CREATE POLICY "Users select policy" ON users
  FOR SELECT USING (
    auth.uid() = id OR 
    (SELECT role FROM users WHERE id = auth.uid()) = 'super_admin'
  );

-- Children: Super admin sees all, sub doctors see only assigned
CREATE POLICY "Children select policy" ON children
  FOR SELECT USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'super_admin' OR
    assigned_doctor_id = auth.uid()
  );

-- Sessions: Super admin sees all, sub doctors see only their sessions
CREATE POLICY "Sessions select policy" ON sessions
  FOR SELECT USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'super_admin' OR
    doctor_id = auth.uid()
  );
```

### Step 8: Test the Admin Panel
1. Restart your dev server: `npm run dev`
2. Go to http://localhost:3000/admin/login
3. Login with credentials from your `.env.local` file:
   - Username: (value of `ADMIN_USERNAME`)
   - Password: (value of `ADMIN_PASSWORD`)

## 🎯 Next Steps
Once logged in, you'll be able to:
- Create doctor accounts
- Add children profiles
- Assign children to doctors
- Fill therapy session forms
- Generate PDF reports

## 🔒 Security Notes
- Never commit `.env.local` to git
- Keep service_role key secret
- Change default admin password
- Use strong passwords for all accounts
- Enable 2FA on Supabase account

## 📞 Support
If you encounter any issues:
1. Check Supabase logs in dashboard
2. Check browser console for errors
3. Verify all environment variables are set correctly
