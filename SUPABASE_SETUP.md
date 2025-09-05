# Supabase Database Setup for fin-o-ji Waitlist

## 🚀 Quick Setup Instructions:

### 1. Create Supabase Account
- Go to [supabase.com](https://supabase.com)
- Sign up with GitHub
- Create new project: `fin-o-ji-waitlist`

### 2. Create Database Table
Run this SQL in Supabase SQL Editor:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  insurances TEXT[] DEFAULT '{}',
  problem TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow select for authenticated users
CREATE POLICY "Allow authenticated select" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 3. Get Your Keys
- Go to Project Settings > API
- Copy `Project URL` and `anon public` key

### 4. Update Environment Variables
Update `.env.local` with your keys:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Deploy & Test!
- Push to GitHub
- Deploy on Vercel/Netlify
- Test the waitlist form

## 📊 View Your Data:
- Go to Supabase Dashboard > Table Editor > waitlist
- All form submissions will appear here
- Export to CSV anytime!

## ✅ What's Configured:
- ✅ Supabase client setup
- ✅ API route for form submission
- ✅ Frontend integration
- ✅ Error handling
- ✅ Form validation

Your waitlist data will now be stored securely! 🎉
