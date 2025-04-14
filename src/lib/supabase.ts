import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://putdolnjygdwgduxeaan.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dGRvbG5qeWdkd2dkdXhlYWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDEzODEsImV4cCI6MjA2MDE3NzM4MX0.8ur13hs-G-Y3HxN8URHTfOOlipGnaDOuuoUgdHaaqCo');
