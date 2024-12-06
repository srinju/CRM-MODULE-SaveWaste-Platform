"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { PlusCircle } from "lucide-react"
import { CreditCheckDialog } from "@/components/credit/credit-check-dialog"
import { creditColumns } from "@/components/credit/columns"

export default function CreditPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Credit Management</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Credit Check
        </Button>
      </div>
      <DataTable columns={creditColumns} data={[]} />
      <CreditCheckDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}