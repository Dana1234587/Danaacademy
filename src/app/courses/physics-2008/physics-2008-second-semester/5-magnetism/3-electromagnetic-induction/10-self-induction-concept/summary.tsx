import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Activity } from 'lucide-react';

export default function SummaryPage() {
  return (
    <div className="space-y-6">
      <Alert className="bg-primary/10 border-primary">
        <Activity className="h-5 w-5 text-primary" />
        <AlertTitle className="text-primary font-bold text-lg mb-2">1. ظاهرة الحث الذاتي (Self-Induction)</AlertTitle>
        <AlertDescription className="text-base leading-relaxed text-right">
          هي ظاهرة تولّد قوة دافعة كهربائية حثية في ملف (محث) نتيجة <strong>تغير التيار المار في الملف نفسه</strong>، مما يسبب تغيراً في التدفق المغناطيسي الذي يخترق نفس الملف.
        </AlertDescription>
      </Alert>
    </div>
  );
}
