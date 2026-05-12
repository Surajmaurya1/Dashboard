"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { mockRevenueData } from "@/data/mock-analytics";

const chartConfig = {
  revenue: { label: "This Year", color: "var(--color-chart-1)" },
  prevRevenue: { label: "Last Year", color: "var(--color-chart-4)" },
};

export function RevenueChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue comparison — this year vs last year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={mockRevenueData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillPrev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-4)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--color-chart-4)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} tickFormatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area type="monotone" dataKey="prevRevenue" stroke="var(--color-chart-4)" fill="url(#fillPrev)" strokeWidth={1.5} strokeDasharray="4 4" />
            <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" fill="url(#fillRevenue)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
