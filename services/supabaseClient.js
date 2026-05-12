import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "URL-DO-SEU-DATABASE-NO-SUPABASE";
const supabaseKey = "SUA-ANON-KEY";
export const supabase = createClient(supabaseUrl, supabaseKey);

