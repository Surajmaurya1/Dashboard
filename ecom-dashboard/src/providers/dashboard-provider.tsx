"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/product";
import { Order } from "@/types/order";
import { Customer } from "@/types/customer";
import { mockProducts } from "@/data/mock-products";
import { mockOrders } from "@/data/mock-orders";
import { mockCustomers } from "@/data/mock-customers";

interface DashboardContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  addProduct: (product: Omit<Product, "id" | "createdAt" | "vendorId" | "vendorName" | "rating" | "reviewCount">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  addCustomer: (customer: Omit<Customer, "id" | "joinedAt" | "lastOrderAt" | "totalOrders" | "totalSpent">) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const addProduct = (productData: Omit<Product, "id" | "createdAt" | "vendorId" | "vendorName" | "rating" | "reviewCount">) => {
    const newProduct: Product = {
      ...productData,
      id: `PRD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      vendorId: "VND-001", // Default for now
      vendorName: "Admin Store",
      rating: 0,
      reviewCount: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...productData } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    );
  };

  const addCustomer = (customerData: Omit<Customer, "id" | "joinedAt" | "lastOrderAt" | "totalOrders" | "totalSpent">) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `CUS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      joinedAt: new Date().toISOString(),
      lastOrderAt: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const updateCustomer = (id: string, customerData: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...customerData } : c)));
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <DashboardContext.Provider
      value={{
        products,
        orders,
        customers,
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
