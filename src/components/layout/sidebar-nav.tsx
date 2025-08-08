
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
        <div className="w-full">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="h-8 w-8 text-primary"
            fill="currentColor"
          >
            <path d="M232.5,95.2a104,104,0,0,0-209,0,16.2,16.2,0,0,0,4,11.2S40.1,123.5,48,131.9c13.2,13.9,40.1,26.1,80,26.1s66.8-12.2,80-26.1c7.9-8.4,12.5-15.5,12.5-15.5s4.5-6.5,4-11.2ZM40,104a88.1,88.1,0,0,1,176,0c-1,2.8-5.3,8.9-9.6,13.7-11.5,12.2-36,23.3-78.4,23.3S41.1,129.9,29.6,117.7C25.3,112.9,21,106.8,20,104,27.9,78,54.6,56.4,88,44.2a15.8,15.8,0,0,0,7.9-14.7,16,16,0,0,0-16.2-16A15.9,15.9,0,0,0,64.2,28.8a16,16,0,1,0-28.4-11.6A103.5,103.5,0,0,1,128,24a104.2,104.2,0,0,1,87.7,46.1,16,16,0,1,0-28.4,11.6,15.9,15.9,0,0,0-15.5-15.3,16,16,0,0,0-16.2,16,15.8,15.8,0,0,0,7.9,14.7c33.4,12.2,60.1,33.8,68.1,59.8Z" />
          </svg>
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-primary">Dana Academy</span>
            <span className="text-xs text-muted-foreground">FOR ONLINE COURSES</span>
          </div>
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
