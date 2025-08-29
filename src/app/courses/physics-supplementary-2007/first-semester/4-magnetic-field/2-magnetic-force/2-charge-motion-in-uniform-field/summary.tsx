
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "القوة المغناطيسية كقوة مركزية",
        formula: "F_m = F_c \\implies qvB = \\frac{mv^2}{r}",
        description: "عندما تتحرك شحنة عموديًا على مجال مغناطيسي منتظم، تعمل القوة المغناطيسية كقوة مركزية، مما يجبر الشحنة على التحرك في مسار دائري."
    },
    {
        title: "نصف قطر المسار الدائري",
        formula: "r = \\frac{mv}{qB}",
        description: "يمكن اشتقاق هذه العلاقة من مساواة القوة المغناطيسية بالقوة المركزية. نلاحظ أن نصف القطر يتناسب طرديًا مع الزخم الخطي (mv) وعكسيًا مع شدة المجال (B) ومقدار الشحنة (q)."
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
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">القوة المغناطيسية لا تبذل شغلاً</AlertTitle>
          <AlertDescription>
           بما أن القوة المغناطيسية دائمًا عمودية على اتجاه حركة الشحنة، فإنها لا تبذل أي شغل عليها. هذا يعني أن القوة المغناطيسية لا تغير مقدار سرعة الشحنة أو طاقتها الحركية، بل تغير اتجاه حركتها فقط.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
