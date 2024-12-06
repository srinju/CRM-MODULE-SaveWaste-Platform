"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { jobTrackingColumns } from "@/components/job-tracking/columns"

export default function JobTrackingPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Job Tracking</h2>
      </div>
      <DataTable columns={jobTrackingColumns} data={[]} />
    </div>
  )
}