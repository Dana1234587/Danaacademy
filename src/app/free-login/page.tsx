'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, BookOpen, Gamepad2, FlaskConical, ArrowLeft } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

// Google Icon SVG
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1, 0, 0, 1, 0, 0)">
            <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
            <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970244 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
            <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
            <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7## 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
        </g>
    </svg>
);

export default function FreeLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user already exists in free_members
            const freeMemberRef = doc(db, 'free_members', user.uid);
            const freeMemberSnap = await getDoc(freeMemberRef);

            if (!freeMemberSnap.exists()) {
                // Create new free member document
                await setDoc(freeMemberRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: serverTimestamp(),
                    lastLoginAt: serverTimestamp(),
                });

                toast({
                    title: 'مرحباً بك في دانا أكاديمي! 🎉',
                    description: 'تم إنشاء حسابك المجاني بنجاح.',
                });
            } else {
                // Update last login
                await setDoc(freeMemberRef, {
                    lastLoginAt: serverTimestamp(),
                }, { merge: true });

                toast({
                    title: `أهلاً بعودتك ${user.displayName}! 👋`,
                    description: 'يتم توجيهك للمحتوى التعليمي.',
                });
            }

            router.push('/learn');

        } catch (error: any) {
            console.error('Google sign-in error:', error);
            let description = 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.';

            if (error.code === 'auth/popup-closed-by-user') {
                description = 'تم إغلاق نافذة تسجيل الدخول.';
            } else if (error.code === 'auth/cancelled-popup-request') {
                description = 'تم إلغاء طلب تسجيل الدخول.';
            }

            toast({
                variant: 'destructive',
                title: 'فشل تسجيل الدخول',
                description: description,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const features = [
        { icon: BookOpen, text: 'شرح تفاعلي للدروس', color: 'text-blue-400' },
        { icon: FlaskConical, text: 'محاكاة فيزيائية', color: 'text-purple-400' },
        { icon: Gamepad2, text: 'ألعاب تعليمية', color: 'text-green-400' },
    ];

    return (
        <MarketingLayout>
            <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    <Card className="bg-slate-900/80 backdrop-blur-xl border-white/10 shadow-2xl">
                        <CardHeader className="text-center pb-4">
                            <Link href="/" className="inline-block">
                                <Logo className="h-16 w-auto mx-auto mb-4" />
                            </Link>

                            {/* Badge */}
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white px-4 py-2 rounded-full border border-purple-500/30 mx-auto mb-4"
                            >
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-medium">تعلّم مجاناً بدون حدود</span>
                            </motion.div>

                            <CardTitle className="text-3xl font-bold text-white">
                                ابدأ رحلتك التعليمية
                            </CardTitle>
                            <CardDescription className="text-white/60 text-base mt-2">
                                سجّل بحساب قوقل للوصول للمحتوى التعليمي المجاني
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Features */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col items-center p-3 bg-white/5 rounded-xl border border-white/5"
                                    >
                                        <feature.icon className={`w-6 h-6 ${feature.color} mb-2`} />
                                        <span className="text-xs text-white/70 text-center">{feature.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Google Sign In Button */}
                            <Button
                                onClick={handleGoogleSignIn}
                                disabled={isLoading}
                                className="w-full h-14 bg-white hover:bg-gray-100 text-gray-800 font-medium text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        جاري التسجيل...
                                    </>
                                ) : (
                                    <>
                                        <GoogleIcon />
                                        <span>تسجيل الدخول بحساب Google</span>
                                    </>
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="text-white/40 text-sm">أو</span>
                                <div className="flex-1 h-px bg-white/10" />
                            </div>

                            {/* Student Login Link */}
                            <div className="text-center">
                                <span className="text-white/40 text-sm">
                                    طالب مسجل في الدورات؟{' '}
                                </span>
                                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium text-sm underline underline-offset-4">
                                    سجّل دخولك هنا
                                </Link>
                            </div>

                            {/* Back to Learn */}
                            <Link
                                href="/learn"
                                className="flex items-center justify-center gap-2 text-white/50 hover:text-white transition-colors text-sm pt-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>العودة للتعلم بدون تسجيل</span>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </MarketingLayout>
    );
}
