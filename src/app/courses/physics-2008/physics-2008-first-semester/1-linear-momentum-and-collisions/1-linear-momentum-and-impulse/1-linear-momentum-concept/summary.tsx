'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Lightbulb, BookOpen, Calculator } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const renderPart = (part: string, index: number) => {
        // Even indices are text, odd are math
        if (index % 2 === 0) {
            return <span key={index}>{part}</span>;
        } else {
            // This is LaTeX
            return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
        }
    };

    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line.split('$').map(renderPart)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};

const laws = [
    {
        title: "تعريف الزخم الخطي",
        formula: "\\vec{p} = m \\cdot \\vec{v}",
        description: "الزخم الخطي هو كمية فيزيائية تصف حالة حركة الجسم. يُعرّف بأنه حاصل ضرب كتلة الجسم ($m$) في سرعته المتجهة ($\\vec{v}$). وهو يعطي مقياسًا لمدى صعوبة إيقاف جسم متحرك.",
        icon: BookOpen,
        color: "text-blue-500"
    },
    {
        title: "الزخم كمية متجهة",
        description: "الزخم الخطي كمية متجهة وليست قياسية. هذا يعني أن له مقدارًا واتجاهًا. اتجاه الزخم هو دائمًا نفس اتجاه السرعة المتجهة للجسم. عند حل المسائل، نستخدم الإشارات الموجبة والسالبة لتمثيل الاتجاهات المختلفة.",
        icon: Info,
        color: "text-purple-500"
    },
    {
        title: "وحدة قياس الزخم الخطي",
        formula: "\\text{kg} \\cdot \\text{m/s} \\quad \\text{or} \\quad \\text{N} \\cdot \\text{s}",
        description: "في النظام الدولي للوحدات (SI)، يُقاس الزخم بوحدة (كيلوغرام × متر/ثانية) أو (نيوتن × ثانية). كلتا الوحدتين متكافئتان.",
        icon: Calculator,
        color: "text-green-500"
    },
    {
        title: "الزخم كمقياس لصعوبة الإيقاف",
        description: "يمكن التفكير بالزخم على أنه مقياس لـ\"قوة الدفع\" التي يحملها الجسم المتحرك. كلما زادت كتلة الجسم أو سرعته، زاد زخمه، وبالتالي أصبح من الصعب إيقافه أو تغيير حالة حركته.",
        icon: Lightbulb,
        color: "text-amber-500"
    },
];

