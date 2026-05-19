"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  trend?: "up" | "down";
}

export function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  const isPositive = trend === "up" || change > 0;

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg group flex flex-col justify-between h-full border border-border/50 bg-card hover:border-border hover:bg-accent/5">
      <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-h-[32px] line-clamp-2 flex-1">
            {title}
          </p>
          <div className="text-muted-foreground/75 group-hover:text-primary transition-colors duration-300 p-1.5 rounded-md bg-muted/30 group-hover:bg-primary/10">
            <Icon className="h-4 w-4" />
          </div>
        </div>

        {/* Bottom Data Row */}
        <div className="space-y-1.5 mt-auto">
          <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
          <div className="flex items-center gap-1.5 text-[11px] font-medium flex-wrap">
            <div className={cn(
              "flex items-center gap-0.5 shrink-0 px-1.5 py-0.5 rounded",
              isPositive 
                ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                : "bg-destructive/10 dark:bg-destructive/20 text-destructive"
            )}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{isPositive ? "+" : ""}{change}%</span>
            </div>
            <span className="text-muted-foreground font-normal">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
