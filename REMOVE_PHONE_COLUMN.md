# Remove Phone Column from Supabase Database

## Step-by-Step Instructions:

### 1. Open Supabase Dashboard
- Go to https://app.supabase.com
- Login to your account
- Select your project

### 2. Navigate to SQL Editor
- In the left sidebar, click on "SQL Editor"
- Click "New Query"

### 3. Run This SQL Command
Copy and paste this exact SQL command:

```sql
ALTER TABLE waitlist DROP COLUMN phone;
```

### 4. Execute the Query
- Click the "Run" button (or press Ctrl+Enter)
- You should see a success message

### 5. Verify the Change
- Go to "Table Editor" in the left sidebar
- Click on the "waitlist" table
- Confirm that the "phone" column is no longer there

## What This Does:
- Completely removes the phone column from the waitlist table
- Eliminates the NOT NULL constraint error
- Makes the database schema match your form (no phone field)

## After Running This:
- Your form will work perfectly without any phone-related errors
- No need for the temporary empty string fix in the API
- Database will only store: name, email, insurances, problem, created_at, id
