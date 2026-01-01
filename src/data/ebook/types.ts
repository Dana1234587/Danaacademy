// E-Book Data Types for Interactive Learning Portal

export interface Topic {
    id: string;
    number: string; // e.g., "1.1", "1.2"
    title: string;
    content: string; // Main explanation text (supports LaTeX with $...$)
    keyPoints: string[];
    formulas?: Formula[];
    examples?: Example[];
    notes?: string[];
}

export interface Formula {
    id: string;
    name: string;
    latex: string;
    description: string;
    variables: Variable[];
}

export interface Variable {
    symbol: string;
    meaning: string;
    unit?: string;
}

export interface Example {
    id: string;
    title: string;
    question: string;
    given: string[];
    required: string;
    solution: SolutionStep[];
    answer: string;
    source: 'textbook' | 'additional';
}

export interface SolutionStep {
    step: number;
    text: string;
    formula?: string; // LaTeX
}

export interface LifeTechConnection {
    id: string;
    title: string;
    image?: string;
    description: string;
    physicsExplanation: string;
    realWorldExamples: string[];
}

export interface Experiment {
    id: string;
    title: string;
    objective: string;
    materials: string[];
    procedure: string[];
    observations: string[];
    analysis: string;
    conclusion: string;
    safetyNotes?: string[];
}

export interface FlashCard {
    id: string;
    front: string; // Question or term
    back: string;  // Answer or definition
    category: 'definition' | 'formula' | 'unit' | 'concept';
}

export interface GameQuestion {
    id: string;
    type: 'matching' | 'fill-blank' | 'ordering' | 'quick-choice';
    question: string;
    options?: string[];
    correctAnswer: string | string[];
    hint?: string;
}

export interface QuizQuestion {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'excellence';
    source: 'textbook' | 'author';
    topic?: string; // Reference to topic id
}

export interface Lesson {
    id: string;
    number: number;
    title: string;
    titleAr: string;
    duration: number;
    topics: Topic[];
    lifeTech?: LifeTechConnection[];
    experiments?: Experiment[];
    flashcards: FlashCard[];
    games: GameQuestion[];
}

export interface UnitApplications {
    id: string;
    title: string;
    problems: ApplicationProblem[];
}

export interface ApplicationProblem {
    id: string;
    category: string;
    question: string;
    solution: SolutionStep[];
    answer: string;
}

export interface Unit {
    id: string;
    number: number;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    lessons: Lesson[];
    applications: UnitApplications;
    unitQuestions: QuizQuestion[];
}
