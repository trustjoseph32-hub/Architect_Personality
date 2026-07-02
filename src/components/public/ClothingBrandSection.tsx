import React from 'react';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Shirt, Sparkles, MoveRight, Layers, Eye } from 'lucide-react';

export default function ClothingBrandSection() {
  const galleryItems = [
    {
      title: 'Капсула «Эфир»',
      category: 'Натуральный лен и дикий шелк',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Жакет «Опора»',
      category: 'Архитектурный крой, тонкая шерсть',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Трикотаж «Я»',
      category: 'Органический хлопок и кашемир',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Брюки «Силуэт»',
      category: 'Идеальная посадка, умягченный конопляный лен',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
    }
  ];

  return (
    <section id="clothing-brand-section" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-50 rounded-full filter blur-3xl opacity-50 -translate-y-1/2 -translate-x-12" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          {/* Text block & Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs tracking-[0.25em] text-amber-800 uppercase font-semibold flex items-center gap-2">
                <Shirt className="w-4 h-4" /> ЛИНЕЙКА ОДЕЖДЫ «Я»
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight font-heading leading-tight">
                Одежда как Невербальный Язык Личности
              </h2>
            </div>
            
            <div className="w-12 h-[1px] bg-amber-800/40" />
            
            <div className="space-y-4 text-stone-500 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Мы убеждены, что одежда — это не просто прикрытие тела или дань мимолетным трендам. Это мощнейшая форма визуального манифеста, продолжение вашей внутренней архитектуры, характера и ценностей.
              </p>
              <p>
                Линейка одежды проекта «Я» разработана Земфирой Хисамутдиновой как капсульный гардероб-конструктор. Лаконичные вещи, натуральные ткани, чистые оттенки земли, совершенный крой и ручная обработка швов. Каждая вещь создана, чтобы транслировать вашу глубину, статус и уверенность без лишних слов.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                className="px-6 py-3 text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2"
                onClick={() => {
                  const formEl = document.getElementById('lead-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Заказать консультацию стилиста
              </Button>
            </div>
          </div>

          {/* Gallery grid - Desktop/Mobile */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {galleryItems.map((item, idx) => (
                <Card 
                  key={idx}
                  className="group bg-[#FAF8F5] border border-stone-100 overflow-hidden rounded-2xl flex flex-col relative"
                >
                  <div className="h-72 w-full overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-amber-900 shadow-md">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-1">
                    <span className="font-mono text-[10px] tracking-widest text-amber-800 uppercase font-semibold">
                      {item.category}
                    </span>
                    <h4 className="font-heading text-lg font-medium text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
