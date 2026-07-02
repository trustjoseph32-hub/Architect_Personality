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

  const bgImage = section.image_url || 'https://hhzxqrqfeudecnyujowb.supabase.co/storage/v1/object/public/AMIRA/Zemfira.jpg';
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
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[580px] w-full">
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
            <div className="relative mt-8 sm:mt-0 sm:absolute sm:top-16 sm:-right-4 w-full max-w-[280px] sm:w-[260px] p-6 sm:p-8 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(40,35,30,0.06)] z-10 flex flex-col gap-3 border border-white/50">
              <span className="font-heading text-3xl italic text-[var(--accent-color)] leading-[0.1]">«</span>
              <p className="font-heading text-sm sm:text-lg leading-snug font-light italic text-[var(--primary-color)]">
                {section.quote || 'Внешний вид — это самое быстрое послание, которое вы отправляете миру. Пусть оно будет правдивым.'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[var(--primary-color)]"></div>
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-widest text-stone-600 font-medium">
                  Земфира Хисамутдинова
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default HeroSection;
