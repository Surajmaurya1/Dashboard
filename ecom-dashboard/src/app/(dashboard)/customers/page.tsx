"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { customerSegmentColors } from "@/lib/constants";
import { Search, Users, Mail, Phone, Plus, MoreVertical, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useDashboard } from "@/providers/dashboard-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  segment: z.enum(["new", "returning", "vip", "at_risk", "inactive"]),
  status: z.enum(["active", "inactive", "blocked"]),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

export default function CustomersPage() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useDashboard();
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      segment: "new",
      status: "active",
    },
  });

  const filtered = customers.filter((c) => {
    const matchesSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesSegment = segment === "all" || c.segment === segment;
    return matchesSearch && matchesSegment;
  });

  const onSubmit = (data: CustomerFormValues) => {
    if (editingId) {
      updateCustomer(editingId, data);
    } else {
      addCustomer(data);
    }
    setIsDialogOpen(false);
    form.reset();
    setEditingId(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (customer: any) => {
    setEditingId(customer.id);
    form.reset({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      segment: customer.segment,
      status: customer.status,
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    form.reset({
      name: "",
      email: "",
      phone: "",
      segment: "new",
      status: "active",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and analyze your customer base ({customers.length} customers).</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button size="sm" onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" />Add Customer</Button>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Customer" : "Add New Customer"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...form.register("phone")} />
                {form.formState.errors.phone && <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Segment</Label>
                  <Select onValueChange={(val) => form.setValue("segment", val as "new" | "returning" | "vip" | "at_risk" | "inactive")} defaultValue={form.getValues("segment")}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="returning">Returning</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="at_risk">At Risk</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select onValueChange={(val) => form.setValue("status", val as "active" | "inactive" | "blocked")} defaultValue={form.getValues("status")}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">{editingId ? "Save Changes" : "Add Customer"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Total", count: customers.length, color: "text-primary" },
          { label: "VIP", count: customers.filter((c) => c.segment === "vip").length, color: "text-amber-600 dark:text-amber-400" },
          { label: "New", count: customers.filter((c) => c.segment === "new").length, color: "text-blue-600 dark:text-blue-400" },
          { label: "At Risk", count: customers.filter((c) => c.segment === "at_risk").length, color: "text-red-600 dark:text-red-400" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Segment tabs + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Tabs value={segment} onValueChange={setSegment} className="flex-1">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="returning">Returning</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
            <TabsTrigger value="at_risk">At Risk</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader><CardTitle className="text-base font-semibold">Customer List ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-3 font-medium">Customer</th>
                  <th className="text-left py-3 px-3 font-medium hidden md:table-cell">Contact</th>
                  <th className="text-left py-3 px-3 font-medium">Orders</th>
                  <th className="text-left py-3 px-3 font-medium">Spent</th>
                  <th className="text-left py-3 px-3 font-medium">Segment</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">Joined</th>
                  <th className="text-right py-3 px-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                          {customer.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 hidden md:table-cell">
                      <div className="space-y-1">
                        <p className="text-xs flex items-center gap-1"><Mail className="h-3 w-3" />{customer.email}</p>
                        <p className="text-xs flex items-center gap-1 text-muted-foreground"><Phone className="h-3 w-3" />{customer.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium">{customer.totalOrders}</td>
                    <td className="py-3 px-3 font-semibold">₹{customer.totalSpent.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-3">
                      <Badge variant="secondary" className={`${customerSegmentColors[customer.segment]} border-0 capitalize text-xs`}>
                        {customer.segment.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground hidden lg:table-cell">{new Date(customer.joinedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</td>
                    <td className="py-3 px-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>} />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(customer)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteCustomer(customer.id)} className="text-destructive"><Trash className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
