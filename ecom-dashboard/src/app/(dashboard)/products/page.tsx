"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProducts } from "@/data/mock-products";
import { Search, Plus, Package, Star, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [...new Set(mockProducts.map((p) => p.category))];
  const filtered = mockProducts.filter((p) => {
    const matchesSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your product catalog ({mockProducts.length} products).</p>
        </div>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Product</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value || "all")}>
              <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base font-semibold">Product Catalog ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-3 font-medium">Product</th>
                  <th className="text-left py-3 px-3 font-medium hidden md:table-cell">SKU</th>
                  <th className="text-left py-3 px-3 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left py-3 px-3 font-medium">Price</th>
                  <th className="text-left py-3 px-3 font-medium">Stock</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">Rating</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">Vendor</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0"><Package className="h-5 w-5 text-primary" /></div>
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                          <Badge variant="secondary" className="text-[10px] capitalize mt-0.5">{product.status}</Badge>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground hidden md:table-cell font-mono text-xs">{product.sku}</td>
                    <td className="py-3 px-3 hidden sm:table-cell">{product.category}</td>
                    <td className="py-3 px-3">
                      <p className="font-semibold">₹{product.price.toLocaleString("en-IN")}</p>
                      {product.compareAtPrice && <p className="text-xs text-muted-foreground line-through">₹{product.compareAtPrice.toLocaleString("en-IN")}</p>}
                    </td>
                    <td className="py-3 px-3">
                      {product.stock === 0 ? (
                        <Badge variant="destructive" className="text-xs"><AlertTriangle className="mr-1 h-3 w-3" />Out</Badge>
                      ) : product.stock <= product.reorderLevel ? (
                        <span className="text-amber-600 dark:text-amber-400 font-medium">{product.stock} <span className="text-xs">(Low)</span></span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">{product.stock}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><span>{product.rating}</span><span className="text-muted-foreground">({product.reviewCount})</span></div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground hidden lg:table-cell">{product.vendorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
