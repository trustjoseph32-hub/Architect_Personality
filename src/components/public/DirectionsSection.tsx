import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { Direction, DirectionBranch } from '../../types.js';
import Container from '../ui/Container.js';
import Card from '../ui/Card.js';
import { ArrowRight } from 'lucide-react';

interface DirectionsSectionProps {
  directions: Direction[];
  branches: DirectionBranch[];
  buttonStyle?: 'soft' | 'strict' | 'premium';
}

export default function DirectionsSection({ directions, branches, buttonStyle }: DirectionsSectionProps) {
  const { navigate } = useRouter();

  return (
    <section id="directions" className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-stone-100 rounded-full filter blur-3xl opacity-50 -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-50 rounded-full filter blur-3xl opacity-30 translate-y-1/2" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs tracking-[0.25em] text-amber-800 uppercase font-semibold">
            АРХИТЕКТУРА ПРОЕКТА
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium text-slate-900 tracking-tight font-heading">
            Три направления развития
          </h2>
          <div className="w-16 h-[1px] bg-amber-800/40 my-1" />
          <p className="text-stone-500 font-light text-sm sm:text-base leading-relaxed">
            Проект «Я» помогает собрать человека в цельную систему: понять себя, выразить себя и проявить себя в жизни.
          </p>
        </div>

        {/* 3 Main Directions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {directions.slice(0, 3).map((dir) => {
            // Default colors if not present in schema
            const cardBg = dir.accent_color || '#FAF5F0';

            return (
              <Card
                key={dir.id}
                id={`direction-card-${dir.id}`}
                style={{ backgroundColor: cardBg }}
                className="p-8 sm:p-10 border border-stone-200/60 hover:border-stone-300 shadow-sm hover:shadow-md transition-all duration-500 rounded-[2.25rem] flex flex-col justify-between min-h-[310px] group cursor-pointer relative overflow-hidden"
                onClick={() => navigate(`/directions/${dir.slug}`)}
              >
                {/* Visual Circle Accent */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-stone-900/5 rounded-full transition-transform duration-700 group-hover:scale-110" />

                <div className="space-y-6 relative z-10">
                  {/* Top line with Key Question */}
                  <div className="flex justify-between items-center border-b border-stone-950/10 pb-4">
                    <span className="font-heading italic text-sm text-stone-500 font-light tracking-wide">
                      {dir.key_question || 'Кто я?'}
                    </span>
                  </div>

                  {/* Core Title and Info */}
                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl sm:text-3xl font-medium text-slate-900 group-hover:text-amber-900 transition-colors duration-300">
                      {dir.title}
                    </h3>
                    <p className="text-stone-600 font-light text-xs sm:text-sm leading-relaxed">
                      {dir.short_description}
                    </p>
                  </div>
                </div>

                {/* Indication of clickability at the bottom */}
                <div className="pt-5 mt-6 border-t border-stone-950/5 flex items-center justify-between text-xs font-mono tracking-wider text-stone-500 group-hover:text-amber-800 transition-colors relative z-10">
                  <span className="font-medium">ПОДРОБНЕЕ</span>
                  <div className="w-8 h-8 rounded-full bg-white/70 group-hover:bg-amber-800 group-hover:text-white transition-all flex items-center justify-center shadow-sm">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

