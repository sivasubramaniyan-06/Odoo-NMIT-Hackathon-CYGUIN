import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Enterprise HRMS API Gateway",
    timestamp: new Date().toISOString(),
  });
}
