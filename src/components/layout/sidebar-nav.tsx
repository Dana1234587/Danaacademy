
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
    path: '/physics',
    subItems: [
      {
        label: 'الفصل الأول',
        icon: Folder,
        path: '/tawjihi/first-semester',
        subItems: [
          { 
            label: 'الزخم الخطي والتصادمات', 
            icon: Folder, 
            path: '/tawjihi/first-semester/momentum', 
            subItems: [
              { label: 'الزخم الخطي والدفع', icon: FileText, path: '/tawjihi/first-semester/momentum/linear-momentum-and-impulse', content: true },
              { label: 'التصادمات', icon: FileText, path: '/tawjihi/first-semester/momentum/collisions', content: true },
            ]
          },
          { 
            label: 'الحركة الدورانية', 
            icon: Folder, 
            path: '/tawjihi/first-semester/rotational-motion',
            subItems: [
              { label: 'العزم والاتزان السكوني', icon: FileText, path: '/tawjihi/first-semester/rotational-motion/torque-and-static-equilibrium', content: true },
              { label: 'ديناميكا الحركة الدورانية', icon: FileText, path: '/tawjihi/first-semester/rotational-motion/rotational-dynamics', content: true },
              { label: 'الزخم الزاوي', icon: FileText, path: '/tawjihi/first-semester/rotational-motion/angular-momentum', content: true },
            ]
          },
          { 
            label: 'التيار والدارات الكهربائية', 
            icon: Folder, 
            path: '/tawjihi/first-semester/circuits',
            subItems: [
                { label: 'المقاومة والقوة الدافعة', icon: FileText, path: '/tawjihi/first-semester/circuits/resistance', content: true },
                { label: 'القدرة والدارة البسيطة', icon: FileText, path: '/tawjihi/first-semester/circuits/power', content: true },
                { label: 'قاعدتا كيرشوف', icon: FileText, path: '/tawjihi/first-semester/circuits/kirchhoff', content: true },
            ]
          },
          { 
            label: 'المجال المغناطيسي', 
            icon: Folder, 
            path: '/tawjihi/first-semester/magnetic-field',
            subItems: [
                { label: 'القوة المغناطيسية', icon: FileText, path: '/tawjihi/first-semester/magnetic-field/force', content: true },
                { label: 'المجال المغناطيسي من تيار', icon: FileText, path: '/tawjihi/first-semester/magnetic-field/from-current', content: true },
            ]
          },
        ],
      },
      {
        label: 'الفصل الثاني',
        icon: Folder,
        path: '/tawjihi/second-semester',
        subItems: [
          { label: 'الحث الكهرومغناطيسي', icon: Folder, path: '/tawjihi/second-semester/electromagnetic-induction', content: true },
          { label: 'فيزياء الكم', icon: Folder, path: '/tawjihi/second-semester/quantum-physics', content: true },
          { label: 'الفيزياء النووية', icon: Folder, path: '/tawjihi/second-semester/nuclear-physics', content: true },
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
      const isCollapsible = item.subItems && item.subItems.length > 0;
      
      const isActive = isCollapsible 
        ? pathname.startsWith(item.path)
        : pathname === item.path;

      const buttonContent = (
        <>
          <div className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </div>
          {isCollapsible && <ChevronsRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />}
        </>
      );

      const button = (
        <SidebarMenuButton
          className={cn(isCollapsible && "justify-between")}
          isActive={isActive}
          variant={level > 0 ? 'ghost' : 'default'}
        >
          {buttonContent}
        </SidebarMenuButton>
      );

      return (
        <Collapsible key={index} asChild>
          <>
            <SidebarMenuItem>
              {isCollapsible ? (
                <CollapsibleTrigger asChild>{button}</CollapsibleTrigger>
              ) : (
                <Link href={item.path}>{button}</Link>
              )}
            </SidebarMenuItem>

            {isCollapsible && (
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
          </>
        </Collapsible>
      );
    });
  };

  return <SidebarMenu>{renderMenuItems(menuItems)}</SidebarMenu>;
}


export function SidebarNav() {
  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-[3.92rem] w-[8.96rem] rounded-md object-contain" />
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
