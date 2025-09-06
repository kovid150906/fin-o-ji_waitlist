# Database Schema Fix for Phone Column

## Issue
The `phone` column in the Supabase `waitlist` table has a NOT NULL constraint, but we removed the phone field from the form.

## Solution Options

### Option 1: Make Phone Column Nullable (Recommended)
Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE waitlist ALTER COLUMN phone DROP NOT NULL;
```

### Option 2: Drop Phone Column Entirely
Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE waitlist DROP COLUMN phone;
```

### Option 3: Temporary Fix - Provide Default Value
Modify the API to provide a default phone value.

## Steps to Fix:

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run the SQL command from Option 1 or 2
4. Test the form submission again

The form will work properly after applying one of these solutions.
