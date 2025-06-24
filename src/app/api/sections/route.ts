import {NextRequest, NextResponse} from "next/server"
import {demoData} from "@/data/data"

export async function GET(request: NextRequest) {
  return NextResponse.json(demoData)
}
