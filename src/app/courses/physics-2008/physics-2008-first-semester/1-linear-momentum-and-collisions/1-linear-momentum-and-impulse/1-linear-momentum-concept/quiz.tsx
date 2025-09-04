
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuizPage() {
  return (
    <div className="p-4 bg-muted/40">
       <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>اختبار قصير</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">سيتم إضافة أسئلة الاختبار القصير هنا قريبًا.</p>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
