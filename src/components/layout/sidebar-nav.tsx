
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
  Book,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

const menuItems = [
  {
    label: 'التوجيهي',
    icon: Book,
    path: '/physics', // Updated path
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

function SidebarNavMenu() {
  const pathname = usePathname();

  const renderMenuItems = (items: any[], level = 0) => {
    return items.map((item, index) => {
      // For top-level items, make them a direct link instead of a collapsible trigger
      if (level === 0) {
        return (
          <SidebarMenuItem key={index}>
            <Link href={item.path}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.path)}
                variant="default"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        )
      }

      return (
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
      )
    });
  };

  return <SidebarMenu>{renderMenuItems(menuItems)}</SidebarMenu>;
}


export function SidebarNav() {
  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-primary">Dana Academy</span>
            <span className="text-xs text-muted-foreground">FOR ONLINE COURSES</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMenu />
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
