'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Rocket, Phone, FlaskConical, Gamepad2, BookOpen, Sparkles, Zap, GraduationCap, Star, Users, Trophy, ChevronDown, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FlippableCard } from '@/components/flippable-card';
import { ImageSwiper } from '@/components/image-swiper';
import { AchievementCard } from '@/components/achievement-card';
import { TestimonialsMap } from '@/components/testimonials-map';
import { CourseCard } from '@/components/course-card';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Data
const memorableMoments = [
  { src: 'https://i.ibb.co/pvCjpbbV/Untitled-design-7.png' },
  { src: 'https://i.ibb.co/PGBMrzDc/Untitled-design-10.png' },
  { src: 'https://i.ibb.co/ycJdhpcX/Untitled-design-11.png' },
  { src: 'https://i.ibb.co/0yKRLnSZ/Untitled-design-12.png' },
  { src: 'https://i.ibb.co/pj5LgGpY/Untitled-design-13.png' },
];

const studentAchievements = [
  { name: 'أحمد الحوراني', year: '2007', physicsScore: '192/200', average: '95.90', imageUrl: 'https://i.ibb.co/DDw977GL/Untitled-design-2.jpg', imageHint: 'student portrait' },
  { name: 'هاشم لافي', year: '2007', physicsScore: '196/200', average: '98.05', imageUrl: 'https://i.ibb.co/MxRFns1r/photo-2025-08-11-16-50-40.jpg', imageHint: 'student smiling' },
  { name: 'منى ابو نوير', year: '2007', physicsScore: '196/200', average: '97.25', imageUrl: 'https://i.ibb.co/svSrQPXD/Untitled-design-16.png', imageHint: 'graduate student' },
  { name: 'روان عكور', year: '2007', physicsScore: '192/200', average: '98.15', imageUrl: 'https://i.ibb.co/9kvYH9xP/Untitled-design-17.png', imageHint: 'female student' },
  { name: 'ندى عريقات', year: '2007', physicsScore: '192/200', average: '97.6', imageUrl: 'https://i.ibb.co/fYnrTLVs/Untitled-design-18.png', imageHint: 'male student' },
  { name: 'جود الصفدي', year: '2007', physicsScore: '200/200', average: '99.75', imageUrl: 'https://i.ibb.co/pr6pvCpy/Untitled-design-20.png', imageHint: 'happy student' },
];

const testimonials = [
  { id: 1, image: "https://i.ibb.co/7J6F87zM/image.png", reviewScreenshot: "https://i.ibb.co/2QqmbJP/image.png", position: { top: '10%', left: '15%' } },
  { id: 2, image: "https://i.ibb.co/DHWmf5vN/10.png", reviewScreenshot: "https://i.ibb.co/B26nXwxS/1.png", position: { top: '30%', left: '30%' } },
  { id: 3, image: "https://i.ibb.co/fGXQFykf/2.png", reviewScreenshot: "https://i.ibb.co/bjkbrnLb/image.png", position: { top: '50%', left: '10%' } },
  { id: 4, image: "https://i.ibb.co/PZWjb1QC/image.png", reviewScreenshot: "https://i.ibb.co/JL4vfhp/3.png", position: { top: '70%', left: '25%' } },
  { id: 5, image: "https://i.ibb.co/7t0BhthL/5.png", reviewScreenshot: "https://i.ibb.co/6c5NbCF8/image.png", position: { top: '15%', left: '80%' } },
  { id: 6, image: "https://i.ibb.co/WN2nc6LQ/cropped-circle-image-11.png", reviewScreenshot: "https://i.ibb.co/5gfBYpy6/Untitled-design-30.png", position: { top: '45%', left: '90%' } },
  { id: 7, image: "https://i.ibb.co/ZztB0w2m/cropped-circle-image-12.png", reviewScreenshot: "https://i.ibb.co/3YPMPKBY/Untitled-design-4.jpg", position: { top: '85%', left: '85%' } },
  { id: 8, image: "https://i.ibb.co/0pV97dn1/cropped-circle-image-14.png", reviewScreenshot: "https://i.ibb.co/QFTWKnPw/Untitled-design-32.png", position: { top: '65%', left: '70%' } },
];

