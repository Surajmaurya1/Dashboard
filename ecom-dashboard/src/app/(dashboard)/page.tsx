"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { OrdersChart } from "@/components/dashboard/orders-chart";
import { TopProducts } from "@/components/dashboard/top-products";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { LowStockAlerts } from "@/components/dashboard/low-stock-alerts";
import { useDashboard } from "@/providers/dashboard-provider";

import {
  IndianRupee,
  ShoppingCart,
  Users,
  Store,
  TrendingUp,
  Receipt,
} from "lucide-react";

function formatCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function OverviewPage() {
  const { orders, customers, overview, loading } = useDashboard();
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const activeCustomers = customers.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  if (loading || !overview) return <div className="flex items-center justify-center h-64 text-muted-foreground">Loading...</div>;

  const stats = [
    { title: "Total Revenue", value: formatCurrency(totalRevenue), change: overview.revenueGrowth, icon: IndianRupee },
    { title: "Total Orders", value: totalOrders.toLocaleString(), change: overview.ordersGrowth, icon: ShoppingCart },
    { title: "Active Customers", value: activeCustomers.toLocaleString(), change: overview.customersGrowth, icon: Users },
    { title: "Active Vendors", value: overview.activeVendors.toLocaleString(), change: overview.vendorsGrowth, icon: Store },
    { title: "Conversion Rate", value: `${overview.conversionRate}%`, change: overview.conversionGrowth, icon: TrendingUp },
    { title: "Avg Order Value", value: formatCurrency(avgOrderValue), change: overview.aovGrowth, icon: Receipt },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <RevenueChart />
        <OrdersChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <LowStockAlerts />
          <RecentOrders />
        </div>
        <div className="space-y-4">
          <TopProducts />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
