import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { Direction } from '../../types.js';
import Container from '../ui/Container.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';
import { ChevronLeft, ArrowRight, Compass, Check, ArrowUpRight } from 'lucide-react';

interface DirectionDetailPageProps {
  direction: Direction;
}

export const DirectionDetailPage: React.FC<DirectionDetailPageProps> = ({ direction }) => {
  const { navigate } = useRouter();

  if (!direction) {
    return (
      <div className="py-24 text-center">
        <Container>
          <h2 className="font-heading text-3xl font-medium">Направление не найдено</h2>
          <Button variant="outline" className="mt-6" onClick={() => navigate('/directions')}>
            Вернуться ко всем направлениям
          </Button>
        </Container>
      </div>
    );
  }

  let results: string[] = [];
  try {
    if (direction.results_json) {
      results = JSON.parse(direction.results_json);
    }
  } catch (e) {
    console.error('Failed to parse direction results_json', e);
  }

  const defaultStages = [
    { title: 'Глубинное анкетирование', description: 'Сбор анамнеза, психологическое тестирование, фиксация текущих трудностей и целей.' },
    { title: 'Консультация-разбор', description: '2-часовая совместная сессия, выявление паттернов поведения, страхов проявления и визуальных блокировок.' },
    { title: 'Проектирование карты решений', description: 'Разработка личной книги смыслов, подбор силуэтов, ориентиров стиля и карты трансформации.' },
    { title: 'Интеграция в жизнь', description: 'Практические шаги, ревизия гардероба, поддержка кураторов в процессе внедрения нового образа.' }
  ];

  return (
    <article className="py-16 sm:py-24 bg-[#FAF8F5]">
      <Container>
        {/* Back Link Button */}
        <button
          onClick={() => navigate('/directions')}
          className="inline-flex items-center text-xs font-mono tracking-widest text-stone-500 hover:text-amber-800 uppercase font-medium mb-12 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1.5" /> Ко всем направлениям
        </button>

        {/* Editorial Title and Subtitle Header */}
        <header className="max-w-4xl space-y-6 mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-amber-800 uppercase font-semibold">
            ПОДРОБНЫЙ РАЗБОР НАПРАВЛЕНИЯ
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 leading-tight font-heading">
            {direction.title}
          </h1>
          <p className="text-lg sm:text-xl text-stone-500 font-light leading-relaxed">
            {direction.short_description}
          </p>
        </header>

        {/* Big Editorial Cover */}
        <div className="w-full h-[28rem] sm:h-[35rem] rounded-[2rem] overflow-hidden shadow-xl bg-stone-100 mb-20 relative">
          <img
            src={direction.image_url || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'}
            alt={direction.title}
            className="w-full h-full object-cover grayscale-[10%]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Description details */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl text-slate-900 font-semibold border-b border-stone-200 pb-4">
                Суть направления
              </h2>
              <div className="text-stone-600 font-light text-base sm:text-lg leading-relaxed space-y-6">
                <p>{direction.full_description || 'Детальное описание прорабатывается индивидуально с каждым экспертом.'}</p>
                <p>Мы предлагаем целостную методологию, благодаря которой вы получаете не временные косметические изменения, а формируете фундаментальную внутреннюю опору, позволяющую вашему новому стилю выглядеть аутентично и органично в любой профессиональной и личной среде.</p>
              </div>
            </div>

            {/* Stages of work */}
            <div className="space-y-8">
              <h2 className="font-heading text-2xl sm:text-3xl text-slate-900 font-semibold border-b border-stone-200 pb-4">
                Этапы нашей работы
              </h2>
              <div className="space-y-6">
                {defaultStages.map((stg, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="font-mono text-xs font-semibold text-amber-800 bg-stone-100 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                      0{i + 1}
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-medium text-slate-900 font-heading">
                        {stg.title}
                      </h4>
                      <p className="text-sm text-stone-500 font-light leading-relaxed">
                        {stg.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side card info - Price, results, CTA */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white space-y-8">
              {/* Outcomes list */}
              {results.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-mono text-xs tracking-widest text-slate-800 uppercase font-semibold">
                    Какие результаты вы получите:
                  </h4>
                  <ul className="space-y-3">
                    {results.map((res: string, idx: number) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs text-stone-500">
                        <Check className="w-4 h-4 text-amber-800 mt-0.5 flex-shrink-0" />
                        <span className="font-light">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price card block */}
              <div className="pt-6 border-t border-stone-100 space-y-2">
                <span className="font-mono text-[10px] tracking-widest text-stone-400 uppercase font-semibold">СТОИМОСТЬ</span>
                <p className="text-2xl font-semibold text-slate-900 font-heading">
                  Индивидуально
                </p>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Финальная стоимость рассчитывается после предварительной диагностической сессии в зависимости от объема задач.
                </p>
              </div>

              {/* CTA button */}
              <Button
                variant="primary"
                className="w-full py-4 text-xs tracking-widest font-semibold uppercase"
                onClick={() => navigate('/#lead-form')}
              >
                Оставить заявку <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </article>
  );
};
export default DirectionDetailPage;
