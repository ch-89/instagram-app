import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://lmfcnjqvhrzsslapcsal.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZmNuanF2aHJ6c3NsYXBjc2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1OTM3MDMsImV4cCI6MjAzMzE2OTcwM30.o-BtV89KhoM_YKYcGPMeennHVg64svLbiAO7SbY_txQ')