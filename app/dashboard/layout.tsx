import {AppSidebar} from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard | NoteSnips",
  description: "Your dashboard overview",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return(
        <SidebarProvider>
            <Suspense fallback={null}>
                <AppSidebar/>
            </Suspense>
            <main className="flex-1">
                {children}
            </main>
        </SidebarProvider>
    )
}