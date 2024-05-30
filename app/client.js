import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://odecpyodlpiobahncupr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kZWNweW9kbHBpb2JhaG5jdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNDYyNDUsImV4cCI6MjAzMjYyMjI0NX0.1Txaz1akRZHy6lhBS2cU-2NrvhYIVX0gDgIPi8eJyFw'
export const supabase = createClient(supabaseUrl, supabaseKey)
