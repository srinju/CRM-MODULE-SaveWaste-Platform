"use client"

import { useEffect, useState } from "react"
import { DriverJob, JobStatus } from "@prisma/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface JobListProps {
  selectedDate?: Date
}

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

export function JobList({ selectedDate }: JobListProps) {
  const [jobs, setJobs] = useState<DriverJobWithRelations[]>([])

  useEffect(() => {
    if (selectedDate) {
      fetchJobs(selectedDate)
    }
  }, [selectedDate])

  async function fetchJobs(date: Date) {
    try {
      const response = await fetch(`/api/driver-jobs?date=${date.toISOString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch jobs")
      }
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error(error)
    }
  }

  if (!selectedDate) {
    return (
      <div className="text-center text-muted-foreground">
        Select a date to view scheduled jobs
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Jobs for {format(selectedDate, "MMMM d, yyyy")}
      </h3>
      {jobs.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No jobs scheduled for this date
        </div>
      ) : (
        jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {format(new Date(job.startTime), "h:mm a")}
                  {job.endTime && ` - ${format(new Date(job.endTime), "h:mm a")}`}
                </CardTitle>
                <Badge className={statusColors[job.status]}>{job.status}</Badge>
              </div>
              <CardDescription>{job.location}</CardDescription>
            </CardHeader>
            {job.notes && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{job.notes}</p>
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>
  )
}