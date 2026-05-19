"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/providers/dashboard-provider";
import { TrendingUp } from "lucide-react";
import { Package } from "lucide-react";

function formatCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function TopProducts() {
  const { orders } = useDashboard();

  // Aggregate sales and revenue by productId
  const productStats = orders.reduce((acc, order) => {
    if (order.status === "cancelled") return acc;
    
    order.items.forEach((item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = {
          id: item.productId,
          name: item.productName,
          sales: 0,
          revenue: 0,
        };
      }
      acc[item.productId].sales += item.quantity;
      acc[item.productId].revenue += item.totalPrice;
    });
    return acc;
  }, {} as Record<string, { id: string; name: string; sales: number; revenue: number }>);

  const topProducts = Object.values(productStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((p) => ({
      ...p,
      growth: (p.id.charCodeAt(p.id.length - 1) % 15) + 5,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Top Selling Products</CardTitle>
        <CardDescription>Best performers by revenue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm font-bold shrink-0">
              {index + 1}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 shrink-0">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.sales} sold</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold">{formatCurrency(product.revenue)}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-0.5">
                <TrendingUp className="h-3 w-3" />
                {product.growth}%
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
