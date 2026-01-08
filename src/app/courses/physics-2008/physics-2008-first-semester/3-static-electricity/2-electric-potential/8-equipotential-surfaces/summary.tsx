
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const concepts = [
    {
        title: "تعريف سطوح تساوي الجهد",
        description: "هي سطوح وهمية تصل بين جميع النقاط التي لها نفس الجهد الكهربائي. الشغل المبذول لنقل شحنة على طول سطح تساوي الجهد يساوي صفرًا لأن فرق الجهد يساوي صفرًا.",
        formula: "W = q \\cdot \\Delta V = q \\cdot 0 = 0"
    },
    {
        title: "سطوح تساوي الجهد لموصل كروي أو شحنة نقطية",
        description: "تكون على شكل أسطح كروية متمركزة حول الموصل أو الشحنة. تتقارب هذه السطوح في المنطقة التي يكون فيها المجال الكهربائي كبيرًا (قريبًا من الموصل)، وتتباعد كلما ابتعدنا عن الموصل حيث يضعف المجال."
    },
    {
        title: "سطوح تساوي الجهد بين صفيحتين متوازيتين",
        description: "تكون عبارة عن مستويات مستوية (مسطحة) موازية للصفيحتين وعمودية على خطوط المجال الكهربائي المنتظم. المسافات بين هذه السطوح متساوية لأن المجال الكهربائي منتظم في هذه المنطقة."
    },
    {
        title: "العلاقة مع خطوط المجال الكهربائي",
        description: "سطوح تساوي الجهد تكون دائمًا عمودية على خطوط المجال الكهربائي عند أي نقطة. هذا لأن المركبة المماسية للمجال على سطح تساوي الجهد تساوي صفرًا."
    },
    {
        title: "الشغل لنقل شحنة بين سطحين",
        formula: "W_{خارجية} = q (V_2 - V_1)",
        description: "الشغل الذي تبذله قوة خارجية لنقل شحنة من سطح جهده V₁ إلى سطح جهده V₂. إذا كانت الشحنة موجبة وتتحرك من جهد أقل إلى جهد أعلى، فإن الشغل الخارجي يكون موجبًا."
    },
    {
        title: "شغل القوة الكهربائية",
        formula: "W_{كهربائية} = -q (V_2 - V_1)",
        description: "الشغل الذي تبذله القوة الكهربائية يساوي سالب الشحنة مضروبة في فرق الجهد (النهائي - الابتدائي). القوة الكهربائية تبذل شغلاً موجبًا عند نقل شحنة موجبة من جهد أعلى إلى جهد أقل."
    }
];

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg">
            <div className="space-y-6">
                {concepts.map((concept, index) => (
                    <Card key={index} className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-primary text-xl text-right">{concept.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {concept.formula && (
                                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                                    <BlockMath math={concept.formula} />
                                </div>
                            )}
                            <CardDescription className="text-right leading-relaxed">
                                {concept.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
