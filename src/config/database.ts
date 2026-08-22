import * as dotenv from "dotenv";
import { supabase } from "./supabase";

// Load environment variables using dotenv
dotenv.config();

export const databaseUrl = process.env.DATABASE_URL || "";

/**
 * Checks the database connection status using the Supabase client.
 * Verifies that Supabase is reachable and PostgREST responds to queries.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Try to select from a hypothetical table to test API reachability.
    // A status of 200 (table exists) or 404 (table doesn't exist but server responded)
    // or any other 4xx response means the Supabase server is active and reachable.
    const { status } = await supabase.from("_health_check").select("*").limit(1);

    // If the server responded with a non-500 status code, it is reachable.
    return typeof status === "number" && status >= 200 && status < 500;
  } catch (err) {
    return false;
  }
}
