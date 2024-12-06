"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Quote, QuoteStatus, Customer } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

const statusColors: Record<QuoteStatus, string> = {
  DRAFT: "bg-gray-500",
  SENT: "bg-blue-500",
  ACCEPTED: "bg-green-500",
  REJECTED: "bg-red-500",
  EXPIRED: "bg-yellow-500",
}

type QuoteWithRelations = Quote & {
  customer: Customer;
};

export const quoteColumns: ColumnDef<QuoteWithRelations>[] = [
  {
    accessorKey: "quoteNumber",
    header: "Quote Number",
  },
  {
    accessorKey: "customer.businessName",
    header: "Customer",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as QuoteStatus
      return (
        <Badge className={statusColors[status]}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "validUntil",
    header: "Valid Until",
    cell: ({ row }) => {
      return format(new Date(row.getValue("validUntil")), "MMM d, yyyy")
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "MMM d, yyyy")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const quote = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Quote</DropdownMenuItem>
            <DropdownMenuItem>Edit Quote</DropdownMenuItem>
            <DropdownMenuItem>Send to Customer</DropdownMenuItem>
            <DropdownMenuItem>Convert to Invoice</DropdownMenuItem>
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]