"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useDashboard } from "@/providers/dashboard-provider";

const statusOrder = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"] as const;

const chartConfig = {
  count: { label: "Orders", color: "var(--color-chart-1)" },
};

export function OrdersChart() {
  const { orders } = useDashboard();

  const ordersByStatus = statusOrder.map((status) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count: orders.filter((o) => o.status === status).length,
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Orders by Status</CardTitle>
        <CardDescription>Current order pipeline breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={ordersByStatus} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
