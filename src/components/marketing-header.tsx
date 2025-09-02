
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { BookCopy, Home, Info, Phone, User, LogOut, Shield, Book, Menu, ClipboardCheck, Award, BarChart2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/store/app-store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';

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

  const NavLinksContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={cn(
      isMobile ? 'flex flex-col gap-6 text-lg' : 'hidden md:flex gap-8 items-center'
    )}>
      {navLinks.map((link) => {
        const LinkWrapper = isMobile ? SheetClose : 'div';
        return (
          <LinkWrapper key={link.href}>
            <Link
              href={link.href} 
              className={cn(
                "animated-underline flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors",
                isMobile ? 'text-2xl' : 'text-lg',
                pathname === link.href && 'text-primary'
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.text}
            </Link>
          </LinkWrapper>
        )
      })}
    </nav>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm shadow-sm border-b border-primary/20">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-14 w-auto object-contain" />
        </Link>
        
        <div className="hidden md:flex">
          <NavLinksContent />
        </div>

        <div className="flex items-center gap-2">
            {!currentUser ? (
              <Button asChild className="hidden sm:flex hover:-translate-y-0.5 transition-transform">
                  <Link href="/login" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>الدخول</span>
                  </Link>
              </Button>
            ) : (
               <>
                {currentUser.role === 'admin' ? (
                   <>
                    <Button asChild variant="outline" className="hidden sm:flex hover:-translate-y-0.5 transition-transform">
                        <Link href="/admin" className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          إدارة الطلاب
                        </Link>
                    </Button>
                     <Button asChild variant="outline" className="hidden sm:flex hover:-translate-y-0.5 transition-transform">
                        <Link href="/admin/exams" className="flex items-center gap-2">
                          <ClipboardCheck className="h-4 w-4" />
                          إدارة الاختبارات
                        </Link>
                    </Button>
                   </>
                ) : (
                    <>
                        <Button asChild variant="outline" className="hidden sm:flex hover:-translate-y-0.5 transition-transform">
                            <Link href="/courses" className="flex items-center gap-2">
                              <Book className="h-4 w-4" />
                              دوراتي
                            </Link>
                        </Button>
                         <Button asChild className="hidden sm:flex hover:-translate-y-0.5 transition-transform">
                            <Link href="/my-exams" className="flex items-center gap-2">
                              <Award className="h-4 w-4" />
                              امتحاناتي
                            </Link>
                        </Button>
                         <Button asChild className="hidden sm:flex hover:-translate-y-0.5 transition-transform">
                            <Link href="/my-performance" className="flex items-center gap-2">
                              <BarChart2 className="h-4 w-4" />
                              أدائي
                            </Link>
                        </Button>
                    </>
                )}
                <Button onClick={handleLogout} variant="ghost" size="icon" className="hidden sm:flex hover:bg-destructive/10">
                    <LogOut className="h-5 w-5 text-destructive" />
                    <span className="sr-only">تسجيل الخروج</span>
                </Button>
               </>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-3/4 bg-background p-8">
                       <SheetHeader>
                          <SheetTitle className="sr-only">Main Menu</SheetTitle>
                       </SheetHeader>
                        <div className="flex flex-col h-full">
                           <SheetClose asChild>
                            <Link href="/" className="mb-8">
                              <Logo className="h-16 w-auto object-contain" />
                            </Link>
                           </SheetClose>
                           <NavLinksContent isMobile={true} />
                           <div className="mt-auto space-y-4">
                            {!currentUser ? (
                                <SheetClose asChild>
                                  <Button asChild size="lg" className="w-full">
                                      <Link href="/login" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        الدخول 
                                      </Link>
                                  </Button>
                                </SheetClose>
                              ) : (
                                <>
                                  {currentUser.role === 'admin' ? (
                                    <>
                                      <SheetClose asChild>
                                        <Button asChild variant="outline" size="lg" className="w-full">
                                            <Link href="/admin" className="flex items-center gap-2">
                                              <Users className="h-4 w-4" />
                                              إدارة الطلاب
                                            </Link>
                                        </Button>
                                      </SheetClose>
                                       <SheetClose asChild>
                                        <Button asChild variant="outline" size="lg" className="w-full">
                                            <Link href="/admin/exams" className="flex items-center gap-2">
                                              <ClipboardCheck className="h-4 w-4" />
                                              إدارة الاختبارات
                                            </Link>
                                        </Button>
                                      </SheetClose>
                                    </>
                                  ) : (
                                    <>
                                        <SheetClose asChild>
                                            <Button asChild variant="outline" size="lg" className="w-full">
                                                <Link href="/courses" className="flex items-center gap-2">
                                                    <Book className="h-4 w-4" />
                                                    دوراتي
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                             <Button asChild size="lg" className="w-full">
                                                <Link href="/my-exams" className="flex items-center gap-2">
                                                    <Award className="h-4 w-4" />
                                                    امتحاناتي
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                             <Button asChild size="lg" className="w-full">
                                                <Link href="/my-performance" className="flex items-center gap-2">
                                                    <BarChart2 className="h-4 w-4" />
                                                    أدائي
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                    </>
                                  )}
                                  <SheetClose asChild>
                                    <Button onClick={handleLogout} variant="destructive" size="lg" className="w-full">
                                        <LogOut className="h-5 w-5" />
                                        تسجيل الخروج
                                    </Button>
                                  </SheetClose>
                                </>
                              )}
                           </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
