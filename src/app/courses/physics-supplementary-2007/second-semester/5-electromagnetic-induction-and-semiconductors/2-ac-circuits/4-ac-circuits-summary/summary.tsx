
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "القيم الفعالة (RMS)",
        formula: "V_{rms} = \\frac{V_{max}}{\\sqrt{2}} \\quad , \\quad I_{rms} = \\frac{I_{max}}{\\sqrt{2}}",
        description: "العلاقة بين القيمة العظمى والقيمة الفعالة للجهد والتيار."
    },
    {
        title: "المفاعلات (Reactance)",
        formula: "X_L = 2\\pi f L \\quad , \\quad X_C = \\frac{1}{2\\pi f C}",
        description: "ممانعة المحث ($X_L$) والمواسع ($X_C$) لمرور التيار المتردد."
    },
    {
        title: "المعاوقة (Impedance)",
        formula: "Z = \\sqrt{R^2 + (X_L - X_C)^2}",
        description: "الممانعة الكلية للدارة، وهي المجموع المتجهي للمقاومة والمفاعلات."
    },
    {
        title: "الرنين (Resonance)",
        formula: "f_0 = \\frac{1}{2\\pi\\sqrt{LC}}",
        description: "التردد الذي تكون عنده $X_L = X_C$, وتكون المعاوقة في أدنى قيمة لها ($Z=R$) والتيار في أعلى قيمة له."
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
      </div>
    </div>
  );
}
