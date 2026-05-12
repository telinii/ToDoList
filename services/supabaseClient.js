import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://edwtytgeoemtjnnzopev.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkd3R5dGdlb2VtdGpubnpvcGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MDc0MTMsImV4cCI6MjA5NDA4MzQxM30.Ij4VkrYk44OYVDRTOaQKiFVCsRnSInlJOwzCmq2hakU";
export const supabase = createClient(supabaseUrl, supabaseKey);

