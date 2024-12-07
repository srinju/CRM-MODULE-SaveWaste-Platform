import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "8178c5001@smtp-brevo.com" ,
    pass: process.env.SMTP_PASS || "JfYKPZGm4jxE7ODI" ,
  },
  logger : true,
  debug : true,
});

export interface EmailData {
  to: string;
  subject: string;
  content: string;
  from?: string;
}

export async function sendEmail(data: EmailData) {
  const { to, subject, content, from = process.env.SMTP_FROM || "Srinjoy <dassrinjoy333@gmail.com" } = data;

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html: content,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}