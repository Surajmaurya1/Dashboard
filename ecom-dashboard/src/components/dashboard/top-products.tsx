"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTopProducts } from "@/data/mock-analytics";
import { TrendingUp } from "lucide-react";
import { Package } from "lucide-react";

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Top Selling Products</CardTitle>
        <CardDescription>Best performers by revenue this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTopProducts.map((product, index) => (
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
              <p className="text-sm font-semibold">₹{(product.revenue / 100000).toFixed(1)}L</p>
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
