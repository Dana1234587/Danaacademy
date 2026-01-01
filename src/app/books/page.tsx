'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { motion } from 'framer-motion';
import { BookMarked, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BooksPage() {
    return (
        <MarketingLayout>
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden relative">

                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 inline-block"
                    >
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/20">
                            <BookMarked className="w-12 h-12 text-white" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        المكتبة <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">الالكترونية</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/60 max-w-2xl mx-auto mb-10"
                    >
                        مكتبة الكتب والمراجع الدراسية قيد الإنشاء. ستتوفر قريباً للتحميل المباشر.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link href="/learn" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full border border-white/10">
                            <ArrowLeft className="w-5 h-5" />
                            <span>العودة للتعلم</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </MarketingLayout>
    );
}
