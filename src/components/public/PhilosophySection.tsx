import React from 'react';
import { PageSection } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Card from '../ui/Card.js';

interface PhilosophySectionProps {
  section: PageSection;
  buttonStyle?: 'soft' | 'strict' | 'premium';
}

interface Principle {
  title: string;
  description: string;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ section, buttonStyle = 'premium' }) => {
  if (!section || !section.is_active) return null;

  let principles: Principle[] = [];
  try {
    if (section.data_json) {
      principles = JSON.parse(section.data_json);
    }
  } catch (e) {
    console.error('Failed to parse Philosophy principles JSON', e);
  }

  const sectionImage = section.image_url || 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800';

  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-[var(--bg-color)] border-b border-stone-200/40">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || 'ЦЕННОСТИ И ПРИНЦИПЫ'}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-12">
          {/* Principles Grid List */}
          <div className="lg:col-span-7 space-y-6">
            {principles.map((item, index) => (
              <div key={index} className="flex gap-6 items-start group">
                <span className="font-heading text-lg text-[var(--accent-color)] bg-white/65 border border-stone-200/40 w-10 h-10 rounded-full flex items-center justify-center font-light flex-shrink-0 transition-colors duration-500 group-hover:bg-[var(--accent-color)] group-hover:text-[var(--bg-color)]">
                  0{index + 1}
                </span>
                <div className="space-y-1 pt-1">
                  <h3 className="text-xl font-medium text-[var(--primary-color)] tracking-tight font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Large Editorial Portrait & Quote Block */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-[100px] overflow-hidden shadow-lg h-[26rem] bg-stone-100 border-4 border-white/40">
              <img
                src={sectionImage}
                alt="Philosophy illustration"
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {section.quote && (
              <blockquote className="border-l-2 border-[var(--accent-color)] pl-6 py-2">
                <p className="font-heading text-xl italic text-[var(--primary-color)] leading-relaxed font-light">
                  {section.quote}
                </p>
              </blockquote>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default PhilosophySection;
