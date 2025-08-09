
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { BookCopy, Home, Info, Phone } from 'lucide-react';

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm border-b border-primary/20">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
            <Button asChild>
                <Link href="#">الدخول الى الاكاديمية</Link>
            </Button>
            <Button asChild variant="outline">
                <Link href="#">تسجيل حساب جديد</Link>
            </Button>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="#" className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors">
            <Phone className="h-4 w-4" />
            تواصل معنا
          </Link>
          <Link href="#" className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors">
            <Info className="h-4 w-4" />
            عن الاكاديمية
          </Link>
          <Link href="/physics" className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors">
            <BookCopy className="h-4 w-4" />
            الدورات
          </Link>
          <Link href="/" className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors">
            <Home className="h-4 w-4" />
            الرئيسية
          </Link>
        </nav>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col text-right">
            <span className="text-xl font-bold text-primary leading-tight">Dana</span>
            <span className="text-xl font-bold text-primary leading-tight">ACADEMY</span>
            <span className="text-xs text-muted-foreground">FOR ONLINE COURSES</span>
          </div>
          <Logo className="h-12 w-12 rounded-md" />
        </Link>
      </div>
    </header>
  );
}
