"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useDashboard } from "@/providers/dashboard-provider";

const chartConfig = {
  revenue: { label: "This Year", color: "var(--color-chart-1)" },
  prevRevenue: { label: "Last Year", color: "var(--color-chart-4)" },
};

export function RevenueChart() {
  const { revenueData } = useDashboard();

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Overview</CardTitle>
            <CardDescription className="text-xs">Monthly comparison — this year vs last year</CardDescription>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-chart-1)" }} />
              This Year
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-chart-4)" }} />
              Last Year
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillPrev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-4)" stopOpacity={0.08} />
                <stop offset="95%" stopColor="var(--color-chart-4)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} stroke="var(--color-muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={11} stroke="var(--color-muted-foreground)" tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area type="monotone" dataKey="prevRevenue" stroke="var(--color-chart-4)" fill="url(#fillPrev)" strokeWidth={1.5} strokeDasharray="4 4" />
            <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" fill="url(#fillRevenue)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
