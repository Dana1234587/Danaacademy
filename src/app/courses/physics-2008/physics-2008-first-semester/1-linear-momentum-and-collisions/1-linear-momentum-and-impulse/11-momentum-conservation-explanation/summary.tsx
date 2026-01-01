'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, Lightbulb, BookOpen, Calculator, Rocket, Target, Bomb } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
  const lines = text.split('\n');
  const renderPart = (part: string, index: number) => {
    if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
    return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
  };
  return (
    <Wrapper className="leading-relaxed">
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
    title: "قانون حفظ الزخم الخطي",
    formula: "\\sum \\vec{p}_{\\text{قبل}} = \\sum \\vec{p}_{\\text{بعد}}",
    description: "في النظام المعزول (محصلة القوى الخارجية = صفر)، الزخم الكلي للنظام يبقى ثابتًا. أي أن مجموع زخم الأجسام قبل التفاعل يساوي مجموعها بعد التفاعل.",
    icon: BookOpen,
    color: "text-blue-500"
  },
  {
    title: "الصيغة الرياضية للتصادم",
    formula: "m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}",
    description: "هذه الصيغة تُستخدم عند تصادم جسمين. حيث $m$ تمثل الكتلة، $v_i$ السرعة الابتدائية، و$v_f$ السرعة النهائية.",
    icon: Calculator,
    color: "text-green-500"
  },
  {
    title: "النظام المعزول",
    description: "هو النظام الذي تكون فيه محصلة القوى الخارجية تساوي صفرًا. أمثلة: تصادم كرتين على سطح أملس، انفجار قذيفة في الفضاء، ارتداد البندقية عند الإطلاق.",
    icon: Target,
    color: "text-purple-500"
  },
  {
    title: "الاشتقاق من قانون نيوتن الثالث",
    formula: "\\vec{F}_{12} = -\\vec{F}_{21} \\implies \\Delta \\vec{p}_1 = -\\Delta \\vec{p}_2",
    description: "القوة التي يؤثر بها الجسم الأول على الثاني تساوي وتعاكس القوة العكسية. لذلك، التغير في زخم الأول = سالب التغير في زخم الثاني، ومجموع التغيرات = صفر.",
    icon: Lightbulb,
    color: "text-amber-500"
  },
];

const applications = [
  {
    title: "ارتداد البندقية (الارتداد)",
    icon: Rocket,
    explanation: "عند إطلاق رصاصة للأمام، ترتد البندقية للخلف. الزخم الكلي قبل وبعد الإطلاق = صفر.",
    formula: "0 = m_{\\text{رصاصة}} v_{\\text{رصاصة}} + m_{\\text{بندقية}} v_{\\text{بندقية}}"
  },
  {
    title: "صاروخ الفضاء",
    icon: Rocket,
    explanation: "الصاروخ يقذف الغازات للخلف بسرعة عالية، فيندفع هو للأمام. مبدأ حفظ الزخم في أوضح صوره!",
    formula: "m_{\\text{صاروخ}} \\Delta v = -m_{\\text{غاز}} v_{\\text{غاز}}"
  },
  {
    title: "الانفجارات",
    icon: Bomb,
    explanation: "عند انفجار قذيفة، مجموع زخم الشظايا = زخم القذيفة قبل الانفجار.",
    formula: "\\vec{p}_{\\text{قبل}} = \\sum \\vec{p}_{\\text{شظايا}}"
  },
];

