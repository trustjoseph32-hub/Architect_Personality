import React, { useState } from 'react';
import { useRouter } from '../../lib/use-router.js';
import { api } from '../../lib/api-client.js';
import { Direction, DevelopmentArea } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';
import { 
  Check, ArrowRight, ArrowLeft, ClipboardCheck, Sparkles, 
  Activity, Brain, Briefcase, Megaphone, TrendingUp, HelpCircle
} from 'lucide-react';

interface LeadFormSectionProps {
  directions?: Direction[];
  areas?: DevelopmentArea[];
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ directions = [], areas = [] }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [step, setStep] = useState(1);
  const { navigate } = useRouter();

  // Questionnaire form states
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [desiredChanges, setDesiredChanges] = useState('');
  const [mainObstacle, setMainObstacle] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [messenger, setMessenger] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);

  // Fallback spheres if database is loading
  const defaultSpheres = [
    { id: 'body', title: 'Тело и здоровье', desc: 'Спорт, питание, энергия, привычки, забота о физическом состоянии.', icon: 'Activity' },
    { id: 'psy', title: 'Психология и внутреннее состояние', desc: 'Отношение к себе, эмоции, самооценка, устойчивость.', icon: 'Brain' },
    { id: 'career', title: 'Профессия и компетенции', desc: 'Развитие проф. навыков, подбор экспертов, траектория.', icon: 'Briefcase' },
    { id: 'brand', title: 'Личный бренд и проявленность', desc: 'Ценности, философия, позиционирование, соцсети, образ.', icon: 'Megaphone' },
    { id: 'business', title: 'Бизнес и деятельность', desc: 'Развитие дела, упаковка, стратегия, продукты, коммуникация.', icon: 'TrendingUp' },
    { id: 'style', title: 'Стиль и одежда', desc: 'Образ, визуальное позиционирование, одежда как продолжение личности.', icon: 'Sparkles' }
  ];

  const spheresToDisplay = areas.length > 0 ? areas : defaultSpheres;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <HelpCircle className="w-5 h-5" />;
    }
  };

  const toggleArea = (areaTitle: string) => {
    if (selectedAreas.includes(areaTitle)) {
      setSelectedAreas(selectedAreas.filter(a => a !== areaTitle));
    } else {
      setSelectedAreas([...selectedAreas, areaTitle]);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (selectedAreas.length === 0) {
        setErrorMsg('Пожалуйста, выберите хотя бы одну сферу развития для продолжения.');
        return;
      }
    }
    if (step === 2) {
      if (!desiredChanges.trim() || !mainObstacle.trim()) {
        setErrorMsg('Пожалуйста, заполните оба вопроса, чтобы мы понимали ваш контекст.');
        return;
      }
    }
    setErrorMsg('');
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setStep(step - 1);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Пожалуйста, введите ваше имя.');
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setErrorMsg('Пожалуйста, заполните хотя бы один способ связи (Телефон или Email).');
      return;
    }
    if (!consent) {
      setErrorMsg('Необходимо согласие на обработку персональных данных.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.submitLead({
        name,
        phone,
        email,
        messenger,
        direction: selectedAreas.join(', '),
        selected_areas: selectedAreas,
        desired_changes: desiredChanges,
        main_obstacle: mainObstacle,
        message: message || `Интересует аудит сфер: ${selectedAreas.join(', ')}`
      });

      if (res.success) {
        navigate('/thank-you');
      } else {
        setErrorMsg('Не удалось отправить анкету. Пожалуйста, попробуйте еще раз.');
      }
    } catch (err: any) {
      console.error('Lead submit error:', err);
      setErrorMsg(err.message || 'Произошла ошибка при отправке заявки. Проверьте подключение.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-form" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-stone-200/40 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-amber-800/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-stone-200/40 blur-3xl pointer-events-none" />

      <Container>
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto space-y-4">
          <span className="font-mono text-xs tracking-[0.25em] text-amber-800 uppercase font-semibold">ПЕРВИЧНЫЙ АУДИТ</span>
          <h2 className="text-3xl sm:text-4xl font-medium text-slate-900 tracking-tight font-heading">
            Запустить Проектирование Себя
          </h2>
          <p className="text-stone-500 font-light text-sm sm:text-base leading-relaxed">
            Пройдите пошаговый интерактивный аудит. Ваши ответы станут фундаментом для разработки индивидуальной архитектурной карты 360°.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="mb-10 flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-grow last:flex-grow-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold border transition-all duration-300 ${
                  step === s 
                    ? 'bg-amber-900 text-white border-amber-900 shadow-md ring-4 ring-amber-900/10'
                    : step > s 
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-stone-400 border-stone-200'
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`h-[2px] flex-grow mx-4 transition-all duration-300 ${
                    step > s ? 'bg-green-600' : 'bg-stone-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <Card className="p-8 sm:p-12 border border-stone-200/80 bg-white shadow-lg rounded-3xl relative overflow-hidden">
            {errorMsg && (
              <div className="mb-8 p-4 bg-red-50 text-red-800 text-sm rounded-xl border border-red-200 font-light font-sans">
                {errorMsg}
              </div>
            )}

            {/* STEP 1: SELECT AREAS */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-slate-900">Шаг 1. Сферы развития</h3>
                  <p className="text-stone-500 font-light text-xs sm:text-sm">
                    Выберите направления, над которыми вы хотели бы поработать в первую очередь. Можно выбрать несколько.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {spheresToDisplay.map((sphere) => {
                    const isSelected = selectedAreas.includes(sphere.title);
                    return (
                      <div
                        key={sphere.id}
                        onClick={() => toggleArea(sphere.title)}
                        className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-start select-none ${
                          isSelected 
                            ? 'bg-amber-800/5 border-amber-800 ring-1 ring-amber-800' 
                            : 'bg-[#FAF8F5] hover:bg-stone-100 border-stone-200/70'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl border transition-colors ${
                          isSelected 
                            ? 'bg-amber-900 text-white border-amber-950' 
                            : 'bg-white text-stone-600 border-stone-200'
                        }`}>
                          {getIcon(sphere.icon || 'Sparkles')}
                        </div>
                        <div className="flex-grow space-y-1">
                          <h4 className="font-heading font-medium text-sm text-slate-900">{sphere.title}</h4>
                          <p className="text-stone-400 font-light text-xs leading-relaxed">
                            {sphere.short_description || sphere.desc}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected 
                            ? 'bg-amber-900 border-amber-900 text-white' 
                            : 'border-stone-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-end">
                  <Button 
                    variant="primary" 
                    className="px-8 py-3 text-xs tracking-wider uppercase font-semibold flex items-center gap-2"
                    onClick={handleNextStep}
                  >
                    Продолжить <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: DESIRED CHANGES & OBSTACLES */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-slate-900">Шаг 2. Ваши ожидания и препятствия</h3>
                  <p className="text-stone-500 font-light text-xs sm:text-sm">
                    Опишите своими словами текущее положение дел. Это поможет экспертам подготовить максимально фокусную встречу.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                      1. Какие изменения в выбранных сферах для вас наиболее важны? *
                    </label>
                    <textarea
                      rows={4}
                      value={desiredChanges}
                      onChange={(e) => setDesiredChanges(e.target.value)}
                      placeholder="Опишите, к какому идеальному состоянию или результатам в теле, мышлении или образе вы стремитесь..."
                      className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-xl focus:outline-none focus:border-amber-800 focus:ring-1 focus:ring-amber-800 transition-colors resize-none font-light"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                      2. Что сейчас мешает получить эти изменения (главное препятствие)? *
                    </label>
                    <textarea
                      rows={4}
                      value={mainObstacle}
                      onChange={(e) => setMainObstacle(e.target.value)}
                      placeholder="Нехватка времени, отсутствие системы, непонимание с чего начать, нехватка поддержки экспертов..."
                      className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-xl focus:outline-none focus:border-amber-800 focus:ring-1 focus:ring-amber-800 transition-colors resize-none font-light"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    className="px-6 py-3 text-xs tracking-wider uppercase font-semibold flex items-center gap-2"
                    onClick={handlePrevStep}
                  >
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </Button>
                  <Button 
                    variant="primary" 
                    className="px-8 py-3 text-xs tracking-wider uppercase font-semibold flex items-center gap-2"
                    onClick={handleNextStep}
                  >
                    Продолжить <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT INFORMATION */}
            {step === 3 && (
              <form onSubmit={handleSubmitForm} className="space-y-8 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-slate-900">Шаг 3. Контактные данные</h3>
                  <p className="text-stone-500 font-light text-xs sm:text-sm">
                    Оставьте ваши контакты. Координатор проекта свяжется с вами для согласования даты проведения установочной сессии.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                      Имя *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Александра"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-xl focus:outline-none focus:border-amber-800 focus:ring-1 focus:ring-amber-800 transition-colors"
                      required
                    />
                  </div>

                  {/* Telegram/WhatsApp */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="messenger" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                      Telegram / WhatsApp
                    </label>
                    <input
                      id="messenger"
                      type="text"
                      placeholder="например: @alexandra"
                      value={messenger}
                      onChange={(e) => setMessenger(e.target.value)}
                      className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-xl focus:outline-none focus:border-amber-800 focus:ring-1 focus:ring-amber-800 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phone" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                      Телефон {!email && '*'}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-xl focus:outline-none focus:border-amber-800 focus:ring-1 focus:ring-amber-800 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                      Email {!phone && '*'}
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="alexandra@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-xl focus:outline-none focus:border-amber-800 focus:ring-1 focus:ring-amber-800 transition-colors"
                    />
                  </div>

                  {/* Optional message */}
                  <div className="flex flex-col space-y-2 sm:col-span-2">
                    <label htmlFor="message" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                      Комментарий (любые дополнительные пожелания)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Хочу уделить особое внимание теме личного бренда и питания..."
                      className="px-4 py-3 bg-white border border-stone-200 text-stone-900 text-sm rounded-xl focus:outline-none focus:border-amber-800 focus:ring-1 focus:ring-amber-800 transition-colors resize-none font-light"
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-start space-x-3">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-amber-800 focus:ring-amber-800 mt-1 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-stone-500 font-sans font-light leading-relaxed cursor-pointer select-none">
                    Я даю свое согласие на обработку персональных данных в соответствии с{' '}
                    <a href="#" className="underline text-stone-700 hover:text-amber-800 transition-colors">
                      Политикой конфиденциальности
                    </a>{' '}
                    и{' '}
                    <a href="#" className="underline text-stone-700 hover:text-amber-800 transition-colors">
                      Согласием на обработку данных
                    </a>
                    . *
                  </label>
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="px-6 py-3 text-xs tracking-wider uppercase font-semibold flex items-center gap-2"
                    onClick={handlePrevStep}
                    disabled={loading}
                  >
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </Button>
                  <Button 
                    type="submit"
                    variant="primary" 
                    disabled={loading}
                    className="px-10 py-4 text-xs tracking-wider uppercase font-semibold flex items-center gap-2 rounded-full"
                  >
                    {loading ? 'Отправка...' : 'Отправить анкету'} <ClipboardCheck className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default LeadFormSection;
