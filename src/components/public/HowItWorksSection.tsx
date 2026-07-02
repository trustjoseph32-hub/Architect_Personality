import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Container from '../ui/Container';

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll tracing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Soft damping spring to eliminate scrolling jitters
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4
  });

  // Background parallax transforms (Zen spheres drifting in parallel with scroll)
  const bgY1 = useTransform(smoothProgress, [0, 1], ["0%", "-25%"]);
  const bgY2 = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const bgScale1 = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const bgScale2 = useTransform(smoothProgress, [0, 1], [1, 0.8]);

  const steps = [
    {
      title: 'Первичный аудит',
      description: 'Заполнение расширенной интерактивной анкеты для точной фокусировки на вашем ключевом запросе, выявления скрытых барьеров и дефицитов в сферах тела, мышления и стиля.',
      detail: 'На основе ваших ответов формируется первичная гипотеза и готовится основа для личной сессии.'
    },
    {
      title: 'Установочная сессия',
      description: 'Глубокая индивидуальная встреча с Земфирой Хисамутдиновой. Анализ вашей точки А, распаковка внутренних ресурсов, выявление истинных целей и векторов проявления.',
      detail: 'Личный контакт позволяет сонастроить видение и наметить точную траекторию трансформации.'
    },
    {
      title: 'Архитектурная карта 360°',
      description: 'Проектирование индивидуальной стратегии развития по трем направлениям: внутренняя опора (личность), внешний образ (стиль) и масштаб реализации (бренд или бизнес).',
      detail: 'Вы получаете овеществленную дорожную карту, объединяющую состояние, проявление и дело.'
    },
    {
      title: 'Сопровождение и интеграция',
      description: 'Пошаговое внедрение карты изменений в вашу жизнь при поддержке экспертов среды под непрерывным личным менторством Земфиры Хисамутдиновой.',
      detail: 'Мы бережно ведем вас к результату за руку, трансформируя паттерны и стиль до полной реализации.'
    }
  ];

  // Map progress to active left-hand menu selection
  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((latest) => {
      const idx = Math.min(Math.floor(latest * steps.length), steps.length - 1);
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress, steps.length]);

  // Card deck stack transforms for desktop & mobile sticky-scroll
  // Card 0 (Base card)
  const card0Scale = useTransform(smoothProgress, [0.22, 0.35], [1, 0.94]);
  const card0Opacity = useTransform(smoothProgress, [0.22, 0.35], [1, 0.3]);
  const card0Y = useTransform(smoothProgress, [0.22, 0.35], [0, -16]);

  // Card 1
  const card1Y = useTransform(smoothProgress, [0.1, 0.32, 0.48, 0.62], ["100%", "0%", "0%", "-16px"]);
  const card1Scale = useTransform(smoothProgress, [0.1, 0.32, 0.48, 0.62], [0.94, 1, 1, 0.94]);
  const card1Opacity = useTransform(smoothProgress, [0.1, 0.22, 0.48, 0.62], [0, 1, 1, 0.3]);

  // Card 2
  const card2Y = useTransform(smoothProgress, [0.42, 0.65, 0.76, 0.88], ["100%", "0%", "0%", "-16px"]);
  const card2Scale = useTransform(smoothProgress, [0.42, 0.65, 0.76, 0.88], [0.94, 1, 1, 0.94]);
  const card2Opacity = useTransform(smoothProgress, [0.42, 0.52, 0.76, 0.88], [0, 1, 1, 0.3]);

  // Card 3
  const card3Y = useTransform(smoothProgress, [0.72, 0.95], ["100%", "0%"]);
  const card3Scale = useTransform(smoothProgress, [0.72, 0.95], [0.94, 1]);
  const card3Opacity = useTransform(smoothProgress, [0.72, 0.82], [0, 1]);

  const cardsTransform = [
    { y: card0Y, scale: card0Scale, opacity: card0Opacity },
    { y: card1Y, scale: card1Scale, opacity: card1Opacity },
    { y: card2Y, scale: card2Scale, opacity: card2Opacity },
    { y: card3Y, scale: card3Scale, opacity: card3Opacity }
  ];

  return (
    <div ref={containerRef} id="how-it-works" className="relative w-full h-[300vh] sm:h-[350vh]">
      {/* Sticky viewport content - locks on all devices to scroll cards */}
      <div className="w-full sticky top-0 h-screen flex items-center justify-center bg-[#FAF8F5] overflow-hidden py-8 sm:py-16 lg:py-0">
        
        {/* Aesthetic horizontal lines */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-stone-200/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-stone-200/50 to-transparent" />

        {/* Parallax Background Elements (controlled by smoothProgress) */}
        <motion.div 
          className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full bg-amber-100/20 blur-3xl pointer-events-none hidden lg:block"
          style={{ y: bgY1, scale: bgScale1 }}
        />
        <motion.div 
          className="absolute -left-32 bottom-1/4 w-[450px] h-[450px] rounded-full bg-stone-200/30 blur-3xl pointer-events-none hidden lg:block"
          style={{ y: bgY2, scale: bgScale2 }}
        />

        <Container className="w-full relative z-10 flex flex-col justify-center gap-6 sm:gap-10 xl:gap-12 h-full max-h-[90vh] py-4 sm:py-6 lg:py-0">
          
          {/* Section Header with balanced compact spacing */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-2 lg:space-y-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-amber-800 uppercase font-semibold">МЕТОДОЛОГИЯ</span>
            <h2 className="text-2xl sm:text-4xl xl:text-5xl font-medium text-slate-900 tracking-tight font-heading">
              Архитектура Сопровождения
            </h2>
            <div className="w-16 h-[1px] bg-amber-800/30 my-0.5" />
            <p className="text-stone-500 font-light text-xs sm:text-sm xl:text-base leading-relaxed max-w-2xl">
              Мы не предлагаем хаотичных лекций или изолированных советов. Наша совместная работа — это выверенный, индивидуальный путь из четырех ключевых этапов.
            </p>
          </div>

          {/* Fully Responsive Interactive Stacked Cards View */}
          <div className="relative h-[250px] xs:h-[280px] sm:h-[330px] xl:h-[370px] w-full max-w-lg lg:max-w-xl mx-auto my-3 sm:my-6 xl:my-8">
            {steps.map((step, idx) => {
              const tr = cardsTransform[idx];
              return (
                <motion.div
                  key={idx}
                  style={{
                    y: tr.y,
                    scale: tr.scale,
                    opacity: tr.opacity,
                    zIndex: 30 + idx,
                    transformOrigin: "bottom center"
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl border border-stone-200/50 p-5 sm:p-8 xl:p-10 shadow-[0_16px_40px_rgba(40,35,30,0.04)] flex flex-col justify-between relative overflow-hidden transition-all duration-300">
                    {/* Subtle elegant gradient line at the bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-amber-800/15 to-transparent" />
                    
                    <div className="space-y-2 sm:space-y-4 xl:space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[9px] sm:text-[10px] text-amber-800/60 uppercase tracking-widest">Этап {idx + 1} / {steps.length}</span>
                        {idx === activeIndex && (
                          <span className="flex h-1.5 w-1.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-800 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-800"></span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-base sm:text-xl xl:text-2xl font-semibold text-slate-900 tracking-tight leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-stone-600 font-light text-[11px] sm:text-sm xl:text-base leading-relaxed line-clamp-3 xs:line-clamp-none">
                        {step.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 sm:space-y-3">
                      <div className="h-[1px] w-full bg-stone-100" />
                      <p className="text-stone-400 text-[10px] sm:text-xs xl:text-sm font-light italic leading-relaxed line-clamp-1 xs:line-clamp-none">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </Container>
      </div>
    </div>
  );
}
