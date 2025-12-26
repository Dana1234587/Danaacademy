
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المجال الكهربائي بين صفيحتين",
        formula: "E = \\frac{|\\Delta V|}{d}",
        description: "مقدار المجال الكهربائي المنتظم (E) بين صفيحتين يساوي القيمة المطلقة لفرق الجهد بينهما ($|\\Delta V|$) مقسومًا على المسافة العمودية بينهما (d)."
    },
    {
        title: "خصائص المجال والجهد",
        description: "• **المجال (E):** ثابت في المقدار والاتجاه في أي نقطة بين الصفيحتين.\n• **الجهد (V):** يقل بشكل منتظم كلما تحركنا مع اتجاه خطوط المجال الكهربائي (من الصفيحة الموجبة إلى السالبة)."
    },
    {
        title: "حساب فرق الجهد",
        formula: "\\Delta V = V_{\\text{positive}} - V_{\\text{negative}}",
        description: "يُحسب فرق الجهد بين الصفيحتين كفرق بين جهد الصفيحة الموجبة وجهد الصفيحة السالبة."
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
                    {law.description.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">سطوح تساوي الجهد</AlertTitle>
          <AlertDescription>
            في المجال المنتظم بين صفيحتين، تكون سطوح تساوي الجهد عبارة عن مستويات وهمية موازية للصفيحتين. أي نقطتين تقعان على نفس الخط العمودي على المجال يكون لهما نفس الجهد، ولا يلزم بذل شغل لنقل شحنة بينهما.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
