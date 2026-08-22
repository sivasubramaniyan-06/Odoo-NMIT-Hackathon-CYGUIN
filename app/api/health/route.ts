import { NextResponse } from "next/server";
import { checkDatabaseConnection } from "@/src/config/database";

export async function GET() {
  const isConnected = await checkDatabaseConnection();

  return NextResponse.json({
    status: "ok",
    database: isConnected ? "connected" : "failed",
    timestamp: new Date().toISOString(),
  });
}
