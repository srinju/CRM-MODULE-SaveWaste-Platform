"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { PlusCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailDialog } from "@/components/email/email-dialog"
import { EmailTemplateDialog } from "@/components/email/email-template-dialog"
import { emailColumns } from "@/components/email/columns"
import { templateColumns } from "@/components/email/template-columns"
import { EmailStatus } from "@prisma/client"

type Email = {
  content : string,
  createdAt : Date,
  from : string,
  id : string,
  sentAt : Date,
  status : EmailStatus,
  subject : string,
  template : string | null ,
  templateId : string  | null,
  to : string,
  updatedAt : Date
}

export default function EmailPage() {
  const [emailOpen, setEmailOpen] = useState(false)
  const [templateOpen, setTemplateOpen] = useState(false)
  const [emails , setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('/api/email');
        if(!response.ok){
          throw new Error("an error occured while fetching the emails!!");
        }
        const data = await response.json();
        console.log("data received from fethcing the data : " , data);
        setEmails(data);
      } catch(error){
        console.error("an error occured while fethching the emails from the database"  , error)
      }
    }
    fetchEmails();
  },[]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Email System</h2>
        <div className="space-x-2">
          <Button onClick={() => setTemplateOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Template
          </Button>
          <Button onClick={() => setEmailOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Email
          </Button>
        </div>
      </div>

      <Tabs defaultValue="emails" className="space-y-4">
        <TabsList>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Marketing Campaigns</TabsTrigger>
        </TabsList>
        <TabsContent value="emails">
          <DataTable columns={emailColumns} data={emails} />
        </TabsContent>
        <TabsContent value="templates">
          <DataTable columns={templateColumns} data={[]} />
        </TabsContent>
        <TabsContent value="campaigns">
          <div className="rounded-md border p-4 text-center text-muted-foreground">
            Marketing Campaigns feature coming soon
          </div>
        </TabsContent>
      </Tabs>

      <EmailDialog open={emailOpen} onOpenChange={setEmailOpen} />
      <EmailTemplateDialog open={templateOpen} onOpenChange={setTemplateOpen} />
    </div>
  )
}