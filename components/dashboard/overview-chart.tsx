"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  { month: "Jan", revenue: 4000, collections: 2400 },
  { month: "Feb", revenue: 3000, collections: 1398 },
  { month: "Mar", revenue: 2000, collections: 9800 },
  { month: "Apr", revenue: 2780, collections: 3908 },
  { month: "May", revenue: 1890, collections: 4800 },
  { month: "Jun", revenue: 2390, collections: 3800 },
  { month: "Jul", revenue: 3490, collections: 4300 },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stackId="1"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="collections"
          stackId="2"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}