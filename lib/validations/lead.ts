import * as z from "zod"

export const leadFormSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"]),
  followUpDate: z.string(),
  notes: z.string().optional(),
})