const courses = [
  {
    id: 'tawjihi-2007-supplementary',
    title: 'فيزياء التكميلي - جيل 2007',
    description: 'حصص مسجله لمادة الفيزياء التوجيهي كاملا للفصل الاول والثاني',
    price: '50.00 د.أ',
    imageUrl: 'https://i.ibb.co/j9H1P345/3.png',
    imageHint: 'physics textbook',
    curriculum: 'الأردن',
    link: '/courses/physics-supplementary-2007',
    detailsLink: '/courses/physics-supplementary-2007-details',
  },
  {
    id: 'tawjihi-2008-first-semester',
    title: 'فيزياء توجيهي 2008 - فصل أول',
    description: 'دورة شاملة تغطي مادة الفصل الأول لجيل 2008',
    price: '50.00 د.أ',
    imageUrl: 'https://i.ibb.co/Tx4wY4wS/2.png',
    imageHint: 'physics textbook 2008',
    curriculum: 'الأردن',
    link: '/courses/physics-2008/physics-2008-first-semester',
    detailsLink: '/courses/physics-2008-first-semester-details',
  },
  {
    id: 'tawjihi-2008-foundation',
    title: 'دورة التأسيس توجيهي 2008',
    description: 'دورة تأسيسية شاملة للاستعداد الأمثل',
    price: 'مجاناً',
    imageUrl: 'https://i.ibb.co/3m20cYgV/1.png',
    imageHint: 'physics foundation',
    curriculum: 'الأردن',
    link: '/courses/physics-2008-foundation',
    detailsLink: '/courses/physics-2008-foundation-details',
  },
  {
    id: 'tawjihi-2008-palestine',
    title: 'فيزياء التوجيهي - فلسطين 2008',
    description: 'فصل أول - منهاج فلسطين',
    price: '50.00 د.أ',
    imageUrl: 'https://i.ibb.co/JFSf9rDb/4.png',
    imageHint: 'physics textbook palestine',
    curriculum: 'فلسطين',
    detailsLink: '/courses/physics-2008-palestine/details',
  },
  {
    id: 'astrophysics',
    title: 'فيزياء الثاني عشر - قطر',
    description: 'مسار علمي وتكنولوجي',
    price: 'قريباً',
    imageUrl: 'https://i.ibb.co/TxtLBJzC/5.png',
    imageHint: 'qatar physics',
    curriculum: 'قطر',
    detailsLink: '/courses/astrophysics/details',
  },
  {
    id: 'physics-101',
    title: 'فيزياء الجامعة 101',
    description: 'مبادئ الفيزياء العامة',
    price: 'قريباً',
    imageUrl: 'https://i.ibb.co/MDhZYQcz/6.png',
    imageHint: 'university physics',
    curriculum: 'جامعات',
    detailsLink: '/courses/physics-101/details',
  },
];

// ============= COMPONENTS =============

// Animated Counter
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Floating Orbs Background
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-[150px]"
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-[120px]"
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-[100px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// Premium Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950/30">
      <FloatingOrbs />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Text */}
          <motion.div
            className="space-y-8 text-center lg:text-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl px-5 py-2.5 rounded-full border border-purple-500/30"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
              <span className="text-purple-200 text-sm font-medium">منصة تعليمية متطورة</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-white">مرحباً بك في</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">
                دانا أكاديمي
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl sm:text-2xl text-white/60 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              حين تتحول دراسة الفيزياء إلى رحلة من{' '}
              <span className="text-purple-400 font-semibold">الفنّ</span> و{' '}
              <span className="text-pink-400 font-semibold">الإبداع</span>
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-lg text-white/40 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              نؤمن أن الفيزياء ليست معادلات جامدة، بل لغة الكون التي تروي أروع القصص
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="#courses-section">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                    ابدأ رحلتك الآن
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>

              <Link href="/simulations">
                <motion.button
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold text-lg flex items-center gap-2 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FlaskConical className="w-5 h-5" />
                  جرب المحاكيات
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: 500, suffix: '+', label: 'طالب متفوق', icon: Users },
                { value: 98, suffix: '%', label: 'نسبة النجاح', icon: Trophy },
                { value: 5, suffix: '', label: 'محاكاة تفاعلية', icon: FlaskConical },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-purple-400" />
                    <span className="text-3xl font-bold text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  <span className="text-white/50 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Glowing ring */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border-2 border-purple-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[450px] h-[450px] rounded-full border border-pink-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* Main Image */}
            <motion.div
              className="relative w-80 h-80 lg:w-96 lg:h-96"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-3xl blur-2xl" />
              <Image
                src="https://i.ibb.co/SXn1vhJP/NEW-NEW.png"
                alt="Dana Academy"
                width={400}
                height={400}
                className="relative rounded-3xl object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/40" />
        </motion.div>
      </div>
    </section>
  );
}

