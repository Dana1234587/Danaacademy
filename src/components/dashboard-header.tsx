
'use client';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Lightbulb, Languages, LogOut } from 'lucide-react';
import { useStore } from '@/store/app-store';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export function DashboardHeader() {
  const { isMobile } = useSidebar();
  const { logout, currentUser } = useStore(state => ({ logout: state.logout, currentUser: state.currentUser }));
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      logout(); // Clear user state in Zustand
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
      // Still attempt to log out locally even if firebase fails
      logout();
      router.push('/login');
    }
  }

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {isMobile && <SidebarTrigger />}
      <div className="flex-1">
        <h1 className="text-xl font-semibold hidden sm:inline-block">أكاديمية دانة للفيزياء</h1>
        {currentUser && <p className="text-sm text-muted-foreground hidden sm:inline-block">أهلاً بك، {currentUser.username}</p>}
      </div>
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
         {currentUser && (
            <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">تسجيل الخروج</span>
            </Button>
         )}
      </div>
    </header>
  );
}
