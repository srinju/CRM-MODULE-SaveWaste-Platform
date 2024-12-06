"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Lead, LeadStatus } from "@prisma/client"
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

const statusColors: Record<LeadStatus, string> = {
  NEW: "bg-blue-500",
  CONTACTED: "bg-yellow-500",
  QUALIFIED: "bg-green-500",
  PROPOSAL: "bg-purple-500",
  NEGOTIATION: "bg-orange-500",
  WON: "bg-emerald-500",
  LOST: "bg-red-500",
}

type LeadWithRelations = Lead & {
  assignedTo: {
    name: string | null;
  };
};

export const leadColumns: ColumnDef<LeadWithRelations>[] = [
  {
    accessorKey: "businessName",
    header: "Business Name",
  },
  {
    accessorKey: "contactName",
    header: "Contact Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as LeadStatus
      return (
        <Badge className={statusColors[status]}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "followUpDate",
    header: "Follow Up Date",
    cell: ({ row }) => {
      const date = row.getValue("followUpDate") as Date
      return new Date(date).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lead = row.original

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
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
            <DropdownMenuItem>Convert to Customer</DropdownMenuItem>
            <DropdownMenuItem>Delete Lead</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]