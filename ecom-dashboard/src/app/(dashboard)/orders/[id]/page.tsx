"use client";

import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { orderStatusColors, paymentStatusColors } from "@/lib/constants";
import { ArrowLeft, Printer, MapPin, CreditCard, Package } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useDashboard } from "@/providers/dashboard-provider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders, updateOrderStatus } = useDashboard();
  const order = orders.find((o) => o.id === id);
  
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Link href="/orders" className="text-primary hover:underline mt-4">Return to Orders</Link>
      </div>
    );
  }

  const timeline = [
    { label: "Order Placed", date: order.createdAt, done: true },
    { label: "Confirmed", date: order.status !== "pending" ? order.createdAt : null, done: ["confirmed", "processing", "shipped", "delivered"].includes(order.status) },
    { label: "Processing", date: null, done: ["processing", "shipped", "delivered"].includes(order.status) },
    { label: "Shipped", date: null, done: ["shipped", "delivered"].includes(order.status) },
    { label: "Delivered", date: order.status === "delivered" ? order.updatedAt : null, done: order.status === "delivered" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link href="/orders">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Order {order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Select value={order.status} onValueChange={(val: any) => updateOrderStatus(order.id, val)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" />Print</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Order Status */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Order Timeline</CardTitle>
              <Badge variant="secondary" className={`${orderStatusColors[order.status]} border-0 capitalize`}>{order.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {timeline.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center text-center flex-1">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${step.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
                  <p className={`text-xs mt-2 ${step.done ? "font-medium" : "text-muted-foreground"}`}>{step.label}</p>
                  {step.date && <p className="text-[10px] text-muted-foreground">{new Date(step.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card>
          <CardHeader><CardTitle className="text-base">Customer</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="font-medium">{order.customerName}</p>
            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
            <Separator />
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="capitalize">{order.paymentMethod}</span>
              <Badge variant="secondary" className={`${paymentStatusColors[order.paymentStatus]} border-0 capitalize text-xs ml-auto`}>{order.paymentStatus}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items */}
      <Card>
        <CardHeader><CardTitle className="text-base">Order Items</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0"><Package className="h-5 w-5 text-muted-foreground" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString("en-IN")}</p>
                </div>
                <p className="font-semibold text-sm">₹{item.totalPrice.toLocaleString("en-IN")}</p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
