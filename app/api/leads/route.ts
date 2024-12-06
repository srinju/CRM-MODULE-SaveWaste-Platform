import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const lead = await prisma.lead.create({
      data: {
        businessName: body.businessName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        status: body.status,
        followUpDate: new Date(body.followUpDate),
        notes: body.notes,
        userId: "placeholder-user-id", // TODO: Get from auth session
      },
    })
    return NextResponse.json(lead)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(leads)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}