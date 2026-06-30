import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { PageSection } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';
import { ShieldCheck, Check } from 'lucide-react';

interface AboutSectionProps {
  section: PageSection;
  buttonStyle?: 'soft' | 'strict' | 'premium';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ section, buttonStyle = 'premium' }) => {
  const { navigate } = useRouter();

  if (!section || !section.is_active) return null;

  let extraData: any = {};
  try {
    if (section.data_json) {
      extraData = JSON.parse(section.data_json);
    }
  } catch (e) {
    console.error('Failed to parse About data_json', e);
  }

  const mission = extraData.mission || 'Раскрыть уникальный код личности каждого человека.';
  const values = extraData.values || [];

  const sectionImage = section.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800';

  return (
    <section className="py-24 sm:py-32 bg-[var(--bg-color)] border-y border-stone-200/40 relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Editorial Image block */}
          <div className="lg:col-span-5 relative h-[30rem] sm:h-[35rem] rounded-[100px] overflow-hidden shadow-xl bg-stone-200 border-4 border-white/40">
            <img
              src={sectionImage}
              alt="About Project Workspace"
              className="w-full h-full object-cover grayscale-[20%]"
              referrerPolicy="no-referrer"
            />
            {/* Mission absolute overlay bubble */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#1A1A1A]/95 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 text-stone-300">
              <span className="font-sans text-[9px] tracking-[0.25em] text-[var(--accent-color)] uppercase font-semibold block mb-2">
                МИССИЯ
              </span>
              <p className="text-sm font-light leading-relaxed text-stone-100 font-sans">
                {mission}
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <SectionTitle
              eyebrow={section.eyebrow || 'ИМИДЖЕВЫЙ ЛОНГРИД'}
              title={section.title}
              subtitle={section.subtitle}
              align="left"
              className="mb-0 sm:mb-0 md:mb-0"
            />

            <div className="text-stone-500 font-sans font-light text-sm sm:text-base leading-relaxed space-y-4">
              <p>{section.content}</p>
              {section.quote && (
                <p className="text-[var(--primary-color)] font-heading text-xl italic tracking-wide pl-4 border-l-2 border-[var(--accent-color)] font-light">
                  {section.quote}
                </p>
              )}
            </div>

            {/* Core Values list */}
            {values.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="font-sans text-[10px] tracking-widest text-[var(--primary-color)] uppercase font-semibold">
                  Наши ориентиры
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {values.map((v: string, i: number) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs text-stone-600 font-sans">
                      <Check className="w-4 h-4 text-[var(--accent-color)] mt-0.5 flex-shrink-0" />
                      <span className="font-light">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section.button_text && (
              <div className="pt-4">
                <Button
                  variant="outline"
                  buttonStyle={buttonStyle}
                  onClick={() => navigate(section.button_url || '/about')}
                  className="px-8 py-3.5 text-[11px] font-medium tracking-widest uppercase rounded-full"
                >
                  {section.button_text}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default AboutSection;
