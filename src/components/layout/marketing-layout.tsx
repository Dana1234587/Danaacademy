
import type { ReactNode } from 'react';
import { MarketingHeader } from '@/components/marketing-header';

type MarketingLayoutProps = {
  children: ReactNode;
};

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} أكاديمية دانة. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
