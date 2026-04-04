import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function RlcCircuitQuiz() {
  return (
    <Card className="border-primary/20">
      <CardContent className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-muted-foreground">الاختبار القصير قريباً...</h2>
          <p className="text-muted-foreground mt-2">جاري إعداد أسئلة دارة RLC</p>
        </div>
      </CardContent>
    </Card>
  );
}
