
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BookOpen, Star, Award } from 'lucide-react';

const navItems = [
  { id: 'curriculum', label: 'محتويات الدورة', icon: BookOpen },
  { id: 'testimonials', label: 'آراء الطلاب', icon: Star },
  { id: 'achievements', label: 'إنجازات الطلاب', icon: Award },
];

export function CourseNavBar() {
  const [activeId, setActiveId] = useState('curriculum');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        setIsSticky(window.scrollY > heroSection.offsetHeight);
      }

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150; // offset to trigger earlier

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'transition-all duration-300 z-40',
        isSticky ? 'sticky top-0 shadow-md' : 'relative'
      )}
    >
      <nav className="bg-muted border-b border-border">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-center">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors',
                  activeId === item.id ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            ))}
            <div
                className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
                style={{
                    left: `${navItems.findIndex(item => item.id === activeId) * (100 / navItems.length)}%`,
                    width: `${100 / navItems.length}%`
                }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
