"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/providers/dashboard-provider";

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return "Just now";
}

export function ActivityFeed() {
  const { activity } = useDashboard();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activity.slice(0, 6).map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-snug">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(item.timestamp)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
