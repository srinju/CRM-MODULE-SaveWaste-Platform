"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DriverJobDialog } from "@/components/schedule/driver-job-dialog"
import { JobList } from "@/components/schedule/job-list"

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Driver Schedule</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
        <Card className="p-4">
          <JobList selectedDate={date} />
        </Card>
      </div>
      <DriverJobDialog open={open} onOpenChange={setOpen} selectedDate={date} />
    </div>
  )
}