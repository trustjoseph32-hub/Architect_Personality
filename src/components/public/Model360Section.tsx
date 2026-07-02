import React, { useState } from 'react';
import { DevelopmentArea } from '../../types';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { 
  Activity, Brain, Briefcase, Megaphone, TrendingUp, Sparkles, 
  X, Check, HelpCircle, ArrowRight
} from 'lucide-react';

interface Model360SectionProps {
  areas: DevelopmentArea[];
}

export default function Model360Section({ areas }: Model360SectionProps) {
  const [selectedArea, setSelectedArea] = useState<DevelopmentArea | null>(null);

  // Icon mapping helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Brain': return <Brain className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Megaphone': return <Megaphone className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <HelpCircle className="w-6 h-6" />;
    }
  };

  return (
    <section id="model360" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-stone-50 rounded-full filter blur-3xl opacity-60 -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-50 rounded-full filter blur-3xl opacity-40 translate-y-1/2" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs tracking-[0.25em] text-amber-800 uppercase font-semibold">КОНЦЕПЦИЯ 360°</span>
          <h2 className="text-3xl sm:text-5xl font-medium text-slate-900 tracking-tight font-heading">
            Модель Целостного Развития Личности
          </h2>
          <div className="w-16 h-[1px] bg-amber-800/40 my-2" />
          <p className="text-stone-500 font-light text-sm sm:text-base leading-relaxed">
            Мы рассматриваем человека как единую экосистему, где каждая сфера переплетена с другими. Нажмите на любую область развития ниже, чтобы заглянуть в её суть, конкретные шаги и результаты.
          </p>
        </div>

        {/* Areas Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {areas.map((area) => (
            <Card
              key={area.id}
              id={`area-card-${area.id}`}
              className="group p-8 bg-[#FAF8F5] hover:bg-[#F0EDE6] border border-stone-200/80 hover:border-stone-300 transition-all duration-500 flex flex-col justify-between space-y-8 cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedArea(area)}
            >
              {/* Card visual accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-800/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
              
              <div className="space-y-6 relative">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-amber-900 shadow-sm border border-stone-100 group-hover:scale-110 transition-transform duration-500">
                  {getIcon(area.icon)}
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-slate-900 leading-tight">
                    {area.title}
                  </h3>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
                    {area.short_description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/50 flex items-center justify-between text-xs font-mono tracking-widest text-amber-900 font-semibold group-hover:text-amber-950">
                <span>ИССЛЕДОВАТЬ СФЕРУ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </Card>
          ))}
        </div>

        {/* Active Area Detail Modal */}
        {selectedArea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div 
              className="bg-[#FAF8F5] border border-stone-200 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 sm:p-8 border-b border-stone-200/60 bg-white flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-stone-100 flex items-center justify-center text-amber-800">
                    {getIcon(selectedArea.icon)}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-stone-400">Сфера развития</span>
                    <h3 className="font-heading text-xl sm:text-2xl font-medium text-slate-900">{selectedArea.title}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArea(null)}
                  className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-grow">
                {/* Description */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs tracking-widest text-stone-400 uppercase">О направлении</h4>
                  <p className="text-stone-600 font-light text-sm sm:text-base leading-relaxed">
                    {selectedArea.full_description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-stone-200/40">
                  {/* Tasks / What we do */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs tracking-widest text-amber-800 uppercase font-semibold">Что делаем (Задачи и шаги):</h4>
                    <ul className="space-y-3">
                      {JSON.parse(selectedArea.tasks_json || '[]').map((task: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-stone-600 text-sm font-light">
                          <span className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-800 font-mono text-[10px] font-bold mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results / Outputs */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs tracking-widest text-amber-800 uppercase font-semibold">Результат на выходе:</h4>
                    <ul className="space-y-3">
                      {JSON.parse(selectedArea.results_json || '[]').map((res: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-stone-600 text-sm font-light">
                          <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0 text-green-700 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 sm:p-8 bg-white border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-400 font-light text-center sm:text-left">
                  Хотите начать интеграцию изменений в этой сфере уже сегодня?
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button 
                    variant="primary" 
                    className="w-full sm:w-auto px-6 py-2.5 text-xs tracking-wider uppercase font-semibold"
                    onClick={() => {
                      setSelectedArea(null);
                      const formEl = document.getElementById('lead-form');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Пройти аудит
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
