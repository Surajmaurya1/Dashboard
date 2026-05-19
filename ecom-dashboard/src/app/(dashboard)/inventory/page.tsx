"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from "@/providers/dashboard-provider";
import { AlertTriangle, Package, CheckCircle } from "lucide-react";

export default function InventoryPage() {
  const { products } = useDashboard();
  const sortedProducts = [...products].sort((a, b) => a.stock - b.stock);
  const outOfStock = sortedProducts.filter((p) => p.stock === 0).length;
  const lowStock = sortedProducts.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel).length;
  const inStock = sortedProducts.filter((p) => p.stock > p.reorderLevel).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor stock levels and manage inventory.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><CheckCircle className="h-5 w-5" /></div>
            <div><p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{inStock}</p><p className="text-xs text-muted-foreground">In Stock</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400"><AlertTriangle className="h-5 w-5" /></div>
            <div><p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{lowStock}</p><p className="text-xs text-muted-foreground">Low Stock</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400"><Package className="h-5 w-5" /></div>
            <div><p className="text-2xl font-bold text-red-600 dark:text-red-400">{outOfStock}</p><p className="text-xs text-muted-foreground">Out of Stock</p></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base font-semibold">Stock Levels</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-3 font-medium">Product</th>
                  <th className="text-left py-3 px-3 font-medium">SKU</th>
                  <th className="text-left py-3 px-3 font-medium">Current Stock</th>
                  <th className="text-left py-3 px-3 font-medium hidden sm:table-cell">Reorder Level</th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((p) => {
                  const status = p.stock === 0 ? "out" : p.stock <= p.reorderLevel ? "low" : "ok";
                  return (
                    <tr key={p.id} className={`border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors ${status === "out" ? "bg-red-500/5" : status === "low" ? "bg-amber-500/5" : ""}`}>
                      <td className="py-3 px-3 font-medium">{p.name}</td>
                      <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                      <td className="py-3 px-3 font-bold">{p.stock}</td>
                      <td className="py-3 px-3 text-muted-foreground hidden sm:table-cell">{p.reorderLevel}</td>
                      <td className="py-3 px-3">
                        {status === "out" ? <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                          : status === "low" ? <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-0 text-xs">Low Stock</Badge>
                          : <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-0 text-xs">In Stock</Badge>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
