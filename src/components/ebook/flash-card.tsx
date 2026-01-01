'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FlashCard as FlashCardType } from '@/data/ebook/types';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Smart text renderer for LaTeX
const SmartText = ({ text, className = '' }: { text: string; className?: string }) => {
    const parts = text.split('$');
    return (
        <span className={className}>
            {parts.map((part, i) =>
                i % 2 === 0 ? (
                    <span key={i}>{part}</span>
                ) : (
                    <span key={i} dir="ltr" className="inline-block mx-1">
                        <InlineMath math={part} />
                    </span>
                )
            )}
        </span>
    );
};

interface FlashCardProps {
    card: FlashCardType;
    onNext?: () => void;
    onPrev?: () => void;
    currentIndex?: number;
    totalCards?: number;
}

export function FlashCard({ card, onNext, onPrev, currentIndex = 0, totalCards = 1 }: FlashCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const categoryColors = {
        definition: 'from-purple-500 to-pink-500',
        formula: 'from-blue-500 to-cyan-500',
        unit: 'from-green-500 to-emerald-500',
        concept: 'from-amber-500 to-orange-500',
    };

    const categoryLabels = {
        definition: 'تعريف',
        formula: 'قانون',
        unit: 'وحدة',
        concept: 'مفهوم',
    };

    return (
        <div className="w-full max-w-md mx-auto perspective-1000">
            {/* Card Counter */}
            <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-white/50 text-sm">
                    {currentIndex + 1} / {totalCards}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[card.category]} text-white`}>
                    {categoryLabels[card.category]}
                </span>
            </div>

            {/* Flip Card */}
            <motion.div
                className="relative w-full h-64 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <AnimatePresence mode="wait">
                    {!isFlipped ? (
                        <motion.div
                            key="front"
                            initial={{ rotateY: 180, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -180, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className={`absolute inset-0 bg-gradient-to-br ${categoryColors[card.category]} rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl`}
                        >
                            <Sparkles className="w-8 h-8 text-white/50 mb-4" />
                            <SmartText
                                text={card.front}
                                className="text-xl font-bold text-white leading-relaxed"
                            />
                            <p className="text-white/60 text-sm mt-6">اضغط لرؤية الإجابة</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="back"
                            initial={{ rotateY: -180, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: 180, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-2 border-white/20"
                        >
                            <SmartText
                                text={card.back}
                                className="text-xl font-bold text-white leading-relaxed"
                            />
                            <p className="text-white/40 text-sm mt-6">اضغط للعودة</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onPrev?.(); setIsFlipped(false); }}
                    disabled={currentIndex === 0}
                    className="rounded-full border-white/20 text-white hover:bg-white/10"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                    className="rounded-full border-white/20 text-white hover:bg-white/10"
                >
                    <RotateCcw className="w-5 h-5" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onNext?.(); setIsFlipped(false); }}
                    disabled={currentIndex === totalCards - 1}
                    className="rounded-full border-white/20 text-white hover:bg-white/10"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}

// Flash Cards Deck Component
interface FlashCardDeckProps {
    cards: FlashCardType[];
    title?: string;
}

export function FlashCardDeck({ cards, title = "بطاقات المراجعة" }: FlashCardDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffled, setShuffled] = useState(false);
    const [displayCards, setDisplayCards] = useState(cards);

    const handleShuffle = () => {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
        setDisplayCards(shuffledCards);
        setCurrentIndex(0);
        setShuffled(true);
    };

    const handleReset = () => {
        setDisplayCards(cards);
        setCurrentIndex(0);
        setShuffled(false);
    };

    return (
        <div className="py-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">🎴</span>
                    {title}
                </h3>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShuffle}
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        🔀 خلط
                    </Button>
                    {shuffled && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReset}
                            className="border-white/20 text-white hover:bg-white/10"
                        >
                            ↩️ إعادة
                        </Button>
                    )}
                </div>
            </div>

            <FlashCard
                card={displayCards[currentIndex]}
                currentIndex={currentIndex}
                totalCards={displayCards.length}
                onNext={() => setCurrentIndex(Math.min(currentIndex + 1, displayCards.length - 1))}
                onPrev={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
            />

            {/* Progress Bar */}
            <div className="mt-8 max-w-md mx-auto">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / displayCards.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
}
