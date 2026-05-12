"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockActivity } from "@/data/mock-analytics";
import { ShoppingCart, Store, CreditCard, Star, Package, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, { icon: typeof ShoppingCart; color: string }> = {
  order: { icon: ShoppingCart, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  vendor: { icon: Store, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  refund: { icon: CreditCard, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  review: { icon: Star, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  product: { icon: Package, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  customer: { icon: Users, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return "Just now";
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Activity Feed</CardTitle>
        <CardDescription>Recent platform activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivity.slice(0, 6).map((item) => {
          const config = typeIcons[item.type] || typeIcons.order;
          const IconComponent = config.icon;
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg shrink-0", config.color)}>
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{timeAgo(item.timestamp)}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
