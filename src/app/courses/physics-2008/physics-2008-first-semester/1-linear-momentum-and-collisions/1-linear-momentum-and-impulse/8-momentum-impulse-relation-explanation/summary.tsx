'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, Lightbulb, BookOpen, Calculator, Car, Shield } from 'lucide-react';
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
    title: "تعريف الدفع (Impulse)",
    formula: "\\vec{J} = \\vec{F} \\cdot \\Delta t",
    description: "الدفع هو تأثير قوة على جسم خلال فترة زمنية معينة. وهو كمية متجهة اتجاهها بنفس اتجاه القوة المؤثرة.",
    icon: Lightbulb,
    color: "text-amber-500"
  },
  {
    title: "نظرية الدفع والزخم (Impulse-Momentum Theorem)",
    formula: "\\vec{J} = \\Delta \\vec{p} = m(\\vec{v}_f - \\vec{v}_i)",
    description: "الدفع المؤثر على جسم يساوي التغير في زخمه الخطي. هذه المعادلة تربط بين القوة (سبب الحركة) والتغير في حالة الحركة (النتيجة).",
    icon: BookOpen,
    color: "text-blue-500"
  },
  {
    title: "الصيغة الموسعة",
    formula: "F \\cdot \\Delta t = m \\cdot v_f - m \\cdot v_i",
    description: "هذه الصيغة توضح العلاقة بشكل كامل: القوة × الزمن = الزخم النهائي - الزخم الابتدائي",
    icon: Calculator,
    color: "text-green-500"
  },
  {
    title: "العلاقة العكسية بين القوة والزمن",
    formula: "F = \\frac{\\Delta p}{\\Delta t}",
    description: "عند ثبات التغير في الزخم (Δp)، تتناسب القوة عكسيًا مع الزمن. زيادة زمن التصادم يقلل القوة المؤثرة!",
    icon: Shield,
    color: "text-purple-500"
  },
];

const applications = [
  {
    title: "الوسائد الهوائية في السيارات",
    icon: Car,
    explanation: "عند التصادم، الوسادة الهوائية تزيد زمن توقف الراكب من أجزاء من الثانية إلى فترة أطول. بما أن التغير في الزخم ثابت، فإن زيادة الزمن تؤدي لتقليل القوة على جسم الراكب.",
    formula: "\\Delta t \\uparrow \\implies F \\downarrow"
  },
  {
    title: "ثني الركبتين عند القفز",
    icon: Shield,
    explanation: "عند النزول من ارتفاع وثني الركبتين، يزيد زمن التوقف، مما يقلل القوة المؤثرة على المفاصل ويمنع الإصابات.",
    formula: "\\Delta t \\uparrow \\implies F \\downarrow"
  },
  {
    title: "قفازات الملاكمة",
    icon: Shield,
    explanation: "القفازات المبطنة تزيد زمن تأثير اللكمة على الخصم، مما يقلل من القوة اللحظية ويقلل احتمالية الإصابة الخطيرة.",
    formula: "\\Delta t \\uparrow \\implies F \\downarrow"
  },
];

const examples = [
  {
    title: "مثال 1: حساب الدفع",
    question: "قوة مقدارها $500 \\text{ N}$ تؤثر على جسم لمدة $0.02 \\text{ s}$. احسب الدفع المؤثر على الجسم.",
    solution: [
      "المعطيات: $F = 500 \\text{ N}$، $\\Delta t = 0.02 \\text{ s}$",
      "المطلوب: الدفع $J$",
      "الحل: $J = F \\times \\Delta t$",
      "$J = 500 \\times 0.02 = 10 \\text{ N} \\cdot \\text{s}$"
    ]
  },
  {
    title: "مثال 2: إيجاد القوة من الدفع",
    question: "كرة كتلتها $0.15 \\text{ kg}$ تتحرك بسرعة $20 \\text{ m/s}$. ضُربت بمضرب فارتدت بسرعة $30 \\text{ m/s}$ بالاتجاه المعاكس. إذا كان زمن التلامس $0.01 \\text{ s}$، احسب القوة المؤثرة.",
    solution: [
      "المعطيات: $m = 0.15 \\text{ kg}$، $v_i = +20 \\text{ m/s}$، $v_f = -30 \\text{ m/s}$، $\\Delta t = 0.01 \\text{ s}$",
      "الدفع = التغير في الزخم:",
      "$J = m(v_f - v_i) = 0.15(-30 - 20) = 0.15 \\times (-50) = -7.5 \\text{ N} \\cdot \\text{s}$",
      "القوة: $F = \\frac{J}{\\Delta t} = \\frac{-7.5}{0.01} = -750 \\text{ N}$",
      "الإشارة السالبة تعني أن القوة بعكس الاتجاه الابتدائي"
    ]
  },
  {
    title: "مثال 3: التغير في السرعة",
    question: "جسم كتلته $5 \\text{ kg}$ يتحرك بسرعة $10 \\text{ m/s}$. أثرت عليه قوة $100 \\text{ N}$ لمدة $0.5 \\text{ s}$ بنفس اتجاه الحركة. ما سرعته النهائية؟",
    solution: [
      "المعطيات: $m = 5 \\text{ kg}$، $v_i = 10 \\text{ m/s}$، $F = 100 \\text{ N}$، $\\Delta t = 0.5 \\text{ s}$",
      "الدفع: $J = F \\times \\Delta t = 100 \\times 0.5 = 50 \\text{ N} \\cdot \\text{s}$",
      "من نظرية الدفع: $J = m(v_f - v_i)$",
      "$50 = 5(v_f - 10)$",
      "$v_f - 10 = 10$",
      "$v_f = 20 \\text{ m/s}$"
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
              <div dir="ltr" className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg text-center border border-primary/20">
                <BlockMath math={law.formula} />
              </div>
              <CardDescription className="text-base">
                <SmartTextRenderer text={law.description} />
              </CardDescription>
            </CardContent>
          </Card>
        ))}

        <Alert className="border-blue-500/50 bg-blue-500/5">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertTitle className="font-bold text-blue-700">وحدات متكافئة</AlertTitle>
          <AlertDescription>
            <SmartTextRenderer as="div" text={'من نظرية الدفع-الزخم، نستنتج أن وحدة الدفع ($\\text{N} \\cdot \\text{s}$) تكافئ وحدة الزخم ($\\text{kg} \\cdot \\text{m/s}$).'} />
          </AlertDescription>
        </Alert>
      </div>

      {/* Applications Section */}
      <div className="mt-8 space-y-6">
        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          تطبيقات عملية: لماذا نزيد زمن التصادم؟
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
                <div dir="ltr" className="inline-block bg-purple-100 dark:bg-purple-950 px-3 py-1 rounded-full">
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

      {/* Quick Reference */}
      <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="text-center">🎯 ملخص سريع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow">
              <p className="text-muted-foreground text-sm">قانون الدفع</p>
              <div dir="ltr" className="text-lg mt-2"><InlineMath math="J = F \times \Delta t" /></div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow">
              <p className="text-muted-foreground text-sm">نظرية الدفع-الزخم</p>
              <div dir="ltr" className="text-lg mt-2"><InlineMath math="J = \Delta p" /></div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow">
              <p className="text-muted-foreground text-sm">العلاقة الكاملة</p>
              <div dir="ltr" className="text-lg mt-2"><InlineMath math="F \cdot \Delta t = m \Delta v" /></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
