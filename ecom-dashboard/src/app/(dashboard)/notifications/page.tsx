"use client";

import React, { useState } from "react";
import { useNotifications } from "@/components/providers/notification-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  BellOff,
  ShoppingCart,
  Store,
  CreditCard,
  Star,
  Package,
  Users,
  Settings,
  Check,
  Trash2,
  CheckSquare,
  Search,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const typeIcons: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }
> = {
  order: {
    icon: ShoppingCart,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
  },
  vendor: {
    icon: Store,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10 dark:bg-purple-500/15",
  },
  refund: {
    icon: CreditCard,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/10 dark:bg-red-500/15",
  },
  review: {
    icon: Star,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
  },
  product: {
    icon: Package,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
  },
  customer: {
    icon: Users,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
  },
  system: {
    icon: Settings,
    color: "text-zinc-600 dark:text-zinc-400",
    bg: "bg-zinc-500/10 dark:bg-zinc-500/15",
  },
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "Just now";
}

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const readCount = notifications.length - unreadCount;

  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success("All notifications marked as read");
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      clearAll();
      toast.info("All notifications cleared");
    }
  };

  const handleMarkOneRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRead(id);
    toast.success("Notification marked as read");
  };

  const handleDeleteOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(id);
    toast.success("Notification deleted");
  };

  const filteredNotifications = notifications.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !item.read) ||
      (activeTab === "orders" && item.type === "order") ||
      (activeTab === "system" && item.type === "system") ||
      (activeTab === "others" && !["order", "system"].includes(item.type));

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Back Link */}
      <div className="flex flex-col gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Stay updated with store activities, warnings, and system status.
              </p>
            </div>
            {notifications.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllRead}
                  disabled={unreadCount === 0}
                  className="h-8 text-xs"
                >
                  <CheckSquare className="mr-1.5 h-3.5 w-3.5" />
                  Mark all as read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-8 text-xs text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{notifications.length}</p>
              <p className="text-xs text-muted-foreground">Total Notifications</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-l-2 border-l-amber-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{unreadCount}</p>
              <p className="text-xs text-muted-foreground">Unread Messages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-l-2 border-l-emerald-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{readCount}</p>
              <p className="text-xs text-muted-foreground">Read Messages</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search controls */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Filter Tabs */}
            <div className="flex overflow-x-auto gap-1 p-1 bg-muted/50 rounded-lg max-w-full no-scrollbar">
              {[
                { id: "all", label: "All" },
                { id: "unread", label: `Unread (${unreadCount})` },
                { id: "orders", label: "Orders" },
                { id: "system", label: "System" },
                { id: "others", label: "Others" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all",
                    activeTab === tab.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/30"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                className="pl-8 h-8 text-xs bg-background/50 border-border/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className="border-border/60">
        <CardHeader className="py-4 border-b border-border/40">
          <CardTitle className="text-sm font-semibold flex items-center justify-between">
            <span>List of Messages</span>
            <Badge variant="outline" className="text-[11px] font-normal text-muted-foreground px-2 py-0">
              Showing {filteredNotifications.length} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/40 mb-4 text-muted-foreground/60 border-2 border-dashed border-border/80">
                <BellOff className="h-8 w-8" />
              </div>
              <h3 className="text-base font-semibold text-foreground">No notifications</h3>
              <p className="text-sm max-w-xs mt-1">
                {searchQuery
                  ? "No notifications match your search terms."
                  : "You're all caught up! No notifications in this category."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {filteredNotifications.map((item) => {
                const config = typeIcons[item.type] || typeIcons.system;
                const IconComponent = config.icon;

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-start gap-4 p-4 transition-all relative border-l-2",
                      item.read
                        ? "border-l-transparent hover:bg-muted/10"
                        : "border-l-primary bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/15"
                    )}
                  >
                    {/* Icon section */}
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg shrink-0",
                        config.bg
                      )}
                    >
                      <IconComponent className={cn("h-4.5 w-4.5", config.color)} />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-sm leading-tight text-foreground">
                            {item.title}
                          </span>
                          {!item.read && (
                            <Badge className="bg-primary hover:bg-primary/95 text-[9px] font-semibold leading-none py-0.5 px-1 text-white border-0">
                              NEW
                            </Badge>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">
                          {timeAgo(item.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-normal pr-4">
                        {item.description}
                      </p>

                      {/* Action trigger links */}
                      {item.link && (
                        <Link
                          href={item.link}
                          className="inline-flex items-center gap-0.5 text-xs text-primary hover:underline font-medium mt-2 group"
                        >
                          View details
                          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>

                    {/* Actions button group */}
                    <div className="flex items-center gap-1 shrink-0 self-center">
                      {!item.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 text-muted-foreground hover:text-primary"
                          onClick={(e) => handleMarkOneRead(item.id, e)}
                          title="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        onClick={(e) => handleDeleteOne(item.id, e)}
                        title="Delete notification"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
