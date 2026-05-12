"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTransactions } from "@/data/mock-analytics";
import { IndianRupee, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { useState } from "react";

const methodLabels: Record<string, string> = { upi: "UPI", card: "Card", cod: "COD", wallet: "Wallet", netbanking: "Net Banking" };
const statusColors: Record<string, string> = {
  success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  failed: "bg-red-500/15 text-red-700 dark:text-red-400",
  refunded: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
};

export default function TransactionsPage() {
  const [methodFilter, setMethodFilter] = useState("all");
  const filtered = methodFilter === "all" ? mockTransactions : mockTransactions.filter((t) => t.method === methodFilter);

  const totalSuccess = mockTransactions.filter((t) => t.status === "success").reduce((s, t) => s + t.amount, 0);
  const totalRefunded = mockTransactions.filter((t) => t.status === "refunded").reduce((s, t) => s + t.amount, 0);
  const totalPending = mockTransactions.filter((t) => t.status === "pending").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground text-sm mt-1">Track all payments and refunds.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><ArrowUpRight className="h-5 w-5" /></div>
            <div><p className="text-xl font-bold">₹{(totalSuccess / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Successful</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400"><ArrowDownRight className="h-5 w-5" /></div>
            <div><p className="text-xl font-bold">₹{(totalRefunded / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Refunded</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400"><Clock className="h-5 w-5" /></div>
            <div><p className="text-xl font-bold">₹{(totalPending / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Pending</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Select value={methodFilter} onValueChange={(value) => setMethodFilter(value || "all")}>
          <SelectTrigger className="w-44"><IndianRupee className="mr-2 h-4 w-4" /><SelectValue placeholder="Payment Method" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="cod">COD</SelectItem>
            <SelectItem value="wallet">Wallet</SelectItem>
            <SelectItem value="netbanking">Net Banking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base font-semibold">Transaction History ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-3 font-medium">Txn ID</th>
                  <th className="text-left py-3 px-3 font-medium">Order</th>
                  <th className="text-left py-3 px-3 font-medium hidden sm:table-cell">Customer</th>
                  <th className="text-left py-3 px-3 font-medium">Amount</th>
                  <th className="text-left py-3 px-3 font-medium hidden md:table-cell">Method</th>
                  <th className="text-left py-3 px-3 font-medium">Status</th>
                  <th className="text-left py-3 px-3 font-medium hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((txn) => (
                  <tr key={txn.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3 font-mono text-xs">{txn.id}</td>
                    <td className="py-3 px-3 text-primary font-medium">{txn.orderId}</td>
                    <td className="py-3 px-3 hidden sm:table-cell">{txn.customerName}</td>
                    <td className="py-3 px-3 font-semibold">₹{txn.amount.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-3 hidden md:table-cell"><Badge variant="outline" className="text-xs">{methodLabels[txn.method]}</Badge></td>
                    <td className="py-3 px-3"><Badge variant="secondary" className={`${statusColors[txn.status]} border-0 capitalize text-xs`}>{txn.status}</Badge></td>
                    <td className="py-3 px-3 text-muted-foreground hidden lg:table-cell">{new Date(txn.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
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
