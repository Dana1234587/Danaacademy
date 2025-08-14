'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { useStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PhysicsSupplementary2007Page() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <MainLayout>
       <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">
                مرحبًا بك يا {currentUser?.username || 'طالبنا العزيز'} في دورة فيزياء التكميلي - جيل 2007
            </h1>
            <Button asChild variant="outline">
                <Link href="/">
                    العودة للرئيسية
                </Link>
            </Button>
        </div>
        <p className="mt-4 text-muted-foreground">
          استخدم القائمة الجانبية للتنقل بين وحدات ودروس الدورة. نتمنى لك رحلة تعليمية ممتعة ومفيدة!
        </p>
      </div>
    </MainLayout>
  );
}
