"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { PlusCircle } from "lucide-react"
import { CustomerDialog } from "@/components/customers/customer-dialog"
import { customerColumns } from "@/components/customers/columns"

export default function CustomersPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
      <DataTable columns={customerColumns} data={[]} />
      <CustomerDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}