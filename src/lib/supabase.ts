import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://zorukwqpafcgzqdsfbge.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvcnVrd3FwYWZjZ3pxZHNmYmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1OTU5NjUsImV4cCI6MjAzNDE3MTk2NX0.phRBGCmWzvLxF75Q7AH2PHQ4kZ_1Ax0GnRexROkw-Bk');
