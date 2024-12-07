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
  PhoneCall
} from 'lucide-react'
import { signOut } from 'next-auth/react'

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

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 dark:bg-gray-900 w-64">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Save Waste CRM</h1>
        </Link>
        <div className='items-center justify-center'>
          <button
            onClick={() => {
              signOut({ callbackUrl: '/' })}}
          >Logout</button>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}