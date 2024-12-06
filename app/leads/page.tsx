"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { PlusCircle } from "lucide-react"
import { LeadDialog } from "@/components/leads/lead-dialog"
import { leadColumns } from "@/components/leads/columns"
import { useToast } from "@/hooks/use-toast"

export default function LeadsPage() {
  const [open, setOpen] = useState(false)
  const [leads, setLeads] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    try {
      const response = await fetch('/api/leads')
      if (!response.ok) throw new Error('Failed to fetch leads')
      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>
      <DataTable columns={leadColumns} data={leads} />
      <LeadDialog 
        open={open} 
        onOpenChange={setOpen} 
        onSuccess={() => {
          fetchLeads()
          setOpen(false)
        }}
      />
    </div>
  )
}