
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');
    const renderPart = (part: string, index: number) => {
        if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
        return <span key={index} className="inline-block mx-1"><InlineMath math={part} /></span>;
    };
    return (
        <Wrapper className="leading-relaxed">
            {lines.map((line, lineIndex) => (
                <span key={lineIndex} className="block my-1 text-right">
                    {line.split('$').map(renderPart)}
                </span>
            ))}
        </Wrapper>
    );
};

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
          <Card className="shadow-md border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary text-xl text-right">استراتيجية حل مسائل الاتزان</CardTitle>
              </CardHeader>
               <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-bold text-md text-foreground mb-2 text-right">1. ارسم مخطط الجسم الحر</h4>
                        <p className="text-sm text-muted-foreground text-right">حدد جميع القوى المؤثرة على الجسم (الوزن، قوى رد الفعل، الشد، إلخ) وارسمها في أماكن تأثيرها الصحيحة.</p>
                    </div>
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-bold text-md text-foreground mb-2 text-right">2. طبّق شرط الاتزان الانتقالي</h4>
                         <div dir="ltr" className="bg-primary/5 p-3 rounded-lg text-center mb-2">
                           <BlockMath math={"\\Sigma F_x = 0 \\quad , \\quad \\Sigma F_y = 0"} />
                        </div>
                        <p className="text-sm text-muted-foreground text-right">مجموع القوى الأفقية يساوي صفر، ومجموع القوى الرأسية يساوي صفر. هذا يعطيك معادلتين.</p>
                    </div>
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-bold text-md text-foreground mb-2 text-right">3. اختر محور دوران ذكي</h4>
                        <p className="text-sm text-muted-foreground text-right">اختر نقطة يمر بها أكبر عدد من القوى المجهولة كمحور دوران. هذا يجعل عزم هذه القوى صفرًا ويبسط المعادلة.</p>
                    </div>
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-bold text-md text-foreground mb-2 text-right">4. طبّق شرط الاتزان الدوراني</h4>
                        <div dir="ltr" className="bg-primary/5 p-3 rounded-lg text-center mb-2">
                           <BlockMath math={"\\Sigma \\tau = 0"} />
                        </div>
                        <p className="text-sm text-muted-foreground text-right">احسب عزم كل قوة حول محور الدوران الذي اخترته (مع الانتباه للإشارة: عكس عقارب الساعة موجب عادةً) واجعل المجموع يساوي صفرًا.</p>
                    </div>
               </CardContent>
          </Card>

         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">نصيحة إضافية</AlertTitle>
          <AlertDescription>
           تذكر أن وزن الجسم المنتظم (مثل اللوح أو المسطرة) يؤثر دائمًا في مركز كتلته (المنتصف). لا تنسَ إدراج هذه القوة في حساباتك للعزوم والقوى.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
