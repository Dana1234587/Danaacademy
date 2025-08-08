
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { BookCopy, Info, Phone } from 'lucide-react';

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold">Dana Academy</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/physics" className="flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4">
            <BookCopy className="h-4 w-4" />
            الدورات
          </Link>
          <Link href="#" className="flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4">
            <Info className="h-4 w-4" />
            عن الأكاديمية
          </Link>
          <Link href="#" className="flex items-center gap-1 text-sm font-manual hover:underline underline-offset-4">
            <Phone className="h-4 w-4" />
            اتصل بنا
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">تسجيل الدخول</Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
            إنشاء حساب
          </Button>
        </div>
      </div>
    </header>
  );
}
