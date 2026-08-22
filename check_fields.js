const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

async function run() {
  const res = await fetch(`${url}/rest/v1/?apikey=${key}`);
  const spec = await res.json();
  
  const schemas = spec.components?.schemas || spec.definitions || {};
  console.log("Found tables in schema:", Object.keys(schemas));
  const employeesSchema = schemas.employees;
  if (employeesSchema) {
    console.log("Employees columns:");
    console.log(JSON.stringify(employeesSchema.properties, null, 2));
  }
}

run();
