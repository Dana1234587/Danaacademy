import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from '@/store/app-store';
import { ThemeProvider } from '@/components/theme-provider';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: 'Dana Academy for Physics',
  description: 'An integrated platform for learning physics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Tajawal', sans-serif" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
