
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { BookCopy, Home, Info, Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', text: 'الرئيسية', icon: Home },
  { href: '/#courses-section', text: 'الدورات', icon: BookCopy },
  { href: '#', text: 'عن الاكاديمية', icon: Info },
  { href: '#', text: 'تواصل معنا', icon: Phone },
];

export function MarketingHeader() {
  const pathname = usePathname();
  
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
        <div className="flex items-center gap-4">
             <Button asChild variant="outline" className="hover:-translate-y-0.5 transition-transform">
                <Link href="#">حساب جديد</Link>
            </Button>
            <Button asChild className="hover:-translate-y-0.5 transition-transform">
                <Link href="/login" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  الدخول 
                </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
