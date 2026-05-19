"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/providers/dashboard-provider";
import { AlertTriangle, Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Inventory Alerts
          </CardTitle>
          <CardDescription>Products running low on stock</CardDescription>
        </div>
        <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium px-2 py-0.5 rounded-full">
          {lowStockProducts.length} items
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowStockProducts.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground">
            All active products are well stocked!
          </div>
        ) : (
          lowStockProducts.map((product) => {
            const percentage = product.stock === 0 ? 0 : Math.round((product.stock / (product.reorderLevel * 2)) * 100);
            return (
              <div key={product.id} className="flex items-center justify-between gap-3 text-sm border-b border-border/40 pb-3 last:border-0 last:pb-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{product.name}</p>
                    <span className="text-[10px] text-muted-foreground uppercase">{product.sku}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 w-24 bg-secondary rounded-full overflow-hidden shrink-0">
                      <div 
                        className={`h-full rounded-full ${
                          product.stock === 0 
                            ? "bg-red-500" 
                            : product.stock <= product.reorderLevel / 2 
                            ? "bg-red-400" 
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {product.stock} left <span className="text-[10px] text-muted-foreground/60">(reorder at {product.reorderLevel})</span>
                    </span>
                  </div>
                </div>
                <Button 
                  size="xs" 
                  variant="outline" 
                  onClick={() => handleRestock(product.id, product.stock)}
                  className="shrink-0 text-xs h-7 px-2 hover:bg-primary hover:text-primary-foreground border-dashed"
                >
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  Restock 50
                </Button>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
