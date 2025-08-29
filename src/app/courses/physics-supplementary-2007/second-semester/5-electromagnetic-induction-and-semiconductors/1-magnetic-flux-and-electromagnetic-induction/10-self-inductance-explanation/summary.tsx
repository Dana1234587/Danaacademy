
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الحث الذاتي",
        description: "هو ظاهرة تولد قوة دافعة كهربائية حثية في ملف نتيجة تغير التيار المار في الملف نفسه."
    },
    {
        title: "القوة الدافعة الحثية الذاتية",
        formula: "\\varepsilon_L = -L \\frac{\\Delta I}{\\Delta t}",
        description: "القوة الدافعة الحثية ($\\varepsilon_L$) تتناسب طرديًا مع محاثة المحث (L) ومع المعدل الزمني للتغير في التيار."
    },
    {
        title: "محاثة المحث (L)",
        formula: "L = \\frac{N \\Phi_B}{I}",
        description: "المحاثة هي خاصية للمحث تعتمد على مواصفاته الهندسية (عدد اللفات، المساحة، الطول) ووجود قلب حديدي. وحدتها هي الهنري (H)."
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
          <AlertTitle className="font-bold">دور المحث</AlertTitle>
          <AlertDescription>
            يعمل المحث على مقاومة أي تغير في التيار المار فيه. يقاوم نمو التيار عند غلق الدارة، ويقاوم انهيار التيار عند فتح الدارة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
