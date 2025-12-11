
'use client';

import { useStore } from '@/store/app-store';
import { MainLayout } from '@/components/layout/main-layout'; // Use MainLayout for sidebar

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));

  if (!currentUser) {
    return <MainLayout><div className="p-8 text-center">الرجاء تسجيل الدخول للوصول لهذه الصفحة.</div></MainLayout>;
  }

  if (currentUser.role !== 'admin') {
    return <MainLayout><div className="p-8 text-center text-destructive">ليس لديك الصلاحيات الكافية للوصول لهذه الصفحة.</div></MainLayout>;
  }

  return (
    <MainLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
            {children}
        </div>
    </MainLayout>
  );
}
