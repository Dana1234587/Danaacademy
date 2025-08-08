
"use client";

import Link from 'next/link';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  ChevronsRight,
  Folder,
  Atom,
  ClipboardCheck,
  FileText,
  Lightbulb,
  Settings,
  Languages,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    label: 'التوجيهي',
    icon: BookOpen,
    path: '/tawjihi',
    subItems: [
      {
        label: 'الفصل الأول',
        icon: Folder,
        path: '/tawjihi/first-semester',
        subItems: [
          { label: 'الزخم الخطي والتصادمات', icon: Folder, path: '/tawjihi/first-semester/momentum', content: true },
          { label: 'الحركة الدورانية', icon: Folder, path: '/tawjihi/first-semester/torque', content: true },
        ],
      },
      {
        label: 'الفصل الثاني',
        icon: Folder,
        path: '/tawjihi/second-semester',
        subItems: [
          { label: 'المواسعة الكهربائية', icon: Folder, path: '/tawjihi/second-semester/capacitors', content: true },
          { label: 'التيار الكهربائي', icon: Folder, path: '/tawjihi/second-semester/currents', content: true },
        ],
      },
    ],
  },
];

const contentTypes = [
    { label: 'شرح المادة', icon: FileText, folder: 'concepts' },
    { label: 'اختبارات قصيرة', icon: ClipboardCheck, folder: 'quizzes' },
    { label: 'محاكاة', icon: Atom, folder: 'simulations' },
];

export function SidebarNav() {
  const pathname = usePathname();

  const renderMenuItems = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <Collapsible key={index} asChild>
        <div>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className="justify-between"
                isActive={pathname.startsWith(item.path)}
                variant={level > 0 ? 'ghost' : 'default'}
                >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.subItems && <ChevronsRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />}
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
          {item.subItems && (
            <CollapsibleContent>
              <div className={cn("ms-7 border-s border-border")}>
                {renderMenuItems(item.subItems, level + 1)}
              </div>
            </CollapsibleContent>
          )}
          {item.content && (
             <CollapsibleContent>
                <div className={cn("ms-7 border-s border-border")}>
                {contentTypes.map((contentType) => (
                    <SidebarMenuItem key={contentType.folder} className="ms-4">
                        <Link href={`${item.path}/${contentType.folder}`}>
                            <SidebarMenuButton variant="ghost" isActive={pathname === `${item.path}/${contentType.folder}`}>
                                <contentType.icon className="h-4 w-4"/>
                                <span>{contentType.label}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
                </div>
             </CollapsibleContent>
          )}
        </div>
      </Collapsible>
    ));
  };


  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary"><rect width="256" height="256" fill="none"/><path d="M128,24a95.8,95.8,0,0,0-62.8,168.4,95.8,95.8,0,0,0,125.6,0A95.8,95.8,0,0,0,128,24Zm0,176a79.8,79.8,0,0,1-52.4-140.4,79.8,79.8,0,0,1,104.8,0A79.8,79.8,0,0,1,128,200Z" fill="currentColor"/><circle cx="128" cy="128" r="16" fill="currentColor"/></svg>
            <span className="font-semibold text-lg">أكاديمية دانة</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {renderMenuItems(menuItems)}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/quiz">
                <SidebarMenuButton>
                    <Lightbulb />
                    مولد الاختبارات
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start gap-2">
                <Languages />
                English
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
