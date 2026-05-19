"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboard } from "@/providers/dashboard-provider";
import { vendorStatusColors } from "@/lib/constants";
import { Star, CheckCircle, XCircle, Store } from "lucide-react";
import { useState } from "react";

export default function VendorsPage() {
  const { vendors } = useDashboard();
  const [tab, setTab] = useState("all");

  const filtered = tab === "all" ? vendors : vendors.filter((v) => v.status === tab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage marketplace vendors and their performance.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {[
          { label: "Active Vendors", count: vendors.filter((v) => v.status === "active").length, icon: Store, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Pending Approval", count: vendors.filter((v) => v.status === "pending").length, icon: CheckCircle, color: "text-amber-600 dark:text-amber-400" },
          { label: "Suspended", count: vendors.filter((v) => v.status === "suspended").length, icon: XCircle, color: "text-red-600 dark:text-red-400" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl bg-muted flex items-center justify-center ${s.color}`}><s.icon className="h-5 w-5" /></div>
              <div><p className={`text-2xl font-bold ${s.color}`}>{s.count}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({vendors.length})</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader><CardTitle className="text-base font-semibold">Vendor Directory ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-3 font-medium">Vendor</th>
                  <th className="text-left py-3 px-3 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left py-3 px-3 font-medium">Products</th>
                  <th className="text-left py-3 px-3 font-medium hidden md:table-cell">Revenue</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">Rating</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">Fulfillment</th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">{vendor.name.substring(0, 2).toUpperCase()}</div>
                        <div><p className="font-medium">{vendor.name}</p><p className="text-xs text-muted-foreground">{vendor.email}</p></div>
                      </div>
                    </td>
                    <td className="py-3 px-3 hidden sm:table-cell">{vendor.category}</td>
                    <td className="py-3 px-3 font-medium">{vendor.productsCount}</td>
                    <td className="py-3 px-3 font-semibold hidden md:table-cell">₹{(vendor.totalRevenue / 100000).toFixed(1)}L</td>
                    <td className="py-3 px-3 hidden lg:table-cell">
                      {vendor.rating > 0 ? (
                        <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{vendor.rating}</div>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="py-3 px-3 hidden lg:table-cell">
                      {vendor.fulfillmentRate > 0 ? (
                        <span className={vendor.fulfillmentRate >= 95 ? "text-emerald-600 dark:text-emerald-400" : vendor.fulfillmentRate >= 90 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}>{vendor.fulfillmentRate}%</span>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="secondary" className={`${vendorStatusColors[vendor.status]} border-0 capitalize text-xs`}>{vendor.status}</Badge>
                    </td>
                    <td className="py-3 px-3">
                      {vendor.status === "pending" ? (
                        <div className="flex gap-1">
                          <Button size="sm" variant="default" className="h-7 text-xs">Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs">Reject</Button>
                        </div>
                      ) : <Button size="sm" variant="ghost" className="h-7 text-xs">View</Button>}
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
