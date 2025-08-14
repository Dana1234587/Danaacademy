
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { BookCopy, Home, Info, Phone, User, LogOut, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/store/app-store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

const navLinks = [
  { href: '/', text: 'الرئيسية', icon: Home },
  { href: '/#courses-section', text: 'الدورات', icon: BookCopy },
  { href: '/#about-us', text: 'عن الاكاديمية', icon: Info },
  { href: '/#contact-us', text: 'تواصل معنا', icon: Phone },
];

export function MarketingHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useStore((state) => ({ currentUser: state.currentUser, logout: state.logout }));

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

  const getCoursePageLink = () => {
    if (!currentUser || currentUser.role !== 'student' || !currentUser.enrolledCourseIds.length) {
      return '/';
    }
    const courseId = currentUser.enrolledCourseIds[0];
    if (courseId === 'tawjihi-2007-supplementary') {
      return '/courses/physics-supplementary-2007';
    }
    if (courseId === 'tawjihi-2008') {
      return '/courses/physics-2008';
    }
    return '/';
  }
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm border-b border-primary/20">
      <div className="container mx-auto flex h-28 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-[3.92rem] w-[8.96rem] rounded-md object-contain" />
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
           {navLinks.map(link => (
             <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "animated-underline flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors",
                 pathname === link.href && 'text-primary'
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.text}
            </Link>
           ))}
        </nav>
        <div className="flex items-center gap-2">
            {!currentUser ? (
              <Button asChild className="hover:-translate-y-0.5 transition-transform">
                  <Link href="/login" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    الدخول 
                  </Link>
              </Button>
            ) : (
               <>
                {currentUser.role === 'admin' ? (
                   <Button asChild variant="outline" className="hover:-translate-y-0.5 transition-transform">
                        <Link href="/admin" className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          لوحة التحكم
                        </Link>
                    </Button>
                ) : (
                    <Button asChild variant="outline" className="hover:-translate-y-0.5 transition-transform">
                        <Link href={getCoursePageLink()} className="flex items-center gap-2">
                          <Book className="h-4 w-4" />
                          الدورة الخاصة بي
                        </Link>
                    </Button>
                )}
                <Button onClick={handleLogout} variant="ghost" size="icon" className="hover:bg-destructive/10">
                    <LogOut className="h-5 w-5 text-destructive" />
                    <span className="sr-only">تسجيل الخروج</span>
                </Button>
               </>
            )}
        </div>
      </div>
    </header>
  );
}
