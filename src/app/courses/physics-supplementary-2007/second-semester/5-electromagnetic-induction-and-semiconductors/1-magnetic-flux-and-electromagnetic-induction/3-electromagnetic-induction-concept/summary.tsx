
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الحث الكهرومغناطيسي",
        formula: "",
        description: "هي ظاهرة توليد قوة دافعة كهربائية حثية (وبالتالي تيار حثي إذا كانت الدارة مغلقة) في موصل نتيجة لتغير التدفق المغناطيسي الذي يخترقه."
    },
    {
        title: "الشرط الأساسي",
        formula: "\\Delta\\Phi_B \\neq 0",
        description: "الشرط الوحيد والأساسي لحدوث الحث الكهرومغناطيسي هو حدوث تغير في التدفق المغناطيسي عبر الدارة مع مرور الزمن. لا يهم مقدار التدفق، بل معدل تغيره."
    }
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {laws.map((law, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">{law.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {law.formula && 
                  <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                      <BlockMath math={law.formula} />
                  </div>
                }
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">طرق تغيير التدفق</AlertTitle>
          <AlertDescription>
           يمكن تغيير التدفق المغناطيسي بواحدة أو أكثر من الطرق التالية:
           <ul className="list-disc list-inside mt-2">
            <li>تغيير شدة المجال المغناطيسي (B).</li>
            <li>تغيير مساحة الملف المعرضة للمجال (A).</li>
            <li>تغيير الزاوية بين المجال ومستوى الملف ($\\theta$).</li>
           </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
