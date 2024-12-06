"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { PlusCircle } from "lucide-react"
import { LeadDialog } from "@/components/leads/lead-dialog"
import { leadColumns } from "@/components/leads/columns"

export default function LeadsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>
      <DataTable columns={leadColumns} data={[]} />
      <LeadDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}