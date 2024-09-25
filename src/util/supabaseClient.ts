import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://ncdwlflcmlklzfsuijvj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZHdsZmxjbWxrbHpmc3VpanZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzODk2NTUsImV4cCI6MjAzNTk2NTY1NX0.q0uQajcQb64MwpmNaVyJWsZsrUZYwzj6RRIANT5qXSs";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
