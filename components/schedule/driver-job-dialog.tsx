"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  driverId: z.string(),
  location: z.string().min(5),
  startTime: z.string(),
  endTime: z.string(),
  notes: z.string().optional(),
  status: z.enum(["SCHEDULED", "IN_PROGRESS", "COMPLETED", "MISSED", "CANCELLED"]),
})

interface DriverJobDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate?: Date
}

type Driver = {
  id : string,
  name : string,
}

export function DriverJobDialog({ open, onOpenChange, selectedDate }: DriverJobDialogProps) {
  const [drivers , setDrivers] = useState<Driver[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driverId: "",
      location: "",
      startTime: "",
      endTime: "",
      notes: "",
      status: "SCHEDULED",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/driver-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          startTime: new Date(`${selectedDate?.toISOString().split("T")[0]}T${values.startTime}`),
          endTime: new Date(`${selectedDate?.toISOString().split("T")[0]}T${values.endTime}`),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create driver job")
      }

      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchedDrivers = async () => {
      try {
        const response = await fetch('/api/get-drivers');
        if(!response.ok){
          throw new Error("Failed to get the jobs ");
        }
        const body = await response.json();
        console.log("the drivers data fetched are : ", body.drivers);
        setDrivers(body.drivers);
      }catch(error){
        console.error("an error occured while fetching the drivers data ", error);
      }
    }
    fetchedDrivers();
  },[]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Driver Job</DialogTitle>
          <DialogDescription>
            Enter the job details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="driverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select driver" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {drivers.length > 0 ? (
                        drivers.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="no-drivers">
                          No drivers available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}