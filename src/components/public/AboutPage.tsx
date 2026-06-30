import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { SiteSettings, PageSection } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';
import { CheckCircle, ShieldCheck, Gem, Users } from 'lucide-react';

interface AboutPageProps {
  settings: SiteSettings;
  sections: PageSection[];
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, sections }) => {
  const { navigate } = useRouter();
  const section = sections.find(s => s.section_key === 'about');

  let extraData: any = {};
  try {
    if (section?.data_json) {
      extraData = JSON.parse(section.data_json);
    }
  } catch (e) {
    console.error(e);
  }

  const values = extraData.values || [
    'Уважение к уникальной истории каждого человека',
    'Глубинный психологический подход взамен поверхностных решений',
    'Эстетика и качество в каждой детали взаимодействия',
    'Научно доказанные методы коучинга и психотерапии'
  ];

  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F5]">
      <Container>
        <SectionTitle
          eyebrow="ИСТОРИЯ И МИССИЯ"
          title="Архитектура Личности"
          subtitle="Мы верим, что каждый человек — это произведение искусства, требующее профессиональной огранки и глубокого самоанализа."
        />

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div className="lg:col-span-6 rounded-[2rem] overflow-hidden shadow-xl h-[32rem] bg-stone-100">
            <img
              src={section?.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'}
              alt="Story Workspace"
              className="w-full h-full object-cover grayscale-[10%]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-heading text-2xl sm:text-3xl font-medium text-slate-900 leading-tight">
              Как зародилась концепция «Проекта Я»
            </h3>
            
            <p className="text-stone-500 font-light text-base leading-relaxed">
              Многие годы психологическая поддержка и стиль существовали обособленно. Стилисты работали над внешним гардеробом, часто ломая индивидуальность ради трендов, а психологи фокусировались на внутреннем мире, не доходя до телесного и визуального проявления в социуме.
            </p>

            <blockquote className="border-l-4 border-amber-800 pl-6 italic text-stone-700 font-heading text-lg font-light">
              «Истинная трансформация происходит только тогда, когда внутреннее Я обретает точную внешнюю форму.»
            </blockquote>

            <p className="text-stone-500 font-light text-base leading-relaxed">
              Наш проект объединил эти две дисциплины. Мы создали запатентованную синергетическую методику: через глубинные психоаналитические и коучинговые практики мы раскапываем архетипы личности, выстраиваем непоколебимые психологические опоры, а затем концептуальные стилисты переводят их на язык кроя, силуэтов, цветов и невербальной коммуникации.
            </p>
          </div>
        </div>

        {/* Mission and values grid */}
        <div className="bg-stone-50 rounded-[2rem] border border-stone-100 p-10 sm:p-16 mb-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <span className="font-mono text-xs tracking-widest text-amber-800 uppercase font-medium">НАША ГЛАВНАЯ ЦЕЛЬ</span>
            <h3 className="font-heading text-3xl font-medium text-slate-900">Индивидуальность как система</h3>
            <p className="text-stone-500 font-light text-sm sm:text-base leading-relaxed">
              {extraData.mission || 'Помочь каждому человеку раскрыть свой уникальный код личности, обрести уверенность и проявить свою внутреннюю эстетику во внешнем мире.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            {values.map((val: string, index: number) => {
              const icons = [ShieldCheck, Gem, Users, CheckCircle];
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-medium text-slate-900 font-heading">
                      Принцип {index + 1}
                    </h4>
                    <p className="text-sm text-stone-500 font-light leading-relaxed">
                      {val}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h3 className="font-heading text-2xl sm:text-3xl text-slate-900 font-medium">
            Готовы спроектировать свой новый образ?
          </h3>
          <p className="text-stone-500 font-light text-base leading-relaxed max-w-xl mx-auto">
            Оставьте заявку, и наши специалисты свяжутся с вами, чтобы обсудить ваши цели.
          </p>
          <Button
            variant="primary"
            className="px-10 py-4 text-xs font-semibold tracking-widest"
            onClick={() => navigate('/#lead-form')}
          >
            Оставить заявку
          </Button>
        </div>
      </Container>
    </div>
  );
};
export default AboutPage;
