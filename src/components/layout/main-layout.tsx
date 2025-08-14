import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { DashboardHeader } from '@/components/dashboard-header';

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarNav />
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
