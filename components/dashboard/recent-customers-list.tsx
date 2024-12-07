"use client"

import { useEffect, useState } from "react"
import { Customer } from "@prisma/client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { format } from "date-fns"

export function RecentCustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    async function fetchRecentCustomers() {
      try {
        const response = await fetch("/api/customers")
        if (!response.ok) throw new Error("Failed to fetch customers")
        const data = await response.json()
        setCustomers(data.slice(0, 5)) // Get only the 5 most recent customers
      } catch (error) {
        console.error("Error fetching recent customers:", error)
      }
    }

    fetchRecentCustomers()
  }, [])

  return (
    <div className="space-y-8">
      {customers.map((customer) => (
        <div key={customer.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {customer.businessName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{customer.businessName}</p>
            <p className="text-sm text-muted-foreground">
              {customer.email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {format(new Date(customer.createdAt), "MMM d, yyyy")}
          </div>
        </div>
      ))}
      
      {customers.length === 0 && (
        <div className="text-center text-muted-foreground">
          No recent customers found
        </div>
      )}
    </div>
  )
}