const examples = [
  {
    title: "مثال 1: تصادم والتحام",
    question: "عربة كتلتها $2 \\text{ kg}$ تتحرك بسرعة $3 \\text{ m/s}$ تصطدم بعربة ساكنة كتلتها $1 \\text{ kg}$ فتلتحمان. ما سرعتهما بعد الالتحام؟",
    solution: [
      "المعطيات: $m_1 = 2 \\text{ kg}$، $v_{1i} = 3 \\text{ m/s}$، $m_2 = 1 \\text{ kg}$، $v_{2i} = 0$",
      "المطلوب: السرعة المشتركة $v_f$ بعد الالتحام",
      "من قانون حفظ الزخم:",
      "$m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2) v_f$",
      "$(2)(3) + (1)(0) = (2 + 1) v_f$",
      "$6 = 3 v_f$",
      "$v_f = 2 \\text{ m/s}$"
    ]
  },
  {
    title: "مثال 2: ارتداد البندقية",
    question: "بندقية كتلتها $4 \\text{ kg}$ تطلق رصاصة كتلتها $0.02 \\text{ kg}$ بسرعة $400 \\text{ m/s}$. ما سرعة ارتداد البندقية؟",
    solution: [
      "الزخم قبل الإطلاق = صفر (كلاهما ساكن)",
      "الزخم بعد الإطلاق: $m_{\\text{رصاصة}} v_{\\text{رصاصة}} + m_{\\text{بندقية}} v_{\\text{بندقية}} = 0$",
      "$(0.02)(400) + (4) v_{\\text{بندقية}} = 0$",
      "$8 + 4 v_{\\text{بندقية}} = 0$",
      "$v_{\\text{بندقية}} = -2 \\text{ m/s}$",
      "الإشارة السالبة تعني أن البندقية ترتد بالاتجاه المعاكس للرصاصة"
    ]
  },
  {
    title: "مثال 3: تصادم مع ارتداد",
    question: "كرة كتلتها $2 \\text{ kg}$ تتحرك بسرعة $6 \\text{ m/s}$ تصطدم بكرة ساكنة كتلتها $4 \\text{ kg}$. إذا ارتدت الكرة الأولى بسرعة $2 \\text{ m/s}$ بالاتجاه المعاكس، ما سرعة الكرة الثانية؟",
    solution: [
      "المعطيات: $m_1 = 2 \\text{ kg}$، $v_{1i} = +6 \\text{ m/s}$، $m_2 = 4 \\text{ kg}$، $v_{2i} = 0$، $v_{1f} = -2 \\text{ m/s}$",
      "من حفظ الزخم:",
      "$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$",
      "$(2)(6) + (4)(0) = (2)(-2) + (4) v_{2f}$",
      "$12 = -4 + 4 v_{2f}$",
      "$16 = 4 v_{2f}$",
      "$v_{2f} = 4 \\text{ m/s}$ (بنفس اتجاه الكرة الأولى الابتدائي)"
    ]
  },
  {
    title: "مثال 4: انفجار قذيفة",
    question: "قذيفة كتلتها $10 \\text{ kg}$ تتحرك بسرعة $50 \\text{ m/s}$ انفجرت إلى قطعتين. إذا كانت كتلة القطعة الأولى $4 \\text{ kg}$ وسرعتها $100 \\text{ m/s}$ بنفس الاتجاه، ما سرعة القطعة الثانية؟",
    solution: [
      "زخم القذيفة قبل الانفجار: $p_i = (10)(50) = 500 \\text{ kg} \\cdot \\text{m/s}$",
      "كتلة القطعة الثانية: $m_2 = 10 - 4 = 6 \\text{ kg}$",
      "من حفظ الزخم:",
      "$500 = (4)(100) + (6) v_2$",
      "$500 = 400 + 6 v_2$",
      "$100 = 6 v_2$",
      "$v_2 = 16.67 \\text{ m/s}$ بنفس الاتجاه"
    ]
  },
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
      {/* Main Laws Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          القوانين الأساسية
        </h3>

        {laws.map((law, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${law.color}`}>
                  <law.icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-primary text-lg">{law.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {law.formula && (
                <div dir="ltr" className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg text-center border border-primary/20">
                  <BlockMath math={law.formula} />
                </div>
              )}
              <CardDescription className="text-base">
                <SmartTextRenderer text={law.description} />
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Applications Section */}
      <div className="mt-8 space-y-6">
        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          تطبيقات على حفظ الزخم
        </h3>

        <div className="grid gap-4">
          {applications.map((app, index) => (
            <Card key={index} className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <app.icon className="w-5 h-5 text-purple-500" />
                  <CardTitle className="text-base">{app.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{app.explanation}</p>
                <div dir="ltr" className="inline-block bg-purple-100 dark:bg-purple-950 px-3 py-1 rounded-full text-sm">
                  <InlineMath math={app.formula} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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

      <Alert className="mt-8 border-blue-500/50 bg-blue-500/5">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertTitle className="font-bold text-blue-700">ملاحظة مهمة</AlertTitle>
        <AlertDescription>
          <SmartTextRenderer as="div" text={"قانون حفظ الزخم يطبق فقط عندما تكون محصلة القوى الخارجية = صفر. تذكر أن تحدد اتجاهًا موجبًا ثابتًا قبل حل أي مسألة!"} />
        </AlertDescription>
      </Alert>

      {/* Quick Reference */}
      <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="text-center">🎯 ملخص سريع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow">
              <p className="text-muted-foreground text-sm">قانون حفظ الزخم</p>
              <div dir="ltr" className="text-lg mt-2"><InlineMath math="\sum p_i = \sum p_f" /></div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow">
              <p className="text-muted-foreground text-sm">للتصادم بين جسمين</p>
              <div dir="ltr" className="text-lg mt-2"><InlineMath math="m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}" /></div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow">
              <p className="text-muted-foreground text-sm">للالتحام</p>
              <div dir="ltr" className="text-lg mt-2"><InlineMath math="m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f" /></div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow">
              <p className="text-muted-foreground text-sm">الشرط الأساسي</p>
              <p className="text-lg mt-2 font-bold text-primary">نظام معزول ⚡</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
