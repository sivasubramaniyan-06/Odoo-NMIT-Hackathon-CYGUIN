const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function run() {
  console.log("Fetching employees schema...");
  const { data, error } = await supabase.from("employees").select("*").limit(1);
  if (error) {
    console.error("Error fetching schema:", error);
  } else {
    console.log("Columns:", Object.keys(data[0] || {}));
    console.log("First row:", data[0]);
  }
}

run();
