
"use client";

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LogOut,
  Users,
  ClipboardCheck,
  Home,
  Award,
  BarChart2,
  BookCopy
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { useStore } from '@/store/app-store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

export function SidebarNav() {
  const { logout, currentUser } = useStore((state) => ({ logout: state.logout, currentUser: state.currentUser }));
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
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-[3.92rem] w-[8.96rem] rounded-md object-contain" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/" className="w-full">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Home />
                        الرئيسية
                    </Button>
                </Link>
            </SidebarMenuItem>
            {currentUser?.role === 'admin' ? (
                <>
                    <SidebarMenuItem>
                        <Link href="/admin" className="w-full">
                           <Button variant="ghost" className="w-full justify-start gap-2">
                             <Users />
                             إدارة الطلاب
                           </Button>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="/admin/exams" className="w-full">
                           <Button variant="ghost" className="w-full justify-start gap-2">
                             <ClipboardCheck />
                             إدارة الاختبارات
                           </Button>
                        </Link>
                    </SidebarMenuItem>
                </>
            ) : (
                 <>
                    <SidebarMenuItem>
                        <Link href="/courses" className="w-full">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <BookCopy />
                                دوراتي
                            </Button>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="/my-exams" className="w-full">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Award />
                                امتحاناتي
                            </Button>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="/my-performance" className="w-full">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <BarChart2 />
                                أدائي
                            </Button>
                        </Link>
                    </SidebarMenuItem>
                 </>
            )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
           <SidebarMenuItem>
            <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-2">
                <LogOut />
                تسجيل الخروج
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
