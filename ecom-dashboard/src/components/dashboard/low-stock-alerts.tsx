"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/providers/dashboard-provider";
import { AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LowStockAlerts() {
  const { products, updateProduct } = useDashboard();

  // Find products where stock is less than or equal to reorder level
  const lowStockProducts = products
    .filter((p) => p.stock <= p.reorderLevel && p.status === "active")
    .slice(0, 5);

  const handleRestock = (id: string, currentStock: number) => {
    updateProduct(id, { stock: currentStock + 50 });
  };

  return (
    <Card className="border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            Inventory Alerts
          </CardTitle>
          <CardDescription>Active products running below reorder threshold</CardDescription>
        </div>
        <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold px-2 py-0.5 rounded-full shrink-0">
          {lowStockProducts.length} items
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowStockProducts.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            All active products are well stocked!
          </div>
        ) : (
          lowStockProducts.map((product) => {
            const percentage = product.stock === 0 ? 0 : Math.round((product.stock / (product.reorderLevel * 2)) * 100);
            return (
              <div 
                key={product.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm border-b border-border/40 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold truncate text-foreground">{product.name}</p>
                    <span className="text-[10px] text-muted-foreground uppercase bg-muted px-1.5 py-0.5 rounded shrink-0">
                      {product.sku}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className={cn(
                      "text-xs font-bold",
                      product.stock === 0 ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"
                    )}>
                      {product.stock === 0 ? "Out of stock" : `${product.stock} units left`}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      (Reorder point: {product.reorderLevel})
                    </span>
                  </div>
                </div>

                {/* Progress bar container (hidden on small viewports) */}
                <div className="hidden md:flex items-center gap-2 w-32 shrink-0">
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        product.stock === 0 
                          ? "bg-red-500" 
                          : product.stock <= product.reorderLevel / 2 
                          ? "bg-red-500" 
                          : "bg-amber-500"
                      )}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium w-8 text-right">{percentage}%</span>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <Button 
                    size="xs" 
                    variant="outline" 
                    onClick={() => handleRestock(product.id, product.stock)}
                    className="text-xs h-7 px-2.5 hover:bg-primary hover:text-primary-foreground border-dashed"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Restock 50
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
