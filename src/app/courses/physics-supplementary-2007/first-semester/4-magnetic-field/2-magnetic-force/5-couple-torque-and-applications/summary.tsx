
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "عزم الازدواج على ملف",
        formula: "\\tau = NIAB\\sin(\\theta)",
        description: "مقدار عزم الازدواج ($\\tau$) المؤثر على ملف عدد لفاته (N)، مساحته (A)، ويمر به تيار (I)، موضوع في مجال مغناطيسي (B). الزاوية ($\\theta$) هي الزاوية بين متجه المجال ومتجه العمودي على مستوى الملف."
    },
    {
        title: "العزم ثنائي القطب المغناطيسي ($\\mu$)",
        formula: "\\vec{\\mu} = NIA\\hat{n}",
        description: "هو متجه يمثل العزم المغناطيسي للملف. مقداره NIA واتجاهه عمودي على مستوى الملف (يحدد بقاعدة اليد اليمنى)."
    },
     {
        title: "عزم الازدواج بدلالة $\\mu$",
        formula: "\\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}",
        description: "صيغة متجهية مختصرة ومفيدة لعزم الازدواج، توضح أنه حاصل الضرب الاتجاهي للعزم ثنائي القطب المغناطيسي والمجال المغناطيسي."
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
          <AlertTitle className="font-bold">أقصى عزم وأقل عزم</AlertTitle>
          <AlertDescription>
           - **أقصى عزم (${\tau} = NIAB$):** يحدث عندما يكون مستوى الملف موازيًا للمجال ($\\theta=90^\\circ$).<br/>
           - **أقل عزم ($\\tau = 0$):** يحدث عندما يكون مستوى الملف عموديًا على المجال ($\\theta=0^\\circ$).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
