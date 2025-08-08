'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Lightbulb, Languages } from 'lucide-react';

export function DashboardHeader() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {isMobile && <SidebarTrigger />}
      <h1 className="text-xl font-semibold hidden sm:inline-block">أكاديمية دانة للفيزياء</h1>
      <div className="ms-auto flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/quiz">
            <Lightbulb className="h-4 w-4" />
            <span className="sr-only">مولد الاختبارات</span>
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <Languages className="h-4 w-4" />
          <span className="sr-only">تغيير اللغة</span>
        </Button>
      </div>
    </header>
  );
}