// Interactive Tools Section
function InteractiveToolsSection() {
  const tools = [
    {
      id: 'simulations',
      title: 'المختبر الافتراضي',
      description: '5 محاكاة تفاعلية فاخرة للفيزياء',
      icon: FlaskConical,
      gradient: 'from-purple-500 via-pink-500 to-purple-600',
      link: '/simulations',
      features: ['التصادمات', 'الدفع', 'العزم', 'التوازن', 'الطاقة'],
      badge: '5 محاكاة',
      available: true,
    },
    {
      id: 'learn',
      title: 'تعلّم مجاناً',
      description: 'دروس تفاعلية بالعربي لعدة مناهج',
      icon: GraduationCap,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      link: '/learn',
      features: ['4 دول', 'مناهج متعددة', 'شروحات مفصلة'],
      badge: 'مجاني',
      available: true,
    },
    {
      id: 'games',
      title: 'الألعاب التعليمية',
      description: 'تعلم الفيزياء وأنت تلعب',
      icon: Gamepad2,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      link: '/games',
      features: ['اختبارات', 'تحديات', 'مكافآت'],
      badge: 'قريباً',
      available: false,
    },
    {
      id: 'books',
      title: 'المكتبة الإلكترونية',
      description: 'مراجع ومصادر تعليمية شاملة',
      icon: BookOpen,
      gradient: 'from-blue-500 via-indigo-500 to-violet-500',
      link: '/books',
      features: ['كتب', 'ملخصات', 'أسئلة سنوات'],
      badge: 'قريباً',
      available: false,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <FloatingOrbs />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-white/10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white/80 text-sm font-medium">أدوات تفاعلية متطورة</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            استكشف{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              عالم الفيزياء
            </span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            أدوات مبتكرة تجعل تعلم الفيزياء تجربة ممتعة ولا تُنسى
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={tool.available ? tool.link : '#'} className={!tool.available ? 'cursor-not-allowed' : ''}>
                <motion.div
                  className={`relative group h-full ${!tool.available ? 'opacity-60' : ''}`}
                  whileHover={tool.available ? { y: -8, scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Glow */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${tool.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500`}
                  />

                  {/* Card */}
                  <div className="relative h-full bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 overflow-hidden">
                    {/* Badge */}
                    <div className={`absolute top-4 left-4 text-xs px-3 py-1.5 rounded-full font-bold ${!tool.available ? 'bg-gray-500/30 text-gray-400' : `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`}`}>
                      {tool.badge}
                    </div>

                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mt-12 mb-5 shadow-xl`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <tool.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                    <p className="text-white/50 text-sm mb-4">{tool.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    {tool.available && (
                      <motion.div
                        className="absolute bottom-5 left-5 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/15 transition-colors"
                        animate={{ x: [0, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowLeft className="w-5 h-5 text-white/60" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Premium Courses Section
function CoursesSection() {
  return (
    <section id="courses-section" className="relative py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Star className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-medium">دورات احترافية</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            الدورات المتاحة
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            انضم إلى دوراتنا المصممة بعناية لمساعدتك على إتقان الفيزياء
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="w-full max-w-sm"
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Dana Section
function WhyDanaSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            لماذا دانا أكاديمي؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نقدم الفيزياء بأسلوب مبتكر يجمع بين البساطة والتكنولوجيا والإبداع
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FlippableCard
              cardId="everyday"
              frontContent={{
                title: "شرح مبسط مرتبط بالحياة اليومية",
                imageUrl: "https://i.ibb.co/gFFDYFbj/ICON3.png",
                imageHint: "atom"
              }}
              backContent={{
                description: "نفكك المفاهيم الصعبة ونربطها بمواقف وأمثلة من واقعك، لتشعر أن الفيزياء جزء من حياتك."
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FlippableCard
              cardId="simulation"
              frontContent={{
                title: "تعليم تفاعلي باستخدام برامج المحاكاة",
                imageUrl: "https://i.ibb.co/FLscDsbC/ICON1.png",
                imageHint: "simulation"
              }}
              backContent={{
                description: "نحوّل القوانين والتجارب إلى نماذج حيّة عبر برامج محاكاة متطورة."
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FlippableCard
              cardId="ai"
              frontContent={{
                title: "اختبارات ذكية مدعومة بالذكاء الاصطناعي",
                imageUrl: "https://i.ibb.co/39xKXsSR/ICON2.png",
                imageHint: "robot brain"
              }}
              backContent={{
                description: "اختبارات تغطي المنهج كاملًا مع ملاحظات فورية وخطط تعلم شخصية."
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            آراء طلابنا
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            شهادات طلابنا هي مصدر فخرنا وأكبر دليل على نجاحنا
          </p>
          <p className="text-muted-foreground italic mt-2">
            انقر على صورة أي طالب لعرض رأيه
          </p>
        </motion.div>
        <TestimonialsMap testimonials={testimonials} />
      </div>
    </section>
  );
}

// Achievements Section
function AchievementsSection() {
  return (
    <section className="relative py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            إنجازات طلابنا
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نفخر بطلابنا ونتائجهم المتميزة
          </p>
        </motion.div>
        <div className="grid gap-x-8 gap-y-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {studentAchievements.map((student, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AchievementCard student={student} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function GallerySection() {
  return (
    <section className="relative py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            ألبوم الصور
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            لقطات من ورشات العمل والفعاليات
          </p>
        </motion.div>
        <ImageSwiper images={memorableMoments} />
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact-us" className="relative py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Phone className="w-10 h-10 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black text-primary">
              للتسجيل
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            تواصل معنا مباشرة عبر واتساب
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a href="https://wa.me/962777530582" target="_blank" rel="noopener noreferrer" className="flex-1">
            <motion.button
              className="w-full text-lg py-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
              962777530582+
            </motion.button>
          </a>
          <a href="https://wa.me/962797445450" target="_blank" rel="noopener noreferrer" className="flex-1">
            <motion.button
              className="w-full text-lg py-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
              962797445450+
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============= MAIN PAGE =============
export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        <HeroSection />
        <InteractiveToolsSection />
        <CoursesSection />
        <WhyDanaSection />
        <TestimonialsSection />
        <AchievementsSection />
        <GallerySection />
        <ContactSection />
      </div>
    </MarketingLayout>
  );
}
