"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Customer } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type CustomerWithRelations = Customer & {
  assignedTo?: {
    name: string;
  };
};

export const customerColumns: ColumnDef<CustomerWithRelations>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
            <DropdownMenuItem>View Service History</DropdownMenuItem>
            <DropdownMenuItem>Create Quote</DropdownMenuItem>
            <DropdownMenuItem>Create Invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]