import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardProvider } from "@/providers/dashboard-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background md:m-2 md:rounded-xl md:border md:border-border/60">
          <DashboardHeader />
          <main className="flex-1 p-4 pt-2 md:p-6 md:pt-3">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
}
