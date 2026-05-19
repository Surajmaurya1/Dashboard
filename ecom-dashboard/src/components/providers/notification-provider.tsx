"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface NotificationItem {
  id: string;
  type: "order" | "vendor" | "refund" | "review" | "product" | "customer" | "system";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const initialNotifications: NotificationItem[] = [
  {
    id: "NTF-001",
    type: "order",
    title: "New Order Placed",
    description: "Rohan Verma placed order #ORD-012 for ₹14,196",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    read: false,
    link: "/orders/ORD-012",
  },
  {
    id: "NTF-002",
    type: "product",
    title: "Low Stock Alert",
    description: "Running Shoes Ultra — only 3 units remaining",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    link: "/inventory",
  },
  {
    id: "NTF-003",
    type: "vendor",
    title: "New Vendor Application",
    description: "GlowUp Beauty submitted their vendor onboarding application",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: false,
    link: "/vendors",
  },
  {
    id: "NTF-004",
    type: "system",
    title: "System Backup Successful",
    description: "Database backup completed successfully. 1.2GB compressed size.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    link: "/settings",
  },
  {
    id: "NTF-005",
    type: "review",
    title: "New 5-Star Review",
    description: "Ananya Gupta left a 5-star review on Yoga Mat Premium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), // ~1.2 days ago
    read: true,
    link: "/reviews",
  },
  {
    id: "NTF-006",
    type: "refund",
    title: "Refund Request Processed",
    description: "Refund of ₹2,499 issued for order #ORD-005",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    read: true,
    link: "/transactions",
  },
  {
    id: "NTF-007",
    type: "customer",
    title: "New VIP Customer",
    description: "Aarav Sharma reached VIP status with 15 orders total",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    read: true,
    link: "/customers",
  },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize notifications from localStorage or fall back to defaults
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("shoppulse_notifications");
        if (stored) {
          setNotifications(JSON.parse(stored));
        } else {
          setNotifications(initialNotifications);
        }
      } catch (e) {
        console.error("Failed to load notifications from localStorage:", e);
        setNotifications(initialNotifications);
      }
      setIsInitialized(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("shoppulse_notifications", JSON.stringify(notifications));
    } catch (e) {
      console.error("Failed to save notifications to localStorage:", e);
    }
  }, [notifications, isInitialized]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
