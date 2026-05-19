"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Product } from "@/types/product";
import { Order } from "@/types/order";
import { Customer } from "@/types/customer";
import { Vendor } from "@/types/vendor";
import type { AnalyticsOverview, RevenueData, ActivityItem, Transaction, Review } from "@/types/analytics";
import * as api from "@/lib/api";

interface DashboardContextType {
  // Core entities
  products: Product[];
  orders: Order[];
  customers: Customer[];

  // Secondary entities
  vendors: Vendor[];
  transactions: Transaction[];
  reviews: Review[];

  // Analytics
  overview: AnalyticsOverview | null;
  revenueData: RevenueData[];
  activity: ActivityItem[];

  // Loading / error state
  loading: boolean;
  error: string | null;

  // CRUD — Products
  addProduct: (product: Omit<Product, "id" | "createdAt" | "vendorId" | "vendorName" | "rating" | "reviewCount">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // CRUD — Orders
  updateOrderStatus: (id: string, status: Order["status"]) => void;

  // CRUD — Customers
  addCustomer: (customer: Omit<Customer, "id" | "joinedAt" | "lastOrderAt" | "totalOrders" | "totalSpent">) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // Core
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Secondary
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Analytics
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  // Meta
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Initial fetch ──────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        setLoading(true);
        const [
          productsData,
          ordersData,
          customersData,
          vendorsData,
          transactionsData,
          reviewsData,
          overviewData,
          revenueDataResult,
          activityData,
        ] = await Promise.all([
          api.fetchProducts(),
          api.fetchOrders(),
          api.fetchCustomers(),
          api.fetchVendors(),
          api.fetchTransactions(),
          api.fetchReviews(),
          api.fetchOverview(),
          api.fetchRevenueData(),
          api.fetchActivity(),
        ]);

        if (cancelled) return;

        setProducts(productsData);
        setOrders(ordersData);
        setCustomers(customersData);
        setVendors(vendorsData);
        setTransactions(transactionsData);
        setReviews(reviewsData);
        setOverview(overviewData);
        setRevenueData(revenueDataResult);
        setActivity(activityData);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load dashboard data");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, []);

  // ── Products CRUD ──────────────────────────────
  const addProduct = useCallback(async (
    productData: Omit<Product, "id" | "createdAt" | "vendorId" | "vendorName" | "rating" | "reviewCount">
  ) => {
    const newProduct = await api.createProduct(productData);
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback(async (id: string, productData: Partial<Product>) => {
    await api.updateProductApi(id, productData);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...productData } : p)));
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await api.deleteProductApi(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ── Orders CRUD ────────────────────────────────
  const updateOrderStatus = useCallback(async (id: string, status: Order["status"]) => {
    const result = await api.updateOrderStatusApi(id, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: result.status, updatedAt: result.updatedAt } : o))
    );
  }, []);

  // ── Customers CRUD ─────────────────────────────
  const addCustomer = useCallback(async (
    customerData: Omit<Customer, "id" | "joinedAt" | "lastOrderAt" | "totalOrders" | "totalSpent">
  ) => {
    const newCustomer = await api.createCustomerApi(customerData);
    setCustomers((prev) => [newCustomer, ...prev]);
  }, []);

  const updateCustomer = useCallback(async (id: string, customerData: Partial<Customer>) => {
    await api.updateCustomerApi(id, customerData);
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...customerData } : c)));
  }, []);

  const deleteCustomer = useCallback(async (id: string) => {
    await api.deleteCustomerApi(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        products,
        orders,
        customers,
        vendors,
        transactions,
        reviews,
        overview,
        revenueData,
        activity,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
