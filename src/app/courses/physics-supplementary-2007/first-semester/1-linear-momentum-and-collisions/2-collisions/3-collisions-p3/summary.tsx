
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-xl text-right">مقارنة بين أنواع التصادمات في بعد واحد</CardTitle>
          <CardDescription>جدول يلخص الفروقات الأساسية بين أنواع التصادمات الثلاثة.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الخاصية</TableHead>
                <TableHead className="text-center">التصادم المرن</TableHead>
                <TableHead className="text-center">التصادم غير المرن</TableHead>
                <TableHead className="text-center">عديم المرونة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-right">حفظ الزخم الخطي</TableCell>
                <TableCell className="text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-right">حفظ الطاقة الحركية</TableCell>
                <TableCell className="text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                <TableCell className="text-center"><XCircle className="w-5 h-5 text-destructive mx-auto" /></TableCell>
                <TableCell className="text-center"><XCircle className="w-5 h-5 text-destructive mx-auto" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-right">التحام الأجسام</TableCell>
                <TableCell className="text-center text-muted-foreground">لا</TableCell>
                <TableCell className="text-center text-muted-foreground">لا</TableCell>
                <TableCell className="text-center text-green-600 font-bold">نعم</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-right">معادلة إضافية</TableCell>
                <TableCell className="text-center text-muted-foreground">$v_{1i}+v_{1f}=v_{2i}+v_{2f}$</TableCell>
                <TableCell className="text-center text-muted-foreground">-</TableCell>
                <TableCell className="text-center text-muted-foreground">$v_{f}$ مشتركة</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
