
'use client';

import { QuizClient } from './QuizClient';
import { unit3QuizQuestions } from './quiz-data';

export default function Unit3QuizPage() {
  return (
    <QuizClient questions={unit3QuizQuestions} />
  );
}
