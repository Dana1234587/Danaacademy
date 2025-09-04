
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl">ملخص الدرس</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    سيتم إضافة ملخص قوانين الدرس هنا.
                </CardDescription>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
