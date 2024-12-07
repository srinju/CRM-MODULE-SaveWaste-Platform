import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  try {
    const body = await req.json()
    const customer = await prisma.customer.create({
      data: {
        ...body,
        userId: session.user.id , // TODO: Get from auth session
      },
    })
    return NextResponse.json(customer)
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
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(customers)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}