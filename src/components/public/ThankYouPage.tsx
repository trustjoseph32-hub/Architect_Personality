import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import Container from '../ui/Container.js';
import Button from '../ui/Button.js';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export const ThankYouPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="py-24 sm:py-36 bg-[#FAF8F5] min-h-[70vh] flex items-center">
      <Container className="text-center">
        <div className="max-w-xl mx-auto space-y-8 flex flex-col items-center">
          {/* Elegant anim check */}
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 tracking-tight leading-tight font-heading">
              Спасибо за доверие!
            </h1>
            <p className="text-stone-500 font-light text-base sm:text-lg leading-relaxed">
              Ваша заявка успешно отправлена в систему. Мы внимательно ознакомимся с вашим запросом и свяжемся с вами в течение ближайших 2 часов.
            </p>
          </div>

          <div className="pt-4 w-full sm:w-auto">
            <Button
              variant="primary"
              className="px-10 py-4 text-xs font-semibold tracking-widest uppercase w-full sm:w-auto"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Вернуться на главную
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ThankYouPage;
