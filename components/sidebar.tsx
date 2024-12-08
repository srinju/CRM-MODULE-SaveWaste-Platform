"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Users,
  UserPlus,
  Mail,
  Calendar,
  FileText,
  CreditCard,
  FileSignature,
  Receipt,
  History,
  Truck,
  AlertCircle,
  DollarSign,
  BarChart,
  PhoneCall,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

const routes = [
  {
    label: 'Customers',
    icon: Users,
    href: '/customers',
  },
  {
    label: 'Leads',
    icon: UserPlus,
    href: '/leads',
  },
  {
    label: 'Email',
    icon: Mail,
    href: '/email',
  },
  {
    label: 'Driver Schedule',
    icon: Calendar,
    href: '/schedule',
  },
  {
    label: 'Quotes',
    icon: FileText,
    href: '/quotes',
  },
  {
    label: 'Credit Management',
    icon: CreditCard,
    href: '/credit',
  },
  {
    label: 'Agreements',
    icon: FileSignature,
    href: '/agreements',
  },
  {
    label: 'Invoices',
    icon: Receipt,
    href: '/invoices',
  },
  {
    label: 'Service History',
    icon: History,
    href: '/service-history',
  },
  {
    label: 'Job Tracking',
    icon: Truck,
    href: '/job-tracking',
  },
  {
    label: 'Missed Collections',
    icon: AlertCircle,
    href: '/missed-collections',
  },
  {
    label: 'Expenses',
    icon: DollarSign,
    href: '/expenses',
  },
  {
    label: 'Reports',
    icon: BarChart,
    href: '/reports',
  },
  {
    label: 'Call Center',
    icon: PhoneCall,
    href: '/call-center',
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div 
      className={cn(
        "relative flex flex-col h-full bg-gray-100 dark:bg-gray-900 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 h-8 w-8 rounded-full border shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </Button>

      <div className="px-3 py-2 flex-1">
        <Link href="/" className={cn(
          "flex items-center pl-3 mb-14 transition-all duration-300",
          isCollapsed ? "justify-center pl-0" : "justify-start"
        )}>
          <h1 className={cn(
            "font-bold transition-all duration-300",
            isCollapsed ? "text-xl" : "text-2xl"
          )}>
            {isCollapsed ? "CRM" : "SaveWaste CRM"}
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex p-3 w-full rounded-lg transition-all duration-300",
                pathname === route.href 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              title={isCollapsed ? route.label : undefined}
            >
              <div className={cn(
                "flex items-center",
                isCollapsed ? "justify-center" : "flex-1"
              )}>
                <route.icon className={cn(
                  "h-5 w-5",
                  !isCollapsed && "mr-3"
                )} />
                {!isCollapsed && route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}