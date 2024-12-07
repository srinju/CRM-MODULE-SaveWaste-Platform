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
import { Card, CardContent } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

const quoteItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
})

const formSchema = z.object({
  customerId: z.string(),
  items: z.array(quoteItemSchema).min(1),
  validUntil: z.string(),
  status: z.enum(["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED"]),
})

interface QuoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Customer = {
  id: string;
  contactName: string;
  businessName?: string; // Optional
  email?: string; // Optional
  phone?: string; // Optional
  address?: string; // Optional
};

export function QuoteDialog({ open, onOpenChange }: QuoteDialogProps) {
  const [items, setItems] = useState([{ description: "", quantity: 1, unitPrice: 0 }])
  const[customers , setCustomers] = useState<Customer[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      items: items,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "DRAFT",
    },
  });

  useEffect(() => {
    //get all the customers
    console.log("in use effect of fetching the customers");
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        if(!response.ok){
          throw new Error("failed to fetch customers!!");
        }
        const data = await response.json();
        console.log("fetched customers data : " , data);
        setCustomers(data);
      } catch(error){
        console.error("error fetching customers!!" , error);
      }
    }
    fetchCustomers()
  },[]);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }])
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          total: calculateTotal(),
        }),
      })

      if (!response.ok) throw new Error("Failed to create quote")

      onOpenChange(false)
      form.reset()
      setItems([{ description: "", quantity: 1, unitPrice: 0 }])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Quote</DialogTitle>
          <DialogDescription>
            Create a new quote for a customer.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.length > 0 ? (
                        customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.contactName}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="">
                          No customers available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              {items.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min="1"
                                  onChange={e => {
                                    const newItems = [...items]
                                    newItems[index].quantity = parseInt(e.target.value)
                                    setItems(newItems)
                                    field.onChange(parseInt(e.target.value))
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-3">
                        <FormField
                          control={form.control}
                          name={`items.${index}.unitPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit Price</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  onChange={e => {
                                    const newItems = [...items]
                                    newItems[index].unitPrice = parseFloat(e.target.value)
                                    setItems(newItems)
                                    field.onChange(parseFloat(e.target.value))
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-1 flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button type="button" variant="outline" onClick={addItem}>
              Add Item
            </Button>

            <div className="text-right text-lg font-semibold">
              Total: ${calculateTotal().toFixed(2)}
            </div>

            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valid Until</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Quote</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}