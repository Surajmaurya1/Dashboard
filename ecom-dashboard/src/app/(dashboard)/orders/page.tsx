"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orderStatusColors, paymentStatusColors } from "@/lib/constants";
import { Search, Download, Filter, MoreVertical, CheckCircle, Truck, Package, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDashboard } from "@/providers/dashboard-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useDashboard();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = orders.filter((order) => {
    const matchesSearch = search === "" || order.id.toLowerCase().includes(search.toLowerCase()) || order.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and track all orders across the platform.</p>
        </div>
        <Button variant="outline" size="sm" className="w-fit">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by order ID or customer..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value || "all")}>
              <SelectTrigger className="w-full sm:w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">All Orders ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-3 font-medium">Order ID</th>
                  <th className="text-left py-3 px-3 font-medium">Customer</th>
                  <th className="text-left py-3 px-3 font-medium hidden md:table-cell">Items</th>
                  <th className="text-left py-3 px-3 font-medium">Amount</th>
                  <th className="text-left py-3 px-3 font-medium hidden sm:table-cell">Payment</th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">Date</th>
                  <th className="text-right py-3 px-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3">
                      <Link href={`/orders/${order.id}`} className="font-medium text-primary hover:underline">{order.id}</Link>
                    </td>
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 hidden md:table-cell text-muted-foreground">{order.items.length} item{order.items.length > 1 ? "s" : ""}</td>
                    <td className="py-3 px-3 font-semibold">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-3 hidden sm:table-cell">
                      <Badge variant="secondary" className={`${paymentStatusColors[order.paymentStatus]} border-0 capitalize text-xs`}>{order.paymentStatus}</Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="secondary" className={`${orderStatusColors[order.status]} border-0 capitalize text-xs`}>{order.status}</Badge>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground hidden lg:table-cell">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                    <td className="py-3 px-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>} />
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "confirmed")}><CheckCircle className="mr-2 h-4 w-4 text-blue-500" /> Confirm</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}><Package className="mr-2 h-4 w-4 text-purple-500" /> Process</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "shipped")}><Truck className="mr-2 h-4 w-4 text-orange-500" /> Ship</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}><CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Deliver</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "cancelled")} className="text-destructive"><XCircle className="mr-2 h-4 w-4" /> Cancel</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "returned")}><RotateCcw className="mr-2 h-4 w-4" /> Return</DropdownMenuItem>
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
