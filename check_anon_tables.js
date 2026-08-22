const fs = require("fs");

const envPath = "/Users/siva/Documents/Odoo-NMIT-Hackathon-CYGUIN/.env";
const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
envContent.split("\n").forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || "";
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[match[1]] = value.trim();
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function run() {
  const res = await fetch(`${url}/rest/v1/`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });
  const spec = await res.json();
  const schemas = spec.components?.schemas || spec.definitions || {};
  console.log("Visible tables under anon key:", Object.keys(schemas));
}

run();
