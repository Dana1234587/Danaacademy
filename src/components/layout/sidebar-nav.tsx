
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
  Lightbulb,
  LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { useStore } from '@/store/app-store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

export function SidebarNav() {
  const { logout } = useStore((state) => ({ logout: state.logout }));
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
        {/* Content removed as requested */}
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
