"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from "@/providers/dashboard-provider";
import { orderStatusColors } from "@/lib/constants";
import Link from "next/link";

export function RecentOrders() {
  const { orders } = useDashboard();
  const recent = orders.slice(0, 6);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
          <CardDescription>Latest orders across the platform</CardDescription>
        </div>
        <Link href="/orders" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2.5 px-2 font-medium">Order</th>
                <th className="text-left py-2.5 px-2 font-medium">Customer</th>
                <th className="text-left py-2.5 px-2 font-medium hidden sm:table-cell">Amount</th>
                <th className="text-left py-2.5 px-2 font-medium">Status</th>
                <th className="text-left py-2.5 px-2 font-medium hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((order) => (
                <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-2.5 px-2 font-medium text-primary">{order.id}</td>
                  <td className="py-2.5 px-2">{order.customerName}</td>
                  <td className="py-2.5 px-2 hidden sm:table-cell font-medium">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                  <td className="py-2.5 px-2">
                    <Badge variant="secondary" className={`${orderStatusColors[order.status]} border-0 capitalize text-xs`}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-2 text-muted-foreground hidden md:table-cell">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
