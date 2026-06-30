import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { PageSection } from '../../types.js';
import Container from '../ui/Container.js';
import Button from '../ui/Button.js';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  section: PageSection;
  buttonStyle?: 'soft' | 'strict' | 'premium';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ section, buttonStyle = 'premium' }) => {
  const { navigate } = useRouter();

  if (!section || !section.is_active) return null;

  // Safe parse data_json
  let extraData: any = {};
  try {
    if (section.data_json) {
      extraData = JSON.parse(section.data_json);
    }
  } catch (e) {
    console.error('Failed to parse Hero data_json', e);
  }

  const bgImage = section.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600';
  const additionalImage = extraData.additional_image_url || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800';

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[var(--bg-color)] pt-12 pb-24 overflow-hidden border-b border-stone-200/40">
      {/* Decorative grain/overlay effect */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')] z-0"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content Area */}
          <div className="lg:col-span-6 space-y-8 max-w-2xl">
            {section.eyebrow && (
              <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-[var(--accent-color)] font-semibold block animate-pulse">
                {section.eyebrow}
              </span>
            )}
            
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-light text-[var(--primary-color)] tracking-tight leading-[1.0] font-heading">
              Проект <span className="italic font-light text-[var(--accent-color)]">Я</span><br/>
              Архитектор<br/>Личности
            </h1>

            {section.subtitle && (
              <p className="text-sm sm:text-base text-stone-600 font-sans font-light leading-relaxed max-w-md">
                {section.subtitle}
              </p>
            )}

            {section.content && (
              <p className="text-xs sm:text-sm text-stone-500 font-sans font-light leading-relaxed max-w-md">
                {section.content}
              </p>
            )}

            {/* CTA Actions */}
            <div className="flex items-center gap-8 pt-4">
              {section.button_text && (
                <Button
                  variant="primary"
                  buttonStyle={buttonStyle}
                  onClick={() => navigate(section.button_url || '#lead-form')}
                  className="px-10 py-5 text-[11px] font-medium tracking-widest uppercase rounded-full"
                >
                  {section.button_text}
                </Button>
              )}
              {extraData.secondary_button_text && (
                <a
                  href={extraData.secondary_button_url || '#philosophy'}
                  className="font-sans text-[11px] uppercase tracking-widest border-b border-[var(--primary-color)] pb-1 font-medium text-[var(--primary-color)] hover:opacity-85 transition-opacity"
                >
                  {extraData.secondary_button_text}
                </a>
              )}
            </div>
          </div>

          {/* Graphics/Image Area */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[580px] w-full">
            {/* Large Main Image Container resembling the sand-oval portrait */}
            <div className="w-[280px] h-[380px] sm:w-[360px] sm:h-[500px] bg-[#EBE7E0] rounded-[140px] sm:rounded-[200px] overflow-hidden shadow-2xl relative z-0 border-[8px] border-white/30 transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={bgImage}
                alt={section.title}
                className="w-full h-full object-cover grayscale-[15%] transition-transform duration-700 hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent-color)]/20"></div>
              {/* Decorative Element */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[var(--primary-color)]/20"></div>
            </div>

            {/* Floating Secondary Detail */}
            <div className="absolute top-4 -right-2 sm:top-16 sm:-right-4 w-[200px] sm:w-[240px] p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl z-10 flex flex-col gap-3 border border-stone-200/30">
              <span className="font-heading text-3xl italic text-[var(--accent-color)] leading-[0.1]">«</span>
              <p className="font-heading text-sm sm:text-lg leading-snug font-light italic text-[var(--primary-color)]">
                {section.quote || 'Индивидуальность становится не случайностью, а системой.'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[var(--primary-color)]"></div>
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-widest text-stone-600 font-medium">
                  Земфира Хисамутдинова
                </span>
              </div>
            </div>

            {/* Statistics / Philosophy Micro-Labels */}
            <div className="absolute bottom-4 -left-4 sm:bottom-12 sm:-left-12 flex flex-col gap-5 z-10 bg-[var(--bg-color)]/80 backdrop-blur-sm p-4 rounded-xl border border-stone-200/20 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:p-0">
              <div className="flex items-center gap-3">
                <span className="font-heading text-3xl sm:text-4xl text-[var(--primary-color)] font-light">01</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-[var(--primary-color)]">Аутентичность</span>
                  <span className="font-sans text-[7px] sm:text-[8px] text-[var(--accent-color)] uppercase tracking-widest">Внутренняя правда</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-heading text-3xl sm:text-4xl text-[var(--primary-color)] font-light">02</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-[var(--primary-color)]">Реализация</span>
                  <span className="font-sans text-[7px] sm:text-[8px] text-[var(--accent-color)] uppercase tracking-widest">Через природу</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default HeroSection;
