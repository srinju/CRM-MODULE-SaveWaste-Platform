"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Email, EmailStatus } from "@prisma/client"
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

const statusColors: Record<EmailStatus, string> = {
  DRAFT: "bg-gray-500",
  SENT: "bg-green-500",
  FAILED: "bg-red-500",
}

export const emailColumns: ColumnDef<Email>[] = [
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as EmailStatus
      return (
        <Badge className={statusColors[status]}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "sentAt",
    header: "Sent At",
    cell: ({ row }) => {
      const date = row.getValue("sentAt") as Date
      return date ? new Date(date).toLocaleString() : "-"
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const email = row.original

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
            <DropdownMenuItem>View Email</DropdownMenuItem>
            <DropdownMenuItem>Edit Draft</DropdownMenuItem>
            <DropdownMenuItem>Send Now</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]