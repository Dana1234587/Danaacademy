
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { useStore } from '@/store/app-store';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));

  if (!currentUser) {
    return <MarketingLayout><div className="p-8 text-center">الرجاء تسجيل الدخول للوصول لهذه الصفحة.</div></MarketingLayout>;
  }

  if (currentUser.role !== 'admin') {
    return <MarketingLayout><div className="p-8 text-center text-destructive">ليس لديك الصلاحيات الكافية للوصول لهذه الصفحة.</div></MarketingLayout>;
  }

  return (
    <MainLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
            {children}
        </div>
    </MainLayout>
  );
}
