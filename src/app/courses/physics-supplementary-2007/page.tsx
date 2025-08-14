'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { useStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ChevronsRight, FileText, Folder } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

// Duplicating the course structure here to make this page self-contained
const courseStructure = {
  id: 'tawjihi-2007-supplementary',
  label: 'التكميلي (جيل 2007)',
  icon: Book,
  path: '/courses/physics-supplementary-2007',
  subItems: [
      {
          label: 'الفصل الأول',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/first-semester',
          subItems: [
            { 
              label: 'الزخم الخطي والتصادمات', 
              icon: Folder, 
              path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions', 
              subItems: [
                { label: 'الدرس الأول: الزخم الخطي والدفع', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse', content: true },
                { label: 'الدرس الثاني: التصادمات', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions', content: true },
              ]
            },
            // Other units will be added here following the same structure
          ]
      }
  ]
};

const contentTypes = [
    { label: 'شرح المادة', icon: FileText, folder: 'concepts' },
    { label: 'اختبارات قصيرة', icon: ClipboardCheck, folder: 'quizzes' },
    { label: 'محاكاة', icon: Atom, folder: 'simulations' },
];


function CourseContentList() {
    const pathname = usePathname();
    const renderMenuItems = (items: any[], level = 0, parentPath = '') => {
    return items.map((item, index) => {
      const currentPath = item.path;
      const isCollapsible = item.subItems && item.subItems.length > 0;
      
      const isActive = isCollapsible 
        ? pathname.startsWith(currentPath)
        : pathname === currentPath;

      const buttonContent = (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-lg">{item.label}</span>
            </div>
            {(isCollapsible || item.content) && <ChevronsRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />}
        </div>
      );
      
      const itemKey = `${parentPath}-${item.label}-${index}`;
      
      const buttonClasses = cn(
        "flex w-full items-center gap-2 overflow-hidden rounded-md p-3 text-left text-base outline-none ring-primary transition-colors hover:bg-muted focus-visible:ring-2",
        isActive && 'bg-muted font-semibold'
      );

      return (
        <Collapsible key={itemKey} asChild defaultOpen={pathname.startsWith(currentPath)}>
          <div className="w-full">
                {isCollapsible || item.content ? (
                     <CollapsibleTrigger className={buttonClasses}>{buttonContent}</CollapsibleTrigger>
                ) : (
                    <Link href={currentPath} className={buttonClasses}>{buttonContent}</Link>
                )}

                {(isCollapsible) && (
                <CollapsibleContent>
                    <div className={cn("ms-7 ps-4 border-s-2 border-primary/20 space-y-2 py-2")}>
                    {renderMenuItems(item.subItems, level + 1, currentPath)}
                    </div>
                </CollapsibleContent>
                )}
            
                {item.content && (
                <CollapsibleContent>
                    <div className={cn("ms-7 ps-4 border-s-2 border-primary/20 space-y-2 py-2")}>
                    {contentTypes.map((contentType) => {
                        const contentPath = `${item.path}/${contentType.folder}`;
                        return (
                            <Link href={contentPath} key={contentType.folder} className="flex items-center gap-2 text-muted-foreground hover:text-primary p-2 rounded-md transition-colors data-[active=true]:text-primary data-[active=true]:font-medium" data-active={pathname === contentPath}>
                                <contentType.icon className="h-4 w-4"/>
                                <span>{contentType.label}</span>
                            </Link>
                        )
                    })}
                    </div>
                </CollapsibleContent>
                )}
          </div>
        </Collapsible>
      );
    });
  };

  return <div className="space-y-2">{renderMenuItems(courseStructure.subItems)}</div>;
}


export default function PhysicsSupplementary2007Page() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <MarketingLayout>
       <div className="p-4 sm:p-6 lg:p-8 container mx-auto">
            <div className="bg-primary/5 text-center p-8 rounded-xl border border-primary/10 shadow-sm mb-8">
                <h1 className="text-4xl font-bold text-primary">
                    مرحبًا بك يا {currentUser?.studentName || 'طالبنا العزيز'} في دورة فيزياء التكميلي - جيل 2007
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    نتمنى لك رحلة تعليمية ممتعة ومفيدة!
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-primary" />
                        محتويات الدورة
                    </CardTitle>
                    <CardDescription>
                        استخدم القائمة أدناه للتنقل بين وحدات ودروس الدورة.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <CourseContentList />
                </CardContent>
            </Card>

      </div>
    </MarketingLayout>
  );
}
