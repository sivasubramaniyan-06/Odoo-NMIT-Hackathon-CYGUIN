const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function run() {
  console.log("Trying to insert with company_id, employee_number, first_name to inspect employees schema...");
  const dummyCompanyId = "9989fe6a-2d03-497c-9b5a-e7ff53664d82";
  const payload = {
    company_id: dummyCompanyId,
    employee_number: "EMP-001",
    first_name: "Jordan"
  };
  const { data, error } = await supabase.from("employees").insert(payload).select();
  
  if (error) {
    console.log("Insert failed. Error message:");
    console.log(JSON.stringify(error, null, 2));
  } else {
    console.log("Insert succeeded!", data[0]);
  }
}

run();
