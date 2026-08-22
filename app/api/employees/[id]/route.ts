import { NextResponse } from "next/server";
import { supabase } from "@/src/config/supabase";

interface RouteParams {
  params: Promise<{ id?: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === "PGRST116" ? 404 : 400 }
      );
    }

    // Map database columns to expected frontend properties
    const mapped = {
      ...data,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      dept: data.department,
      joined: data.hire_date,
      role: data.role || data.designation,
      avatar: `${data.first_name?.[0] || ""}${data.last_name?.[0] || ""}`.toUpperCase()
    };

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Map frontend fields back to backend database columns
    const payload: Record<string, any> = { ...body };
    if (body.name) {
      const parts = body.name.split(" ");
      payload.first_name = parts[0] || "";
      payload.last_name = parts.slice(1).join(" ") || "";
      delete payload.name;
    }
    if (body.dept) {
      payload.department = body.dept;
      delete payload.dept;
    }
    if (body.joined) {
      payload.hire_date = body.joined;
      delete payload.joined;
    }

    const { data, error } = await supabase
      .from("employees")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Return mapped object to frontend
    const mapped = {
      ...data,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      dept: data.department,
      joined: data.hire_date,
      role: data.role || data.designation,
      avatar: `${data.first_name?.[0] || ""}${data.last_name?.[0] || ""}`.toUpperCase()
    };

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
