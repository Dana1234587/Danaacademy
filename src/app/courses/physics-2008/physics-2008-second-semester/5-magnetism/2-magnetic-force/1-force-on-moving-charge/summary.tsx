
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, Lightbulb, Zap } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const laws = [
    {
        title: "قانون لورنتز للقوة المغناطيسية",
        formula: "F_B = qvB\\sin(\\theta)",
        description: "القوة المغناطيسية المؤثرة في شحنة (q) تتحرك بسرعة (v) في مجال مغناطيسي (B)، حيث θ هي الزاوية بين اتجاه السرعة واتجاه المجال المغناطيسي.",
        units: "F_B \\text{ (N)}, \\quad q \\text{ (C)}, \\quad v \\text{ (m/s)}, \\quad B \\text{ (T)}"
    },
    {
        title: "تعريف التسلا (Tesla)",
        formula: "1\\text{ T} = \\frac{1\\text{ N}}{1\\text{ C} \\times 1\\text{ m/s}}",
        description: "التسلا هي وحدة قياس شدة المجال المغناطيسي. مجال مغناطيسي شدته 1 تسلا يؤثر بقوة 1 نيوتن على شحنة 1 كولوم تتحرك بسرعة 1 m/s عمودياً على المجال.",
        units: ""
    },
    {
        title: "قاعدة اليد اليمنى",
        formula: "",
        description: "لتحديد اتجاه القوة المغناطيسية:\n• الإبهام ← اتجاه السرعة (v)\n• الأصابع الأربعة ← اتجاه المجال المغناطيسي (B)\n• باطن اليد ← اتجاه القوة للشحنة الموجبة\n• ظهر اليد ← اتجاه القوة للشحنة السالبة",
        units: ""
    },
    {
        title: "التعامد بين المتجهات",
        formula: "\\vec{F} \\perp \\vec{v} \\perp \\vec{B}",
        description: "القوة المغناطيسية عمودية دائماً على مستوى السرعة والمجال. كل متجه يأخذ محوراً مختلفاً (x, y, z).",
        units: ""
    }
];

const importantNotes = [
    {
        icon: Lightbulb,
        title: "شحنة ساكنة لا تتأثر",
        content: "الشحنة الساكنة (v = 0) لا تتأثر بأي قوة مغناطيسية، لأن F = qvB sin(θ) = 0 عندما v = 0."
    },
    {
        icon: Zap,
        title: "النيوترون وأشعة غاما",
        content: "الجسيمات المتعادلة كهربائياً (q = 0) مثل النيوترون وأشعة غاما لا تتأثر بقوة مغناطيسية."
    },
    {
        icon: Info,
        title: "السرعة موازية للمجال",
        content: "إذا تحركت الشحنة بموازاة المجال المغناطيسي (θ = 0° أو 180°)، فإن القوة = صفر لأن sin(0°) = sin(180°) = 0."
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
                            {law.units &&
                                <div dir="ltr" className="bg-muted p-2 rounded text-center text-sm">
                                    <InlineMath math={law.units} />
                                </div>
                            }
                            <CardDescription className="text-right whitespace-pre-line">
                                {law.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {importantNotes.map((note, index) => (
                        <Alert key={index} className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
                            <note.icon className="h-4 w-4 text-amber-600" />
                            <AlertTitle className="font-bold text-amber-800 dark:text-amber-400">{note.title}</AlertTitle>
                            <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm">
                                {note.content}
                            </AlertDescription>
                        </Alert>
                    ))}
                </div>

                <Alert variant="default" className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="font-bold text-blue-800 dark:text-blue-400">القوة المغناطيسية لا تبذل شغلاً</AlertTitle>
                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                        لأن القوة المغناطيسية عمودية دائماً على السرعة، فإنها لا تبذل شغلاً على الشحنة. هذا يعني أن مقدار السرعة يبقى ثابتاً، لكن اتجاهها يتغير فقط.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
