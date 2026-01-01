
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/app-store';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Maximize, Minimize, Shield, X, Play, Pause,
  Volume2, VolumeX, SkipForward, SkipBack, Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';


// التاريخ والوقت بالعربي
const formatArabicDateTime = () => {
  const now = new Date();
  return now.toLocaleDateString('ar-JO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// تحويل الثواني لصيغة mm:ss
const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface WatermarkedVideoPlayerProps {
  src: string;
  lessonId?: string;
  courseId?: string;
  unitId?: string;
}

function WatermarkedVideoPlayer({ src, lessonId: propLessonId, courseId: propCourseId, unitId: propUnitId }: WatermarkedVideoPlayerProps) {
  const currentUser = useStore((s) => s.currentUser);
  const pathname = usePathname();

  // استخراج IDs من الـ URL تلقائياً إذا لم تُمرر كـ props
  const extractedIds = React.useMemo(() => {
    // مثال: /courses/physics-2008/physics-2008-first-semester/1-linear-momentum/1-lesson
    const parts = pathname.split('/').filter(Boolean);
    const coursesIndex = parts.indexOf('courses');

    if (coursesIndex === -1) return { courseId: '', unitId: '', lessonId: '' };

    const courseId = parts[coursesIndex + 1] || '';
    const semesterId = parts[coursesIndex + 2] || '';
    const unitId = parts[coursesIndex + 3] || '';
    const lessonId = parts.slice(coursesIndex + 1).join('/'); // المسار الكامل كـ ID

    return { courseId, unitId, lessonId };
  }, [pathname]);

  const lessonId = propLessonId || extractedIds.lessonId;
  const courseId = propCourseId || extractedIds.courseId;
  const unitId = propUnitId || extractedIds.unitId;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatArabicDateTime());
  const [protectionWarning, setProtectionWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // حالة الفيديو
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const controlsTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  // اكتشاف الموبايل
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // تحديث الوقت كل دقيقة
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatArabicDateTime());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // تحميل player.js وربط الـ iframe
  useEffect(() => {
    if (!src || !iframeRef.current) return;

    // تحميل player.js من Bunny CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.embed.ly/player-0.1.0.min.js';
    script.async = true;

    script.onload = () => {
      if ((window as any).playerjs && iframeRef.current) {
        const player = new (window as any).playerjs.Player(iframeRef.current);
        playerRef.current = player;

        player.on('ready', () => {
          setIsPlayerReady(true);

          // الحصول على مدة الفيديو
          player.getDuration((dur: number) => {
            setDuration(dur);
          });
        });

        player.on('play', () => setIsPlaying(true));
        player.on('pause', () => setIsPlaying(false));
        player.on('ended', () => setIsPlaying(false));

        player.on('timeupdate', (data: { seconds: number; duration: number }) => {
          setCurrentVideoTime(data.seconds);
          setProgress((data.seconds / data.duration) * 100);
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [src]);

  // تتبع وقت المشاهدة وإرسال التقدم كل 30 ثانية
  const watchedSecondsRef = useRef(0);
  const lastSaveTimeRef = useRef(0);
  const durationRef = useRef(duration);
  const currentVideoTimeRef = useRef(currentVideoTime);

  // تحديث الـ refs عند تغيير القيم
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    currentVideoTimeRef.current = currentVideoTime;
  }, [currentVideoTime]);

  useEffect(() => {
    // Debug: log current state (only on start/stop)
    console.log('🎬 Progress tracking effect:', {
      isPlaying,
      hasUser: !!currentUser,
      userId: currentUser?.uid?.substring(0, 8) + '...',
      lessonId: lessonId?.substring(0, 30) + '...',
      courseId
    });

    if (!isPlaying || !currentUser || !lessonId || !courseId) {
      console.log('⏭️ Skipping progress tracking:', {
        reason: !isPlaying ? 'not playing' : !currentUser ? 'no user' : !lessonId ? 'no lessonId' : 'no courseId'
      });
      return;
    }

    console.log('✅ Starting progress tracking interval (saves every 30s)');

    const interval = setInterval(() => {
      watchedSecondsRef.current += 1;

      // إرسال التقدم كل 30 ثانية
      if (watchedSecondsRef.current - lastSaveTimeRef.current >= 30) {
        lastSaveTimeRef.current = watchedSecondsRef.current;

        const progressData = {
          studentId: currentUser.uid,
          lessonId,
          courseId,
          watchedSeconds: watchedSecondsRef.current,
          totalSeconds: durationRef.current,
          currentPosition: currentVideoTimeRef.current,
          unitId
        };

        console.log('📊 Saving progress:', progressData);

        // استخدام API بدلاً من server action
        fetch('/api/progress/video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(progressData)
        })
          .then(res => res.json())
          .then(result => console.log('✅ Progress saved:', result))
          .catch(err => console.error('❌ Progress save error:', err));
      }
    }, 1000);

    return () => {
      console.log('🛑 Stopping progress tracking interval');
      clearInterval(interval);
    };
  }, [isPlaying, currentUser, lessonId, courseId, unitId]); // Removed duration and currentVideoTime


  // إرسال التقدم عند مغادرة الصفحة
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentUser && lessonId && courseId && watchedSecondsRef.current > 0) {
        // استخدام sendBeacon لضمان الإرسال
        const data = JSON.stringify({
          studentId: currentUser.uid,
          lessonId,
          courseId,
          watchedSeconds: watchedSecondsRef.current,
          totalSeconds: duration,
          currentPosition: currentVideoTime,
          unitId,
        });
        navigator.sendBeacon('/api/progress/video', data);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentUser, lessonId, courseId, duration, currentVideoTime, unitId]);

  // التحكم بالتشغيل
  const handlePlayPause = useCallback(() => {
    if (!playerRef.current || !isPlayerReady) return;

    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  }, [isPlaying, isPlayerReady]);

  // التحكم بالصوت
  const handleMuteToggle = useCallback(() => {
    if (!playerRef.current || !isPlayerReady) return;

    if (isMuted) {
      playerRef.current.unmute();
      playerRef.current.setVolume(volume / 100);
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  }, [isMuted, volume, isPlayerReady]);

  // تغيير الصوت
  const handleVolumeChange = useCallback((value: number[]) => {
    if (!playerRef.current || !isPlayerReady) return;

    const newVolume = value[0];
    setVolume(newVolume);

    // نلغي الكتم أولاً إذا كان الصوت > 0
    if (newVolume > 0 && isMuted) {
      playerRef.current.unmute();
      setIsMuted(false);
    }

    // Bunny player.js - نجرب القيمة كما هي (0-100)
    // بعض الـ players تتوقع 0-100 والبعض 0-1
    try {
      playerRef.current.setVolume(newVolume); // جرب 0-100 أولاً
    } catch (e) {
      playerRef.current.setVolume(newVolume / 100); // fallback: 0-1
    }

    if (newVolume === 0) {
      setIsMuted(true);
      playerRef.current.mute();
    }
  }, [isMuted, isPlayerReady]);

  // تغيير موضع الفيديو
  const handleSeek = useCallback((value: number[]) => {
    if (!playerRef.current || !isPlayerReady || !duration) return;

    const newTime = (value[0] / 100) * duration;
    playerRef.current.setCurrentTime(newTime);
  }, [duration, isPlayerReady]);

  // تقديم/تأخير 10 ثواني
  const handleSkip = useCallback((seconds: number) => {
    if (!playerRef.current || !isPlayerReady) return;

    const newTime = Math.max(0, Math.min(duration, currentVideoTime + seconds));
    playerRef.current.setCurrentTime(newTime);
  }, [currentVideoTime, duration, isPlayerReady]);

  // إخفاء/إظهار controls
  useEffect(() => {
    const resetControlsTimer = () => {
      setShowControls(true);
      if (controlsTimer.current) clearTimeout(controlsTimer.current);

      if (isPlaying) {
        controlsTimer.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetControlsTimer);
      container.addEventListener('touchstart', resetControlsTimer);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', resetControlsTimer);
        container.removeEventListener('touchstart', resetControlsTimer);
      }
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
    };
  }, [isPlaying]);

  // عند تفعيل fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';

      if (isMobile && screen.orientation && 'lock' in screen.orientation) {
        (screen.orientation as any).lock('landscape').catch(() => { });
      }
    } else {
      document.body.style.overflow = '';

      if (screen.orientation && 'unlock' in screen.orientation) {
        (screen.orientation as any).unlock();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen, isMobile]);

  // منع Right-Click
  const handleContextMenu = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProtectionWarning(true);
    setTimeout(() => setProtectionWarning(false), 2000);
    return false;
  }, []);

  // منع مفاتيح DevTools + تحكم بالفيديو
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // مفاتيح التحكم بالفيديو
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        handlePlayPause();
        return;
      }
      if (e.key === 'm') {
        e.preventDefault();
        handleMuteToggle();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSkip(-10);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSkip(10);
        return;
      }
      if (e.key === 'f') {
        e.preventDefault();
        setIsFullscreen(prev => !prev);
        return;
      }
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        return;
      }

      // منع DevTools
      const blockedKeys = [
        { key: 'F12', ctrl: false, shift: false },
        { key: 'I', ctrl: true, shift: true },
        { key: 'J', ctrl: true, shift: true },
        { key: 'C', ctrl: true, shift: true },
        { key: 'U', ctrl: true, shift: false },
        { key: 'S', ctrl: true, shift: false },
      ];

      for (const blocked of blockedKeys) {
        const keyMatch = e.key.toUpperCase() === blocked.key.toUpperCase();
        const ctrlMatch = blocked.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const shiftMatch = blocked.shift ? e.shiftKey : !e.shiftKey;

        if (keyMatch && ctrlMatch && shiftMatch) {
          e.preventDefault();
          e.stopPropagation();
          setProtectionWarning(true);
          setTimeout(() => setProtectionWarning(false), 2000);
          return false;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [isFullscreen, handlePlayPause, handleMuteToggle, handleSkip]);

  // منع Drag
  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    return false;
  }, []);

  // Double tap/click للتشغيل
  const handlePlayerClick = useCallback(() => {
    handlePlayPause();
  }, [handlePlayPause]);

  // تبديل fullscreen - يحاول الـ API الحقيقي أولاً
  const handleFullscreenToggle = useCallback(async () => {
    if (!containerRef.current) return;

    // إذا حالياً في fullscreen، نخرج
    if (isFullscreen) {
      // نجرب نخرج من fullscreen الحقيقي أولاً
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch (e) {
          console.log('Exit fullscreen failed:', e);
        }
      }
      setIsFullscreen(false);
      return;
    }

    // نحاول ندخل fullscreen حقيقي
    try {
      const el = containerRef.current;
      if (el.requestFullscreen) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } else if ((el as any).webkitRequestFullscreen) {
        await (el as any).webkitRequestFullscreen();
        setIsFullscreen(true);
      } else if ((el as any).mozRequestFullScreen) {
        await (el as any).mozRequestFullScreen();
        setIsFullscreen(true);
      } else {
        // fallback: CSS fullscreen
        setIsFullscreen(true);
      }
    } catch (err) {
      console.log('Fullscreen API failed, using CSS fallback');
      // fallback: CSS fullscreen
      setIsFullscreen(true);
    }
  }, [isFullscreen]);

  // مراقبة خروج المستخدم من fullscreen بـ ESC
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  if (!src) {
    return (
      <Card className="aspect-video w-full flex items-center justify-center bg-muted">
        <CardContent className="text-center p-4">
          <p className="text-muted-foreground">سيتم إضافة الفيديو قريبًا.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full rounded-lg overflow-hidden shadow-lg bg-black group select-none",
        isFullscreen && "fixed inset-0 z-[9999] !rounded-none !w-screen !h-screen"
      )}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      style={{
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitTouchCallout: 'none',
        aspectRatio: isFullscreen ? undefined : '16/9',
      }}
    >
      {/* iframe الفيديو - مع معاملات لإخفاء controls الأصلية */}
      <iframe
        ref={iframeRef}
        src={`${src}${src.includes('?') ? '&' : '?'}controls=false&autoplay=false`}
        className="absolute top-0 left-0 w-full h-full border-0"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; fullscreen"
        allowFullScreen={false}
        style={{
          pointerEvents: 'none', // نمنع التفاعل المباشر
          position: 'absolute',
          zIndex: 1,
        }}
      />

      {/* طبقة الحماية + النقر للتشغيل */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          zIndex: 10,
          background: 'transparent',
          cursor: 'pointer'
        }}
        onClick={handlePlayerClick}
        onContextMenu={handleContextMenu}
      >
        {/* زر التشغيل الكبير - يظهر عند الإيقاف */}
        {!isPlaying && isPlayerReady && (
          <div className="bg-black/50 hover:bg-black/70 transition-colors rounded-full p-4 sm:p-6">
            <Play className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-white" />
          </div>
        )}

        {/* Loading */}
        {!isPlayerReady && (
          <div className="bg-black/50 rounded-full p-4">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Watermarks */}
      {currentUser && (
        <>
          {/* Watermark مركزية */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none animate-float"
            style={{ zIndex: 15 }}
          >
            <div className="text-center select-none" style={{ opacity: 0.07 }}>
              <span className="text-white font-bold block"
                style={{ fontSize: isFullscreen ? 'clamp(1.5rem, 5vw, 3rem)' : 'clamp(1rem, 4vw, 2rem)' }}>
                {currentUser.username}
              </span>
              <span className="text-white block mt-1"
                style={{ fontSize: isFullscreen ? 'clamp(0.6rem, 2vw, 1rem)' : 'clamp(0.5rem, 1.5vw, 0.8rem)' }}>
                {currentTime}
              </span>
            </div>
          </div>

          {/* Watermark زاوية */}
          <div className={cn("absolute pointer-events-none select-none", isFullscreen ? "top-4 left-4" : "top-2 left-2")}
            style={{ zIndex: 15 }}>
            <span className="text-white font-medium px-2 py-1 rounded"
              style={{ opacity: 0.4, backgroundColor: 'rgba(0,0,0,0.3)', fontSize: isFullscreen ? '0.8rem' : '0.65rem' }}>
              {currentUser.username}
            </span>
          </div>
        </>
      )}

      {/* شريط التحكم السفلي */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        )}
        style={{ zIndex: 20, padding: isFullscreen ? '20px' : '12px' }}
      >
        {/* شريط التقدم */}
        <div className="px-2 mb-2">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
        </div>

        {/* أزرار التحكم */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* تشغيل/إيقاف */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className={cn("text-white hover:bg-white/20", isFullscreen ? "w-12 h-12" : "w-9 h-9")}
            >
              {isPlaying
                ? <Pause className={isFullscreen ? "w-6 h-6" : "w-5 h-5"} />
                : <Play className={cn(isFullscreen ? "w-6 h-6" : "w-5 h-5", "fill-white")} />
              }
            </Button>

            {/* تأخير 10 ثواني */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSkip(-10)}
              className={cn("text-white hover:bg-white/20 hidden sm:flex", isFullscreen ? "w-10 h-10" : "w-8 h-8")}
            >
              <SkipBack className={isFullscreen ? "w-5 h-5" : "w-4 h-4"} />
            </Button>

            {/* تقديم 10 ثواني */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSkip(10)}
              className={cn("text-white hover:bg-white/20 hidden sm:flex", isFullscreen ? "w-10 h-10" : "w-8 h-8")}
            >
              <SkipForward className={isFullscreen ? "w-5 h-5" : "w-4 h-4"} />
            </Button>

            {/* الصوت */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMuteToggle}
                className={cn("text-white hover:bg-white/20", isFullscreen ? "w-10 h-10" : "w-8 h-8")}
              >
                {isMuted || volume === 0
                  ? <VolumeX className={isFullscreen ? "w-5 h-5" : "w-4 h-4"} />
                  : <Volume2 className={isFullscreen ? "w-5 h-5" : "w-4 h-4"} />
                }
              </Button>
              <div className="w-16 sm:w-20 hidden sm:block" dir="ltr">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* الوقت */}
            <span className={cn("text-white/80 text-xs sm:text-sm font-mono", isFullscreen && "text-sm sm:text-base")}>
              {formatTime(currentVideoTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* شارة الحماية */}
            <div className="flex items-center gap-1 text-white/60 text-xs px-2 py-1">
              <Shield className="w-3 h-3" />
              <span className="hidden sm:inline">محمي</span>
            </div>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreenToggle}
              className={cn("text-white hover:bg-white/20", isFullscreen ? "w-12 h-12" : "w-9 h-9")}
            >
              {isFullscreen
                ? <Minimize className={isFullscreen ? "w-6 h-6" : "w-5 h-5"} />
                : <Maximize className={isFullscreen ? "w-6 h-6" : "w-5 h-5"} />
              }
            </Button>
          </div>
        </div>
      </div>

      {/* زر الخروج الكبير في fullscreen */}
      {isFullscreen && showControls && (
        <div className="absolute top-4 left-4" style={{ zIndex: 25 }}>
          <Button
            onClick={() => setIsFullscreen(false)}
            variant="secondary"
            className="bg-black/70 hover:bg-black/90 text-white border-0 shadow-lg px-4 py-2"
          >
            <X className="w-5 h-5 me-2" />
            خروج
          </Button>
        </div>
      )}

      {/* تحذير الحماية */}
      {protectionWarning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 100 }}>
          <div className="bg-red-600/95 text-white rounded-xl flex items-center gap-3 shadow-2xl animate-pulse px-6 py-3">
            <Shield className="w-5 h-5" />
            <span className="font-bold">المحتوى محمي</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatermarkedVideoPlayer;
