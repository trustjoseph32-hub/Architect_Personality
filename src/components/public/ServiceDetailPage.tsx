import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { Service } from '../../types.js';
import Container from '../ui/Container.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';
import { ChevronLeft, ArrowRight, Calendar, Landmark, MapPin, Check, Info } from 'lucide-react';

interface ServiceDetailPageProps {
  service: Service;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const { navigate } = useRouter();

  if (!service) {
    return (
      <div className="py-24 text-center">
        <Container>
          <h2 className="font-heading text-3xl font-medium">Услуга не найдена</h2>
          <Button variant="outline" className="mt-6" onClick={() => navigate('/')}>
            На главную
          </Button>
        </Container>
      </div>
    );
  }

  // Safe parse arrays from JSON
  let includes: string[] = [];
  let results: string[] = [];
  try {
    if (service.includes_json) {
      includes = JSON.parse(service.includes_json);
    }
    if (service.results_json) {
      results = JSON.parse(service.results_json);
    }
  } catch (e) {
    console.error('Failed to parse service JSON elements', e);
  }

  return (
    <article className="py-16 sm:py-24 bg-[#FAF8F5]">
      <Container>
        {/* Back Link Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-xs font-mono tracking-widest text-stone-500 hover:text-amber-800 uppercase font-medium mb-12 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1.5" /> На главную
        </button>

        {/* Editorial Title Header */}
        <header className="max-w-4xl space-y-6 mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-amber-800 uppercase font-semibold">
            ИНДИВИДУАЛЬНАЯ ПРОГРАММА СОПРОВОЖДЕНИЯ
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 leading-tight font-heading">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl text-stone-500 font-light leading-relaxed">
            {service.short_description}
          </p>
        </header>

        {/* Quick parameters tags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-[1rem] flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800 flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-stone-400 block uppercase tracking-wider font-semibold">ДЛИТЕЛЬНОСТЬ</span>
              <span className="text-sm font-medium text-slate-900">{service.duration || 'Индивидуально'}</span>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-5 rounded-[1rem] flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-stone-400 block uppercase tracking-wider font-semibold">ФОРМАТ СЕССИЙ</span>
              <span className="text-sm font-medium text-slate-900">{service.format || 'Офлайн / Онлайн'}</span>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-5 rounded-[1rem] flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800 flex-shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-stone-400 block uppercase tracking-wider font-semibold">СТОИМОСТЬ</span>
              <span className="text-sm font-semibold text-slate-950 font-heading">{service.price || 'Обсуждается'}</span>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div className="w-full h-[28rem] sm:h-[35rem] rounded-[2rem] overflow-hidden shadow-xl bg-stone-100 mb-20 relative">
          <img
            src={service.image_url || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'}
            alt={service.title}
            className="w-full h-full object-cover grayscale-[10%]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main program description block */}
          <div className="lg:col-span-8 space-y-12">
            {/* Core Idea */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl text-slate-900 font-semibold border-b border-stone-200 pb-4">
                Описание программы
              </h2>
              <p className="text-stone-600 font-light text-base sm:text-lg leading-relaxed">
                {service.full_description}
              </p>
            </div>

            {/* Target Audience */}
            {service.target_audience && (
              <div className="bg-amber-500/5 border border-amber-800/10 p-6 sm:p-8 rounded-[1.5rem] flex gap-5 items-start">
                <Info className="w-6 h-6 text-amber-800 flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h4 className="font-heading text-lg font-semibold text-slate-900">Кому идеально подходит программа:</h4>
                  <p className="text-sm text-stone-600 font-light leading-relaxed">
                    {service.target_audience}
                  </p>
                </div>
              </div>
            )}

            {/* What is Included */}
            {includes.length > 0 && (
              <div className="space-y-6">
                <h2 className="font-heading text-2xl sm:text-3xl text-slate-900 font-semibold border-b border-stone-200 pb-4">
                  Что входит в стоимость:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {includes.map((inc, i) => (
                    <Card key={i} className="p-6 border border-stone-200 flex gap-4 items-start bg-white">
                      <span className="font-mono text-xs font-semibold text-amber-800 bg-stone-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                        {inc}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white space-y-8">
              {/* Outcomes list */}
              {results.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-mono text-[10px] tracking-widest text-slate-800 uppercase font-bold">
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

              {/* Price list */}
              <div className="pt-6 border-t border-stone-100 space-y-2">
                <span className="font-mono text-[9px] tracking-widest text-stone-400 uppercase font-semibold">СТОИМОСТЬ УЧАСТИЯ</span>
                <p className="text-3xl font-bold text-slate-950 font-heading">
                  {service.price}
                </p>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Доступна оплата в рассрочку от банков-партнеров или поэтапная оплата.
                </p>
              </div>

              {/* CTA button */}
              <Button
                variant="primary"
                className="w-full py-4 text-xs tracking-widest font-semibold uppercase"
                onClick={() => navigate('/#lead-form')}
              >
                {service.button_text || 'Оставить заявку'} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </article>
  );
};
export default ServiceDetailPage;
