import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import {ThemeSupa,} from '@supabase/auth-ui-shared'
import { createClient} from '@supabase/supabase-js'

export const supabase = createClient(
  'https://bmohubnphkksquamqfzi.supabase.co',
 ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2h1Ym5waGtrc3F1YW1xZnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NzU3ODgsImV4cCI6MjAwNjU1MTc4OH0.sAamUvR4hjOzOL9FXxGuXAb0TZ9VOVdzKMHI6m2FDBQ'
)


export default function SupaBase  () {
  
  return (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme="dark"
  />
  )
}
