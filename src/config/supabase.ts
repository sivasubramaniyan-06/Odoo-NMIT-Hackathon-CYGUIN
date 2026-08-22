import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Load environment variables using dotenv
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verify that Supabase is reachable on startup
(async () => {
  if (typeof window === "undefined") {
    try {
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Credentials missing");
      }
      
      const { status } = await supabase.from("_startup_check").select("*").limit(1);
      
      if (typeof status === "number" && status >= 200 && status < 500) {
        console.log("✓ Supabase Connected");
      } else {
        throw new Error(`Response status: ${status}`);
      }
    } catch (err) {
      console.log("✗ Supabase Connection Failed");
    }
  }
})();