const examples = [
    {
        title: "مثال 1: حساب زخم سيارة",
        question: "سيارة كتلتها $1500 \\text{ kg}$ تتحرك بسرعة $20 \\text{ m/s}$ شرقًا. احسب زخمها الخطي.",
        solution: [
            "المعطيات: $m = 1500 \\text{ kg}$، $v = 20 \\text{ m/s}$ (شرقًا)",
            "المطلوب: الزخم الخطي $p$",
            "الحل: باستخدام قانون الزخم:",
            "$p = m \\times v$",
            "$p = 1500 \\times 20 = 30000 \\text{ kg} \\cdot \\text{m/s}$",
            "الإجابة: $p = 30000 \\text{ kg} \\cdot \\text{m/s}$ شرقًا"
        ]
    },
    {
        title: "مثال 2: مقارنة زخم جسمين",
        question: "أيهما أكبر زخمًا: شاحنة كتلتها $5000 \\text{ kg}$ تتحرك بسرعة $10 \\text{ m/s}$، أم سيارة صغيرة كتلتها $1000 \\text{ kg}$ تتحرك بسرعة $40 \\text{ m/s}$؟",
        solution: [
            "زخم الشاحنة: $p_1 = m_1 \\times v_1 = 5000 \\times 10 = 50000 \\text{ kg} \\cdot \\text{m/s}$",
            "زخم السيارة: $p_2 = m_2 \\times v_2 = 1000 \\times 40 = 40000 \\text{ kg} \\cdot \\text{m/s}$",
            "المقارنة: $p_1 > p_2$",
            "الإجابة: زخم الشاحنة أكبر رغم أن سرعتها أقل!"
        ]
    },
    {
        title: "مثال 3: إيجاد السرعة من الزخم",
        question: "جسم كتلته $4 \\text{ kg}$ وزخمه $24 \\text{ kg} \\cdot \\text{m/s}$. ما سرعته؟",
        solution: [
            "المعطيات: $m = 4 \\text{ kg}$، $p = 24 \\text{ kg} \\cdot \\text{m/s}$",
            "المطلوب: السرعة $v$",
            "من قانون الزخم: $p = m \\times v$",
            "بتحويل المعادلة: $v = \\frac{p}{m}$",
            "$v = \\frac{24}{4} = 6 \\text{ m/s}$"
        ]
    },
    {
        title: "مثال 4: الزخم والاتجاه",
        question: "كرة كتلتها $0.5 \\text{ kg}$ تتحرك بسرعة $8 \\text{ m/s}$ نحو اليسار. ما زخمها إذا اعتبرنا اليمين الاتجاه الموجب؟",
        solution: [
            "المعطيات: $m = 0.5 \\text{ kg}$، $v = -8 \\text{ m/s}$ (سالب لأنها نحو اليسار)",
            "الحل: $p = m \\times v$",
            "$p = 0.5 \\times (-8) = -4 \\text{ kg} \\cdot \\text{m/s}$",
            "الإشارة السالبة تدل على أن اتجاه الزخم نحو اليسار"
        ]
    }
];

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg">
            {/* Main Laws Section */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    القوانين والمفاهيم الأساسية
                </h3>
                {laws.map((law, index) => (
                    <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-muted ${law.color}`}>
                                    <law.icon className="w-5 h-5" />
                                </div>
                                <CardTitle className="text-primary text-lg"><SmartTextRenderer as="div" text={law.title} /></CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {law.formula && (
                                <div dir="ltr" className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg text-center mb-4 border border-primary/20">
                                    <BlockMath math={law.formula} />
                                </div>
                            )}
                            <CardDescription className="text-base">
                                <SmartTextRenderer text={law.description} />
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}

                <Alert className="border-blue-500/50 bg-blue-500/5">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="font-bold text-blue-700">ملاحظة مهمة على الاتجاه</AlertTitle>
                    <AlertDescription>
                        <SmartTextRenderer as="div" text={"بشكل عام، نعتبر الحركة نحو اليمين (أو محور $x$ الموجب) ذات إشارة موجبة (+)، والحركة نحو اليسار (أو محور $x$ السالب) ذات إشارة سالبة (-)."} />
                    </AlertDescription>
                </Alert>
            </div>

            {/* Examples Section */}
            <div className="mt-8 space-y-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    أمثلة محلولة من الكتاب
                </h3>
                {examples.map((example, index) => (
                    <Card key={index} className="shadow-md border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-green-700 text-base">{example.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                                <p className="font-semibold text-amber-800 dark:text-amber-200 mb-1">السؤال:</p>
                                <SmartTextRenderer as="div" text={example.question} />
                            </div>
                            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
                                <p className="font-semibold text-green-800 dark:text-green-200 mb-2">الحل:</p>
                                <div className="space-y-2">
                                    {example.solution.map((step, sIndex) => (
                                        <div key={sIndex} className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold mt-1">{sIndex + 1}.</span>
                                            <SmartTextRenderer as="span" text={step} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Reference */}
            <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/30">
                <CardHeader>
                    <CardTitle className="text-center">🎯 ملخص سريع</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-background rounded-lg shadow">
                            <p className="text-muted-foreground text-sm">القانون الأساسي</p>
                            <div dir="ltr" className="text-xl mt-2"><InlineMath math="p = m \times v" /></div>
                        </div>
                        <div className="p-4 bg-background rounded-lg shadow">
                            <p className="text-muted-foreground text-sm">الوحدة</p>
                            <div dir="ltr" className="text-xl mt-2"><InlineMath math="\text{kg} \cdot \text{m/s}" /></div>
                        </div>
                        <div className="p-4 bg-background rounded-lg shadow">
                            <p className="text-muted-foreground text-sm">النوع</p>
                            <p className="text-xl mt-2 font-bold text-primary">كمية متجهة ↗️</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg shadow">
                            <p className="text-muted-foreground text-sm">المعنى الفيزيائي</p>
                            <p className="text-xl mt-2 font-bold text-primary">صعوبة الإيقاف</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
