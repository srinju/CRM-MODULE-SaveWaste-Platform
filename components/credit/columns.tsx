"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CreditCheck, CreditStatus } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const statusColors: Record<CreditStatus, string> = {
  PENDING: "bg-yellow-500",
  APPROVED: "bg-green-500",
  REJECTED: "bg-red-500",
  PREPAYMENT_REQUIRED: "bg-blue-500",
}

type CreditCheckWithCustomer = CreditCheck & {
  customer: {
    businessName: string;
  };
};

export const creditColumns: ColumnDef<CreditCheckWithCustomer>[] = [
  {
    accessorKey: "customer.businessName",
    header: "Business Name",
  },
  {
    accessorKey: "score",
    header: "Credit Score",
    cell: ({ row }) => {
      const score = row.getValue("score") as number
      return score ? score.toFixed(1) : "N/A"
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as CreditStatus
      return (
        <Badge className={statusColors[status]}>
          {status.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "checkedAt",
    header: "Checked At",
    cell: ({ row }) => {
      const date = row.getValue("checkedAt") as Date
      return new Date(date).toLocaleDateString()
    },
  },
  {
    accessorKey: "validUntil",
    header: "Valid Until",
    cell: ({ row }) => {
      const date = row.getValue("validUntil") as Date
      return new Date(date).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const creditCheck = row.original

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
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuItem>Refresh Check</DropdownMenuItem>
            <DropdownMenuItem>Download Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]