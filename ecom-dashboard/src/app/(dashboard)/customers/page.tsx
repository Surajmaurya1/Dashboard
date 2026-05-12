"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCustomers } from "@/data/mock-customers";
import { customerSegmentColors } from "@/lib/constants";
import { Search, Users, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("all");

  const filtered = mockCustomers.filter((c) => {
    const matchesSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesSegment = segment === "all" || c.segment === segment;
    return matchesSearch && matchesSegment;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage and analyze your customer base ({mockCustomers.length} customers).</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Total", count: mockCustomers.length, color: "text-primary" },
          { label: "VIP", count: mockCustomers.filter((c) => c.segment === "vip").length, color: "text-amber-600 dark:text-amber-400" },
          { label: "New", count: mockCustomers.filter((c) => c.segment === "new").length, color: "text-blue-600 dark:text-blue-400" },
          { label: "At Risk", count: mockCustomers.filter((c) => c.segment === "at_risk").length, color: "text-red-600 dark:text-red-400" },
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
