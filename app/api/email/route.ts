import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { sendEmail } from "@/lib/email"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Send the email
    const emailResult = await sendEmail({
      to: body.to,
      subject: body.subject,
      content: body.content,
    })

    // Save to database
    const email = await prisma.email.create({
      data: {
        to: body.to,
        subject: body.subject,
        content: body.content,
        from: process.env.SMTP_FROM || 'srinjoydas1104@gmail.com',
        status: emailResult.success ? 'SENT' : 'FAILED',
        sentAt: emailResult.success ? new Date() : null,
        templateId: body.templateId,
      },
    })

    return NextResponse.json(email)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const emails = await prisma.email.findMany({
      include: {
        template: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(emails)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}