"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { PlusCircle } from "lucide-react"
import { QuoteDialog } from "@/components/quotes/quote-dialog"
import { quoteColumns } from "@/components/quotes/columns"
import { useToast } from "@/hooks/use-toast"

export default function QuotesPage() {
  const [open, setOpen] = useState(false)
  const [quotes, setQuotes] = useState([])
  const { toast } = useToast()

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes')
      if (!response.ok) throw new Error('Failed to fetch quotes')
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to fetch quotes",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Quotes</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Quote
        </Button>
      </div>
      <DataTable columns={quoteColumns} data={quotes} />
      <QuoteDialog 
        open={open} 
        onOpenChange={setOpen}
        onSuccess={fetchQuotes}
      />
    </div>
  )
}