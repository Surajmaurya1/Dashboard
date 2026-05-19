"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/providers/dashboard-provider";
import { Star, CheckCircle, Flag, Trash2 } from "lucide-react";

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  approved: { color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400", icon: CheckCircle },
  pending: { color: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400", icon: Star },
  flagged: { color: "bg-red-500/15 text-red-700 dark:text-red-400", icon: Flag },
};

export default function ReviewsPage() {
  const { reviews } = useDashboard();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground text-sm mt-1">Moderate and manage product reviews.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {[
          { label: "Approved", count: reviews.filter((r) => r.status === "approved").length, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Pending", count: reviews.filter((r) => r.status === "pending").length, color: "text-amber-600 dark:text-amber-400" },
          { label: "Flagged", count: reviews.filter((r) => r.status === "flagged").length, color: "text-red-600 dark:text-red-400" },
        ].map((s) => (
          <Card key={s.label}><CardContent className="p-4 text-center"><p className={`text-2xl font-bold ${s.color}`}>{s.count}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base font-semibold">All Reviews</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {reviews.map((review) => {
            const config = statusConfig[review.status];
            return (
              <div key={review.id} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="shrink-0">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{review.customerName}</span>
                    <span className="text-muted-foreground text-xs">on</span>
                    <span className="text-sm text-primary">{review.productName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="secondary" className={`${config.color} border-0 capitalize text-xs`}>{review.status}</Badge>
                  {review.status === "pending" && <Button size="sm" variant="outline" className="h-7 text-xs">Approve</Button>}
                  {review.status === "flagged" && <Button size="sm" variant="destructive" className="h-7 text-xs"><Trash2 className="h-3 w-3" /></Button>}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
