export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Dynamically import to trigger the self-executing database check on server startup
    await import("./src/config/supabase");
  }
}
