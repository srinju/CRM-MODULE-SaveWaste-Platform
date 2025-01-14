import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
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
        userId: session.user.id,
      },
    })

    return NextResponse.json(lead)
  } catch (error) {
    console.error("Lead creation error:", error)
    return NextResponse.json(
      { error: "Failed to create lead" },
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
    console.error("Lead fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    )
  }
}