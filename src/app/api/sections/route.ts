import {NextRequest, NextResponse} from "next/server"
import {demoData} from "@/constants/data"

export async function GET(request: NextRequest) {
  return NextResponse.json(demoData)
}
