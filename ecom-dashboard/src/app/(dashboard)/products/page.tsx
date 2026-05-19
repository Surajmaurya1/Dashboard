"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Package, Star, AlertTriangle, MoreVertical, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useDashboard } from "@/providers/dashboard-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string(),
  price: z.coerce.number().min(0, "Price must be positive"),
  compareAtPrice: z.coerce.number().optional(),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().min(0),
  reorderLevel: z.coerce.number().min(0),
  status: z.enum(["active", "draft", "archived"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useDashboard();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      reorderLevel: 0,
      status: "active",
    },
  });

  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = products.filter((p) => {
    const matchesSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (editingId) {
      updateProduct(editingId, data);
    } else {
      addProduct({ ...data, images: [] });
    }
    setIsSheetOpen(false);
    form.reset();
    setEditingId(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (product: any) => {
    setEditingId(product.id);
    form.reset({
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      category: product.category,
      stock: product.stock,
      reorderLevel: product.reorderLevel,
      status: product.status as "active" | "draft" | "archived",
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    form.reset({
      name: "",
      sku: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      reorderLevel: 0,
      status: "active",
    });
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your product catalog ({products.length} products).</p>
        </div>
        
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <Button size="sm" onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" />Add Product</Button>
          <SheetContent className="overflow-y-auto sm:max-w-md">
            <SheetHeader>
              <SheetTitle>{editingId ? "Edit Product" : "Add New Product"}</SheetTitle>
            </SheetHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" {...form.register("sku")} />
                  {form.formState.errors.sku && <p className="text-xs text-red-500">{form.formState.errors.sku.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" {...form.register("category")} />
                  {form.formState.errors.category && <p className="text-xs text-red-500">{form.formState.errors.category.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" {...form.register("price")} />
                  {form.formState.errors.price && <p className="text-xs text-red-500">{form.formState.errors.price.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare Price (₹)</Label>
                  <Input id="compareAtPrice" type="number" {...form.register("compareAtPrice")} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" {...form.register("stock")} />
                  {form.formState.errors.stock && <p className="text-xs text-red-500">{form.formState.errors.stock.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorderLevel">Reorder Level</Label>
                  <Input id="reorderLevel" type="number" {...form.register("reorderLevel")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(val) => form.setValue("status", val as "active" | "draft" | "archived")} defaultValue={form.getValues("status")}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">{editingId ? "Save Changes" : "Create Product"}</Button>
            </form>
          </SheetContent>
        </Sheet>
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
                  <th className="text-right py-3 px-3 font-medium">Actions</th>
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
                    <td className="py-3 px-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>} />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(product)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteProduct(product.id)} className="text-destructive"><Trash className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
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
