import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '../../lib/use-router.js';
import { api } from '../../lib/api-client.js';
import { Direction } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';

interface LeadFormInputs {
  name: string;
  phone: string;
  email: string;
  messenger: string;
  direction: string;
  message: string;
  consent: boolean;
}

interface LeadFormSectionProps {
  directions: Direction[];
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ directions }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { navigate } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LeadFormInputs>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      messenger: '',
      direction: '',
      message: '',
      consent: true
    }
  });

  const phoneValue = watch('phone');
  const emailValue = watch('email');

  const onSubmit = async (data: LeadFormInputs) => {
    // Validation: either phone or email must be provided
    if (!data.phone && !data.email) {
      setErrorMsg('Пожалуйста, заполните хотя бы один способ связи (Телефон или Email)');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.submitLead({
        name: data.name,
        phone: data.phone,
        email: data.email,
        messenger: data.messenger,
        direction: data.direction,
        message: data.message
      });

      if (res.success) {
        navigate('/thank-you');
      } else {
        setErrorMsg('Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Произошла ошибка при отправке заявки. Проверьте подключение.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-form" className="py-24 sm:py-32 bg-[var(--bg-color)] border-t border-stone-200/40 relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-[var(--accent-color)]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-[var(--primary-color)]/5 blur-3xl pointer-events-none"></div>

      <Container>
        <SectionTitle
          eyebrow="ОБРАТНАЯ СВЯЗЬ"
          title="Начать трансформацию"
          subtitle="Сделайте первый шаг к проектированию своей новой проявленности. Опишите вашу задачу, и мы предложим оптимальный формат сотрудничества."
        />

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 sm:p-12 border border-stone-200/40 bg-white/80 backdrop-blur-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {errorMsg && (
                <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 font-light font-sans">
                  {errorMsg}
                </div>
              )}

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
                    className={`px-4 py-3 bg-white/60 border text-stone-900 text-sm rounded-md focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors ${
                      errors.name ? 'border-red-300' : 'border-stone-200'
                    }`}
                    {...register('name', { required: 'Пожалуйста, введите ваше имя' })}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 font-light font-sans">{errors.name.message}</span>
                  )}
                </div>

                {/* Preferred Direction */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="direction" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                    Интересующее направление
                  </label>
                  <select
                    id="direction"
                    className="px-4 py-3 bg-white/60 border border-stone-200 text-stone-900 text-sm rounded-md focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors"
                    {...register('direction')}
                  >
                    <option value="">Выберите направление...</option>
                    {directions.map(d => (
                      <option key={d.id} value={d.title}>
                        {d.title}
                      </option>
                    ))}
                    <option value="Другое">Другое / Индивидуальный запрос</option>
                  </select>
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                    Телефон{!emailValue && ' *'}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    className="px-4 py-3 bg-white/60 border border-stone-200 text-stone-900 text-sm rounded-md focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors"
                    {...register('phone')}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                    Email{!phoneValue && ' *'}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="alexandra@example.com"
                    className="px-4 py-3 bg-white/60 border border-stone-200 text-stone-900 text-sm rounded-md focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors"
                    {...register('email')}
                  />
                </div>

                {/* Messenger */}
                <div className="flex flex-col space-y-2 sm:col-span-2">
                  <label htmlFor="messenger" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                    Telegram / WhatsApp
                  </label>
                  <input
                    id="messenger"
                    type="text"
                    placeholder="например: Telegram @sandra_m"
                    className="px-4 py-3 bg-white/60 border border-stone-200 text-stone-900 text-sm rounded-md focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors"
                    {...register('messenger')}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-2 sm:col-span-2">
                  <label htmlFor="message" className="text-[10px] font-sans tracking-widest uppercase text-stone-600 font-medium">
                    Сообщение (Опишите ваши ожидания)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Здравствуйте! Хочу поработать над позиционированием, провести ревизию гардероба..."
                    className="px-4 py-3 bg-white/60 border border-stone-200 text-stone-900 text-sm rounded-md focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-colors resize-none"
                    {...register('message')}
                  />
                </div>
              </div>

              {/* Consent check */}
              <div className="flex items-start space-x-3">
                <input
                  id="consent"
                  type="checkbox"
                  className="w-4 h-4 rounded border-stone-300 text-[var(--accent-color)] focus:ring-[var(--accent-color)] mt-1 cursor-pointer"
                  {...register('consent', { required: true })}
                />
                <label htmlFor="consent" className="text-xs text-stone-500 font-sans font-light leading-relaxed cursor-pointer select-none">
                  Я даю свое согласие на обработку персональных данных в соответствии с{' '}
                  <a href="#" className="underline text-stone-700 hover:text-[var(--accent-color)] transition-colors">
                    Политикой конфиденциальности
                  </a>{' '}
                  и{' '}
                  <a href="#" className="underline text-stone-700 hover:text-[var(--accent-color)] transition-colors">
                    Согласием на обработку данных
                  </a>
                  . *
                </label>
              </div>
              {errors.consent && (
                <p className="text-xs text-red-500 font-sans font-light mt-1">
                  Необходимо подтвердить согласие для отправки формы
                </p>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-5 text-[11px] font-medium tracking-widest uppercase rounded-full"
                >
                  {loading ? 'Отправка заявки...' : 'Отправить заявку'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
};
export default LeadFormSection;
