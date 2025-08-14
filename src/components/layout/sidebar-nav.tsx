
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
  ChevronsRight,
  Folder,
  Atom,
  ClipboardCheck,
  FileText,
  Lightbulb,
  Languages,
  Book,
  LogOut,
  User,
  Shield,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { useStore } from '@/store/app-store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';


const allCourses = [
  {
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
                  { label: 'الدرس الأول: الزخم الخطي والدفع', icon: FileText, path: '/app/(content)/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse', content: true },
                  { label: 'الدرس الثاني: التصادمات', icon: FileText, path: '/app/(content)/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions', content: true },
                ]
              },
              // Other units will be added here following the same structure
            ]
        }
    ]
  },
  {
    id: 'tawjihi-2008',
    label: 'التوجيهي (جيل 2008)',
    icon: Book,
    path: '/courses/physics-2008',
     subItems: [
      {
        label: 'الفصل الأول',
        icon: Folder,
        path: '/courses/physics-2008/first-semester',
        subItems: [
          { 
            label: 'الزخم الخطي والتصادمات', 
            icon: Folder, 
            path: '/courses/physics-2008/first-semester/momentum', 
            subItems: [
              { label: 'الزخم الخطي والدفع', icon: FileText, path: '/app/(content)/courses/physics-2008/first-semester/momentum/linear-momentum-and-impulse', content: true },
              { label: 'التصادمات', icon: FileText, path: '/app/(content)/courses/physics-2008/first-semester/momentum/collisions', content: true },
            ]
          },
        ]
      },
    ]
  },
];


const contentTypes = [
    { label: 'شرح المادة', icon: FileText, folder: 'concepts' },
    { label: 'اختبارات قصيرة', icon: ClipboardCheck, folder: 'quizzes' },
    { label: 'محاكاة', icon: Atom, folder: 'simulations' },
];


function SidebarNavMenu() {
  const pathname = usePathname();
  const currentUser = useStore((state) => state.currentUser);
  
  const accessibleCourses = currentUser?.role === 'admin' 
    ? allCourses 
    : allCourses.filter(course => currentUser?.enrolledCourseIds.includes(course.id));

  const renderMenuItems = (items: any[], level = 0, parentPath = '') => {
    return items.map((item, index) => {
      const currentPath = item.path;
      const isCollapsible = item.subItems && item.subItems.length > 0;
      
      const isActive = isCollapsible 
        ? pathname.startsWith(currentPath)
        : pathname === currentPath;

      const buttonContent = (
        <>
          <div className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </div>
          {(isCollapsible || item.content) && <ChevronsRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />}
        </>
      );
      
      const itemKey = `${parentPath}-${item.label}-${index}`;
      
      const button = (
        <SidebarMenuButton
          className={cn(isCollapsible && "justify-between", item.content && "justify-between")}
          isActive={isActive && !isCollapsible && !item.content}
          variant={level > 0 ? 'ghost' : 'default'}
        >
          {buttonContent}
        </SidebarMenuButton>
      );

      return (
        <Collapsible key={itemKey} asChild>
          <div>
            <SidebarMenuItem>
              {isCollapsible || item.content ? (
                <CollapsibleTrigger asChild>{button}</CollapsibleTrigger>
              ) : (
                <Link href={currentPath}>{button}</Link>
              )}
            </SidebarMenuItem>

            {(isCollapsible) && (
              <CollapsibleContent>
                <div className={cn("ms-7 border-s border-border")}>
                  {renderMenuItems(item.subItems, level + 1, currentPath)}
                </div>
              </CollapsibleContent>
            )}
            
            {item.content && (
              <CollapsibleContent>
                  <div className={cn("ms-7 border-s border-border")}>
                  {contentTypes.map((contentType) => {
                    const contentPath = `${item.path}/${contentType.folder}`;
                    return (
                      <SidebarMenuItem key={contentType.folder} className="ms-4">
                          <Link href={contentPath}>
                              <SidebarMenuButton variant="ghost" isActive={pathname === contentPath}>
                                  <contentType.icon className="h-4 w-4"/>
                                  <span>{contentType.label}</span>
                              </SidebarMenuButton>
                          </Link>
                      </SidebarMenuItem>
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

  return <SidebarMenu>{renderMenuItems(accessibleCourses)}</SidebarMenu>;
}


export function SidebarNav() {
  const { currentUser, logout } = useStore((state) => ({ currentUser: state.currentUser, logout: state.logout }));
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      logout(); // Clear user state in Zustand
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
      // Still attempt to log out locally even if firebase fails
      logout();
      router.push('/login');
    }
  }

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-[3.92rem] w-[8.96rem] rounded-md object-contain" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {currentUser?.role === 'admin' && (
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/admin">
                        <SidebarMenuButton isActive={pathname === '/admin'}>
                            <Shield />
                            لوحة تحكم المسؤول
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarSeparator/>
            </SidebarMenu>
        )}
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
            <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-2">
                <LogOut />
                تسجيل الخروج
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
