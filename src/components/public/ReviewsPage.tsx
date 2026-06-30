import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { Review } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Card from '../ui/Card.js';
import Button from '../ui/Button.js';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReviewsPageProps {
  reviews: Review[];
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ reviews }) => {
  const { navigate } = useRouter();

  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F5]">
      <Container>
        <SectionTitle
          eyebrow="ОТЗЫВЫ КЛИЕНТОВ"
          title="Истории трансформации"
          subtitle="Мы гордимся успехами и качественными изменениями в жизни наших выпускников. Почитайте их честные отзывы о совместной работе с проектом."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mt-12">
          {reviews.map((rev) => (
            <Card key={rev.id} className="p-8 sm:p-10 border border-stone-200 bg-white flex flex-col justify-between space-y-8 relative group">
              {/* Decorative quotation vector mark */}
              <Quote className="absolute right-8 top-8 w-12 h-12 text-amber-500/10 pointer-events-none group-hover:text-amber-500/20 transition-colors" />

              <div className="space-y-6">
                {/* Result highlight banner */}
                {rev.result_text && (
                  <div className="flex gap-2.5 items-start bg-amber-500/5 border border-amber-800/10 px-4 py-3 rounded-lg text-amber-900 text-xs font-light leading-relaxed">
                    <Sparkles className="w-4 h-4 text-amber-800 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Результат:</strong> {rev.result_text}
                    </span>
                  </div>
                )}

                {/* Review actual quote text */}
                <p className="text-stone-600 font-light text-sm sm:text-base leading-relaxed italic">
                  «{rev.review_text}»
                </p>
              </div>

              {/* Author details block */}
              <div className="pt-6 border-t border-stone-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={rev.client_photo_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800'}
                      alt={rev.client_name}
                      className="w-full h-full object-cover grayscale-[20%]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 font-heading">
                      {rev.client_name}
                    </h4>
                    <span className="font-mono text-[9px] tracking-wider text-stone-400 block uppercase">
                      {rev.client_role}
                    </span>
                  </div>
                </div>

                {rev.review_date && (
                  <span className="font-mono text-[9px] text-stone-400 tracking-wider">
                    {rev.review_date}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Final call to action */}
        <div className="text-center space-y-6 mt-20">
          <h3 className="font-heading text-2xl sm:text-3xl font-medium text-slate-900">
            Хотите стать героем следующей истории?
          </h3>
          <p className="text-stone-500 font-light text-base leading-relaxed max-w-lg mx-auto">
            Оставьте свои контакты, и мы подберем для вас оптимальную программу сопровождения.
          </p>
          <Button
            variant="primary"
            className="px-10 py-4 text-xs font-semibold tracking-widest uppercase"
            onClick={() => navigate('/#lead-form')}
          >
            Оставить заявку
          </Button>
        </div>
      </Container>
    </div>
  );
};
export default ReviewsPage;
