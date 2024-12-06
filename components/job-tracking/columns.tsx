"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DriverJob, JobStatus } from "@prisma/client"
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

const statusColors: Record<JobStatus, string> = {
  SCHEDULED: "bg-blue-500",
  IN_PROGRESS: "bg-yellow-500",
  COMPLETED: "bg-green-500",
  MISSED: "bg-red-500",
  CANCELLED: "bg-gray-500",
}

type DriverJobWithRelations = DriverJob & {
  driver: {
    name: string | null;
  };
};

export const jobTrackingColumns: ColumnDef<DriverJobWithRelations>[] = [
  {
    accessorKey: "startTime",
    header: "Date",
    cell: ({ row }) => {
      const value = row.getValue("startTime") as Date
      return format(new Date(value), "MMM d, yyyy")
    },
  },
  {
    accessorKey: "startTime",
    header: "Time",
    cell: ({ row }) => {
      const startTime = new Date(row.getValue("startTime") as Date)
      const endTime = row.original.endTime ? new Date(row.original.endTime) : null
      return `${format(startTime, "h:mm a")}${endTime ? ` - ${format(endTime, "h:mm a")}` : ""}`
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as JobStatus
      return (
        <Badge className={statusColors[status]}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original

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
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Cancel Job</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]