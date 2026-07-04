import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { Founder } from '../../types.js';
import Container from '../ui/Container.js';
import Button from '../ui/Button.js';
import { Quote, ArrowRight } from 'lucide-react';

interface FounderSectionProps {
  founder: Founder | null;
  buttonStyle?: 'soft' | 'strict' | 'premium';
}

export const FounderSection: React.FC<FounderSectionProps> = ({ founder, buttonStyle = 'premium' }) => {
  const { navigate } = useRouter();

  if (!founder) return null;

  return (
    <section id="founder-section" className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-stone-200/40 relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-300/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative" id="founder-portrait-container">
            <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5] sm:h-[32rem] bg-stone-100 border border-stone-200/50">
              <img
                src={founder.photo_url || 'https://hhzxqrqfeudecnyujowb.supabase.co/storage/v1/object/public/AMIRA/Zemfira.jpg'}
                alt={founder.name}
                className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Elegant quotation overlay */}
            {founder.quote && (
              <div className="absolute -bottom-6 -right-2 left-6 bg-white/95 backdrop-blur-md shadow-lg p-5 rounded-[1.25rem] border border-stone-100 flex gap-4" id="founder-quote-overlay">
                <Quote className="w-6 h-6 text-amber-800 flex-shrink-0 opacity-40" />
                <p className="font-heading italic text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {founder.quote}
                </p>
              </div>
            )}
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 pt-6 lg:pt-0" id="founder-content-container">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-[0.25em] text-amber-800 uppercase font-bold block">
                Основатель проекта
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                {founder.name}
              </h2>
              <span className="font-mono text-xs tracking-wider text-stone-500 block">
                {founder.role}
              </span>
            </div>

            <div className="h-px bg-gradient-to-r from-stone-200 to-transparent w-32" />

            <p className="text-stone-600 font-light text-sm sm:text-base leading-relaxed">
              {founder.short_description}
            </p>

            <div className="text-stone-500 font-light text-xs sm:text-sm leading-relaxed max-w-xl">
              <p className="font-medium text-slate-800 mb-2">{founder.experience}</p>
              <p className="line-clamp-4">{founder.full_bio}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4" id="founder-cta-buttons">
              <Button
                variant="primary"
                buttonStyle={buttonStyle}
                className="px-6 py-3 text-[11px] font-semibold tracking-widest uppercase"
                onClick={() => navigate('/founder')}
              >
                Подробнее
              </Button>
              <Button
                variant="outline"
                buttonStyle={buttonStyle}
                className="px-6 py-3 text-[11px] font-semibold tracking-widest uppercase"
                onClick={() => {
                  const el = document.getElementById('lead-form');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#lead-form');
                  }
                }}
              >
                {founder.button_text || 'Записаться на сессию'} <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default FounderSection;
