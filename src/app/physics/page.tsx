
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { MainLayout } from '@/components/layout/main-layout';

export default function PhysicsHomePage() {
  return (
    <MainLayout>
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold">مرحباً في قسم الفيزياء</h1>
            <p className="mt-2 text-muted-foreground">
                هنا ستجد كل ما يتعلق بمنهج الفيزياء للتوجيهي الأردني. استخدم الشريط الجانبي للتنقل بين الوحدات والدروس.
            </p>
        </div>
    </MainLayout>
  );
}
