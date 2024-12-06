"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EmailTemplate, EmailType } from "@prisma/client"
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

const typeColors: Record<EmailType, string> = {
  MARKETING: "bg-blue-500",
  INVOICE: "bg-green-500",
  QUOTE: "bg-yellow-500",
  AGREEMENT: "bg-purple-500",
  ALERT: "bg-red-500",
  GENERAL: "bg-gray-500",
}

export const templateColumns: ColumnDef<EmailTemplate>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as EmailType
      return (
        <Badge className={typeColors[type]}>
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date
      return new Date(date).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const template = row.original

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
            <DropdownMenuItem>Edit Template</DropdownMenuItem>
            <DropdownMenuItem>Create Email</DropdownMenuItem>
            <DropdownMenuItem>Delete Template</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]