
import type { ReactNode } from 'react';
import { MarketingHeader } from '@/components/marketing-header';
import { Atom, Rocket, Magnet, FlaskConical, Sigma } from 'lucide-react';

type MarketingLayoutProps = {
  children: ReactNode;
};

function BackgroundArt() {
  const iconProps = {
    className: "absolute text-primary/5 -z-10 pointer-events-none select-none",
    strokeWidth: 1,
    'aria-hidden': true
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
        <Atom {...iconProps} size={96} style={{ top: '15%', left: '10%' }} />
        <Rocket {...iconProps} size={80} style={{ top: '20%', right: '15%' }} />
        <Magnet {...iconProps} size={72} style={{ bottom: '25%', left: '20%' }} />
        <FlaskConical {...iconProps} size={110} style={{ bottom: '10%', right: '10%' }} />
        <Sigma {...iconProps} size={88} style={{ top: '60%', right: '30%' }} />
        <Atom {...iconProps} size={64} style={{ top: '75%', left: '5%' }} />
    </div>
  )
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundArt />
      <div className="relative z-0 flex flex-col flex-1">
        <MarketingHeader />
        <main className="flex-1">{children}</main>
        <footer className="bg-muted/50 py-6">
          <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Dana Academy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
