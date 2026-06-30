import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { Founder } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';
import { Award, GraduationCap, CheckCircle, Quote, ArrowUpRight } from 'lucide-react';

interface FounderPageProps {
  founder: Founder;
}

export const FounderPage: React.FC<FounderPageProps> = ({ founder }) => {
  const { navigate } = useRouter();

  if (!founder) return null;

  // Safe JSON arrays decode
  let education: string[] = [];
  let achievements: string[] = [];
  let competencies: string[] = [];
  try {
    if (founder.education_json) education = JSON.parse(founder.education_json);
    if (founder.achievements_json) achievements = JSON.parse(founder.achievements_json);
    if (founder.competencies_json) competencies = JSON.parse(founder.competencies_json);
  } catch (e) {
    console.error('Failed to parse founder arrays', e);
  }

  return (
    <div className="py-16 sm:py-24 bg-[var(--bg-color)]">
      <Container>
        <SectionTitle
          eyebrow="ОСНОВАТЕЛЬ ПРОЕКТА"
          title="Архитектор вашей проявленности"
          subtitle="Знакомство с создателем методологии, психологом-имиджмейкером Земфирой Хисамутдиновой."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-12 mb-20">
          {/* Main portrait */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl h-[36rem] bg-stone-100">
              <img
                src={founder.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'}
                alt={founder.name}
                className="w-full h-full object-cover grayscale-[10%]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Elegant overlay quotation */}
            {founder.quote && (
              <div className="absolute -bottom-8 -right-4 left-4 bg-white shadow-xl p-6 rounded-[1rem] border border-stone-100 flex gap-4">
                <Quote className="w-8 h-8 text-amber-800 flex-shrink-0 opacity-50" />
                <p className="font-heading italic text-sm text-slate-800 leading-relaxed">
                  {founder.quote}
                </p>
              </div>
            )}
          </div>

          {/* Core Biography and Experience */}
          <div className="lg:col-span-7 space-y-8 pt-6">
            <div className="space-y-2">
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                {founder.name}
              </h2>
              <span className="font-mono text-xs tracking-widest text-amber-800 uppercase font-bold block">
                {founder.role}
              </span>
            </div>

            <p className="text-stone-500 font-light text-base sm:text-lg leading-relaxed">
              {founder.short_description}
            </p>

            <div className="text-stone-600 font-light text-sm sm:text-base leading-relaxed space-y-4">
              <p>{founder.full_bio}</p>
              <p className="font-medium text-slate-800">{founder.experience}</p>
            </div>

            {/* Competencies badges */}
            {competencies.length > 0 && (
              <div className="space-y-3 pt-4">
                <h4 className="font-mono text-[10px] tracking-widest text-slate-800 uppercase font-semibold">
                  ОБЛАСТИ ЭКСПЕРТИЗЫ
                </h4>
                <div className="flex flex-wrap gap-2">
                  {competencies.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-4  py-1.5 bg-stone-100 text-stone-700 text-xs font-light tracking-wide rounded-full border border-stone-200"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Education & Achievements bento boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 pt-10">
          {/* Education list */}
          {education.length > 0 && (
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white space-y-6">
              <div className="flex gap-4 items-center border-b border-stone-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="font-heading text-xl font-medium text-slate-900">Образование</h4>
              </div>
              <ul className="space-y-4">
                {education.map((edu, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm text-stone-600">
                    <CheckCircle className="w-4 h-4 text-amber-800 mt-0.5 flex-shrink-0" />
                    <span className="font-light">{edu}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Achievements list */}
          {achievements.length > 0 && (
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white space-y-6">
              <div className="flex gap-4 items-center border-b border-stone-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-heading text-xl font-medium text-slate-900">Достижения</h4>
              </div>
              <ul className="space-y-4">
                {achievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm text-stone-600">
                    <CheckCircle className="w-4 h-4 text-amber-800 mt-0.5 flex-shrink-0" />
                    <span className="font-light">{ach}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Final call to action */}
        <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <h3 className="font-heading text-2xl sm:text-3xl font-medium text-slate-900">
            Индивидуальный разбор вашей ситуации
          </h3>
          <p className="text-stone-500 font-light text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Вы можете записаться на личную часовую сессию-знакомство с Земфирой Хисамутдиновой, чтобы определить ваши точки роста и вектор позиционирования.
          </p>
          <Button
            variant="primary"
            className="px-8 py-3.5 text-xs font-semibold tracking-widest uppercase"
            onClick={() => navigate('/#lead-form')}
          >
            {founder.button_text || 'Записаться на консультацию'} <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Container>
    </div>
  );
};
export default FounderPage;
