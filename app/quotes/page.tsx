"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { PlusCircle } from "lucide-react"
import { QuoteDialog } from "@/components/quotes/quote-dialog"
import { quoteColumns } from "@/components/quotes/columns"

export default function QuotesPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Quotes</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Quote
        </Button>
      </div>
      <DataTable columns={quoteColumns} data={[]} />
      <QuoteDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}