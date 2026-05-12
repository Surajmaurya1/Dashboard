"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRevenueData } from "@/data/mock-analytics";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const categorySales = [
  { category: "Electronics", revenue: 4800000, orders: 2800 },
  { category: "Fashion", revenue: 3200000, orders: 2100 },
  { category: "Home & Kitchen", revenue: 1800000, orders: 1200 },
  { category: "Sports", revenue: 1200000, orders: 900 },
  { category: "Food & Bev", revenue: 890000, orders: 1500 },
  { category: "Books", revenue: 560000, orders: 800 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Deep insights into your store performance.</p>
      </div>

      {/* Revenue comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Revenue Comparison</CardTitle>
          <CardDescription>This year vs last year — monthly</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ revenue: { label: "This Year", color: "var(--color-chart-1)" }, prevRevenue: { label: "Last Year", color: "var(--color-chart-4)" } }} className="h-[350px] w-full">
            <AreaChart data={mockRevenueData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`} />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Area type="monotone" dataKey="prevRevenue" stroke="var(--color-chart-4)" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Category sales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sales by Category</CardTitle>
          <CardDescription>Revenue distribution across product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--color-chart-2)" } }} className="h-[300px] w-full">
            <BarChart data={categorySales} layout="vertical" margin={{ top: 5, right: 10, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`} />
              <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} fontSize={12} width={75} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-chart-2)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
