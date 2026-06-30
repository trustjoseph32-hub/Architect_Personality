import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { Direction } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Card from '../ui/Card.js';
import Button from '../ui/Button.js';
import { Compass, Sparkles, UserCheck, Eye, ArrowRight } from 'lucide-react';

interface DirectionsPageProps {
  directions: Direction[];
}

export const DirectionsPage: React.FC<DirectionsPageProps> = ({ directions }) => {
  const { navigate } = useRouter();

  // Helper to map icon string to icon component
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-amber-800' };
    if (iconName === 'Compass') return <Compass {...props} />;
    if (iconName === 'Sparkles') return <Sparkles {...props} />;
    if (iconName === 'UserCheck') return <UserCheck {...props} />;
    return <Eye {...props} />;
  };

  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F5]">
      <Container>
        <SectionTitle
          eyebrow="НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ"
          title="Векторы саморазвития"
          subtitle="Наш проект предлагает три ключевых направления, помогающих сгармонизировать ваш внутренний потенциал, психологические опоры и внешний стиль."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12">
          {directions.map((dir) => (
            <Card
              key={dir.id}
              className="flex flex-col h-full bg-white group cursor-pointer"
              onClick={() => navigate(`/directions/${dir.slug}`)}
            >
              {/* Image thumbnail block */}
              <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                <img
                  src={dir.image_url || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'}
                  alt={dir.title}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Float Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center">
                  {renderIcon(dir.icon)}
                </div>
              </div>

              {/* Text content card body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-slate-900 leading-tight">
                    {dir.title}
                  </h3>
                  <p className="text-sm text-stone-500 font-light leading-relaxed">
                    {dir.short_description}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-50 mt-6 flex items-center text-xs font-mono tracking-widest text-amber-800 uppercase font-semibold group-hover:text-amber-700 transition-colors">
                  Подробнее <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default DirectionsPage;
