

import type { ReactNode } from 'react';
import { MarketingHeader } from '@/components/marketing-header';
import { ExamNotificationBanner } from '@/components/exam-notification-banner';

type MarketingLayoutProps = {
  children: ReactNode;
};

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
        <MarketingHeader />
        <ExamNotificationBanner />
        <main className="flex-1">{children}</main>
        <footer className="bg-muted py-6 border-t">
          <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Dana Academy. All rights reserved.</p>
          </div>
        </footer>
    </div>
  );
}
