
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');
    const renderPart = (part: string, index: number) => {
        if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
        return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
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

const quizQuestions = [
  {
    questionText: 'ما هو الشرط الأساسي لتطبيق مبدأ حفظ الزخم الزاوي؟',
    options: ['أن تكون السرعة الزاوية ثابتة', 'أن يكون عزم القصور الذاتي ثابتًا', 'أن تكون محصلة العزوم الخارجية المؤثرة على النظام تساوي صفرًا', 'أن تكون الطاقة الحركية محفوظة'],
    correctAnswerIndex: 2,
    explanation: 'من قانون نيوتن الثاني للدوران ($\Sigma \\tau = \\Delta L / \\Delta t$)، إذا كانت محصلة العزوم الخارجية صفرًا، فإن التغير في الزخم الزاوي ($\Delta L$) يساوي صفرًا، أي أن الزخم الزاوي يبقى محفوظًا (ثابتًا).'
  },
  {
    questionText: 'متزلجة على الجليد تدور وذراعاها ممدودتان. عندما تضم ذراعيها إلى جسدها، ماذا يحدث لكل من عزم قصورها الذاتي وسرعتها الزاوية؟',
    options: ['يزداد عزم القصور وتقل السرعة الزاوية', 'يقل عزم القصور وتزداد السرعة الزاوية', 'كلاهما يزداد', 'كلاهما يقل'],
    correctAnswerIndex: 1,
    explanation: 'عندما تضم المتزلجة ذراعيها، فإنها تقلل من توزيع كتلتها بعيدًا عن محور الدوران، مما يقلل من عزم قصورها الذاتي (I). وبما أن الزخم الزاوي ($L = I\\omega$) محفوظ (لأن العزم الخارجي مهمل)، فإن نقصان I يجب أن يقابله زيادة في السرعة الزاوية ω.'
  },
  {
    questionText: 'يجلس طفل على حافة قرص دوار. إذا تحرك الطفل نحو مركز القرص، فإن الزخم الزاوي لنظام (الطفل + القرص)...',
    options: ['يزداد', 'يقل', 'يبقى ثابتًا', 'يصبح صفرًا'],
    correctAnswerIndex: 2,
    explanation: 'القوة التي يحرك بها الطفل نفسه نحو المركز هي قوة داخلية في نظام (الطفل + القرص). بما أنه لا يوجد عزم خارجي محصل على النظام، فإن زخمه الزاوي الكلي يبقى ثابتًا.'
  },
  {
    questionText: 'قرص دوار عزم قصوره الذاتي I وسرعته الزاوية ω. سقطت عليه قطعة عجين لزجة كتلتها m على بعد r من المركز والتصقت به. ما الذي يحدث للسرعة الزاوية النهائية للنظام؟',
    options: ['تزداد', 'تقل', 'تبقى ثابتة', 'تعتمد على كتلة القرص'],
    correctAnswerIndex: 1,
    explanation: 'عندما تلتصق قطعة العجين، يزداد عزم القصور الذاتي الكلي للنظام ليصبح ($I + mr^2$). بما أن الزخم الزاوي محفوظ، فإن زيادة عزم القصور الذاتي يجب أن تؤدي إلى نقصان السرعة الزاوية النهائية للحفاظ على حاصل الضرب $I\\omega$ ثابتًا.'
  },
  {
    questionText: 'عندما يدور كوكب حول الشمس في مدار إهليلجي، تكون سرعته أكبر عندما يكون...',
    options: ['في أبعد نقطة عن الشمس (الأوج)', 'في أقرب نقطة من الشمس (الحضيض)', 'سرعته ثابتة على طول المدار', 'لا يمكن تحديد ذلك'],
    correctAnswerIndex: 1,
    explanation: 'قوة الجاذبية من الشمس تؤثر دائمًا باتجاه مركز الشمس، وبالتالي فإن عزمها حول الشمس يساوي صفرًا. لذلك، الزخم الزاوي للكوكب محفوظ. عندما يكون الكوكب أقرب إلى الشمس (r أقل)، يجب أن تزداد سرعته (v) للحفاظ على الزخم الزاوي ($L=mvr$) ثابتًا.'
  },
];

export default function AngularMomentumConservationQuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  
  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswerIndex).length;
  }

  return (
    <div className="p-4 bg-muted/40">
       <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {quizQuestions.map((q, qIndex) => (
          <Card key={qIndex} className={`border-2 ${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors duration-300 shadow-lg`}>
            <CardHeader>
              <CardTitle><SmartTextRenderer as="div" text={`السؤال ${qIndex + 1}: ${q.questionText}`} /></CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, oIndex) => (
                  <Label key={oIndex} htmlFor={`q${qIndex}-o${oIndex}`} className={`p-4 rounded-lg border-2 flex items-center gap-4 cursor-pointer transition-all hover:bg-accent ${selectedAnswers[qIndex] === oIndex ? 'bg-primary/10 border-primary' : 'bg-background'}`}>
                    <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} disabled={isSubmitted} />
                    <SmartTextRenderer as="span" text={option} />
                     {isSubmitted && selectedAnswers[qIndex] === oIndex && selectedAnswers[qIndex] !== q.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-500 ms-auto"/>}
                    {isSubmitted && oIndex === q.correctAnswerIndex && <CheckCircle className="w-5 h-5 text-green-500 ms-auto"/>}
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
             {isSubmitted && (
                 <CardFooter className="flex flex-col items-start bg-muted/50 p-4 mt-4 rounded-b-lg">
                    <p className="font-bold text-foreground">الشرح:</p>
                    <SmartTextRenderer as="p" text={q.explanation} />
                 </CardFooter>
            )}
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        {!isSubmitted ? (
            <Button onClick={handleSubmit} size="lg" className="w-full max-w-xs mx-auto">إظهار النتائج</Button>
        ) : (
            <Card className="max-w-sm mx-auto p-6">
                <CardTitle className="text-2xl mb-4">نتيجتك النهائية</CardTitle>
                <p className="text-3xl font-bold text-primary">
                    {calculateScore()} / {quizQuestions.length}
                </p>
                <Button onClick={() => { setIsSubmitted(false); setSelectedAnswers(new Array(quizQuestions.length).fill(null)); }} variant="outline" className="mt-6">
                    إعادة الاختبار
                </Button>
            </Card>
        )}
      </div>
      </div>
    </div>
  );
}
