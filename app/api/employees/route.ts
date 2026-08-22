import { NextResponse } from "next/server";
import { supabase } from "@/src/config/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("employees")
      .select(`
        *,
        employee_profiles(
          is_current,
          departments(name),
          designations(name)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Map database columns to expected frontend properties
    const mapped = (data || []).map((emp: any) => {
      const currentProfile = emp.employee_profiles?.find((p: any) => p.is_current) || emp.employee_profiles?.[0];
      const deptName = currentProfile?.departments?.name || "Engineering";
      const desigName = currentProfile?.designations?.name || emp.role || emp.designation || "Staff";

      return {
        id: emp.id,
        employee_number: emp.employee_number,
        first_name: emp.first_name,
        last_name: emp.last_name,
        name: `${emp.first_name || ""} ${emp.last_name || ""}`.trim(),
        email: emp.work_email,
        work_email: emp.work_email,
        phone: emp.phone || "",
        status: emp.employment_status === "ACTIVE" ? "Active" : emp.employment_status === "INACTIVE" ? "Inactive" : "On Leave",
        employment_status: emp.employment_status,
        joined: emp.hire_date,
        hire_date: emp.hire_date,
        role: desigName,
        designation: desigName,
        dept: deptName,
        department: deptName,
        avatar: `${emp.first_name?.[0] || ""}${emp.last_name?.[0] || ""}`.toUpperCase(),
        created_at: emp.created_at,
        updated_at: emp.updated_at
      };
    });

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Resolve company_id
    let companyId = body.company_id;
    if (!companyId) {
      const { data: companies } = await supabase.from("companies").select("id").limit(1);
      if (companies && companies.length > 0) {
        companyId = companies[0].id;
      } else {
        const { data: newCompany, error: compErr } = await supabase
          .from("companies")
          .insert({ name: "Acme Corp" })
          .select("id")
          .single();
        if (compErr) throw compErr;
        companyId = newCompany.id;
      }
    }

    if (!companyId) {
      return NextResponse.json({ error: "Could not resolve company_id" }, { status: 400 });
    }

    // 2. Resolve employment_status enum
    let employmentStatus = "ACTIVE";
    const statusVal = (body.status || body.employment_status || "ACTIVE").toUpperCase();
    if (statusVal === "INACTIVE") employmentStatus = "INACTIVE";
    if (statusVal === "TERMINATED" || statusVal === "INACTIVE_TERMINATED") employmentStatus = "TERMINATED";

    // 3. Build employees payload
    const employeesPayload = {
      company_id: companyId,
      employee_number: body.employee_number || `EMP-${Date.now().toString().slice(-4)}`,
      first_name: body.first_name || body.name?.split(" ")[0] || "Employee",
      last_name: body.last_name || body.name?.split(" ").slice(1).join(" ") || "Record",
      middle_name: body.middle_name || null,
      work_email: body.work_email || body.email || `emp-${Date.now()}@company.com`,
      phone: body.phone || null,
      employment_status: employmentStatus,
      hire_date: body.hire_date || body.joined || new Date().toISOString().split("T")[0]
    };

    // 4. Insert into employees
    const { data: empData, error: empErr } = await supabase
      .from("employees")
      .insert([employeesPayload])
      .select()
      .single();

    if (empErr) {
      return NextResponse.json({ error: empErr.message }, { status: 400 });
    }

    // 5. Link department & designation in employee_profiles if provided
    const deptName = body.department || body.dept;
    const desigName = body.designation || body.role;
    let departmentId = null;
    let designationId = null;

    if (deptName) {
      // Find or create department
      const { data: existingDept } = await supabase
        .from("departments")
        .select("id")
        .eq("name", deptName)
        .limit(1);

      if (existingDept && existingDept.length > 0) {
        departmentId = existingDept[0].id;
      } else {
        const { data: newDept } = await supabase
          .from("departments")
          .insert({ name: deptName, company_id: companyId })
          .select("id")
          .single();
        if (newDept) departmentId = newDept.id;
      }
    }

    if (desigName) {
      // Find or create designation
      const { data: existingDesig } = await supabase
        .from("designations")
        .select("id")
        .eq("name", desigName)
        .limit(1);

      if (existingDesig && existingDesig.length > 0) {
        designationId = existingDesig[0].id;
      } else {
        const { data: newDesig } = await supabase
          .from("designations")
          .insert({ name: desigName, company_id: companyId })
          .select("id")
          .single();
        if (newDesig) designationId = newDesig.id;
      }
    }

    // Create the profile relationship
    if (departmentId || designationId) {
      await supabase.from("employee_profiles").insert({
        company_id: companyId,
        employee_id: empData.id,
        department_id: departmentId,
        designation_id: designationId,
        is_current: true,
        effective_from: employeesPayload.hire_date
      });
    }

    // 6. Return mapped response
    const mapped = {
      ...empData,
      name: `${empData.first_name || ""} ${empData.last_name || ""}`.trim(),
      email: empData.work_email,
      work_email: empData.work_email,
      phone: empData.phone || "",
      status: empData.employment_status === "ACTIVE" ? "Active" : empData.employment_status === "INACTIVE" ? "Inactive" : "On Leave",
      employment_status: empData.employment_status,
      joined: empData.hire_date,
      hire_date: empData.hire_date,
      role: desigName || "Staff",
      designation: desigName || "Staff",
      dept: deptName || "Engineering",
      department: deptName || "Engineering",
      avatar: `${empData.first_name?.[0] || ""}${empData.last_name?.[0] || ""}`.toUpperCase()
    };

    return NextResponse.json(mapped, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
