import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

export default function LessonQuestionsPage() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">حصة رقم (7): حل أسئلة الدرس</h2>
              <p className="text-muted-foreground mt-1">الفيزياء 2008 - الفصل الثاني - الوحدة السادسة</p>
            </div>
          </div>
          
          <div className="aspect-video rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-primary/10 flex items-center justify-center">
            <span className="text-muted-foreground font-medium">قريباً...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
