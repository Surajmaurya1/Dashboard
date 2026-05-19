/**
 * API Service Layer
 *
 * Every data operation goes through this file.
 * Currently returns mock data. To connect a real backend,
 * replace the function bodies with fetch() calls — nothing
 * else in the codebase needs to change.
 */

import { Product } from "@/types/product";
import { Order } from "@/types/order";
import { Customer } from "@/types/customer";
import { Vendor } from "@/types/vendor";
import type { AnalyticsOverview, RevenueData, ActivityItem, Transaction, Review } from "@/types/analytics";

import { mockProducts } from "@/data/mock-products";
import { mockOrders } from "@/data/mock-orders";
import { mockCustomers } from "@/data/mock-customers";
import { mockVendors } from "@/data/mock-vendors";
import {
  mockOverview,
  mockRevenueData,
  mockActivity,
  mockTransactions,
  mockReviews,
} from "@/data/mock-analytics";

// ──────────────────────────────────────────────
// Products
// ──────────────────────────────────────────────

export async function fetchProducts(): Promise<Product[]> {
  // Replace with: const res = await fetch('/api/products'); return res.json();
  return mockProducts;
}

export async function createProduct(
  data: Omit<Product, "id" | "createdAt" | "vendorId" | "vendorName" | "rating" | "reviewCount">
): Promise<Product> {
  const newProduct: Product = {
    ...data,
    id: `PRD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    vendorId: "VND-001",
    vendorName: "Admin Store",
    rating: 0,
    reviewCount: 0,
  };
  return newProduct;
}

export async function updateProductApi(id: string, data: Partial<Product>): Promise<Partial<Product>> {
  // Replace with: await fetch(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
  return data;
}

export async function deleteProductApi(id: string): Promise<string> {
  // Replace with: await fetch(`/api/products/${id}`, { method: 'DELETE' });
  return id;
}

// ──────────────────────────────────────────────
// Orders
// ──────────────────────────────────────────────

export async function fetchOrders(): Promise<Order[]> {
  return mockOrders;
}

export async function updateOrderStatusApi(
  id: string,
  status: Order["status"]
): Promise<{ id: string; status: Order["status"]; updatedAt: string }> {
  return { id, status, updatedAt: new Date().toISOString() };
}

// ──────────────────────────────────────────────
// Customers
// ──────────────────────────────────────────────

export async function fetchCustomers(): Promise<Customer[]> {
  return mockCustomers;
}

export async function createCustomerApi(
  data: Omit<Customer, "id" | "joinedAt" | "lastOrderAt" | "totalOrders" | "totalSpent">
): Promise<Customer> {
  const newCustomer: Customer = {
    ...data,
    id: `CUS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    joinedAt: new Date().toISOString(),
    lastOrderAt: new Date().toISOString(),
    totalOrders: 0,
    totalSpent: 0,
  };
  return newCustomer;
}

export async function updateCustomerApi(id: string, data: Partial<Customer>): Promise<Partial<Customer>> {
  return data;
}

export async function deleteCustomerApi(id: string): Promise<string> {
  return id;
}

// ──────────────────────────────────────────────
// Vendors
// ──────────────────────────────────────────────

export async function fetchVendors(): Promise<Vendor[]> {
  return mockVendors;
}

// ──────────────────────────────────────────────
// Analytics & Overview
// ──────────────────────────────────────────────

export async function fetchOverview(): Promise<AnalyticsOverview> {
  return mockOverview;
}

export async function fetchRevenueData(): Promise<RevenueData[]> {
  return mockRevenueData;
}

export async function fetchActivity(): Promise<ActivityItem[]> {
  return mockActivity;
}

// ──────────────────────────────────────────────
// Transactions
// ──────────────────────────────────────────────

export async function fetchTransactions(): Promise<Transaction[]> {
  return mockTransactions;
}

// ──────────────────────────────────────────────
// Reviews
// ──────────────────────────────────────────────

export async function fetchReviews(): Promise<Review[]> {
  return mockReviews;
}
