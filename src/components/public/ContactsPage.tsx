import React from 'react';
import { SiteSettings, Direction } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import LeadFormSection from './LeadFormSection.js';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

interface ContactsPageProps {
  settings: SiteSettings;
  directions: Direction[];
}

export const ContactsPage: React.FC<ContactsPageProps> = ({ settings, directions }) => {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Contact Details Segment */}
      <section className="py-16 sm:py-24 border-b border-stone-100">
        <Container>
          <SectionTitle
            eyebrow="КОНТАКТЫ"
            title="Остаемся на связи"
            subtitle="Свяжитесь с нами удобным для вас способом. Мы всегда рады проконсультировать вас по любым вопросам."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12 max-w-5xl mx-auto">
            {/* Phone */}
            {settings.phone && (
              <div className="bg-white border border-stone-200 p-8 rounded-[1.5rem] space-y-4 shadow-sm text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-heading text-lg font-medium text-slate-900">Телефон</h4>
                <p className="text-stone-500 font-light text-sm">Звоните по любым вопросам:</p>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="font-medium text-slate-800 hover:text-amber-800 transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
            )}

            {/* Email */}
            {settings.email && (
              <div className="bg-white border border-stone-200 p-8 rounded-[1.5rem] space-y-4 shadow-sm text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-heading text-lg font-medium text-slate-900">Email</h4>
                <p className="text-stone-500 font-light text-sm">Пишите нам на почту:</p>
                <a
                  href={`mailto:${settings.email}`}
                  className="font-medium text-slate-800 hover:text-amber-800 transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            )}

            {/* Office */}
            {settings.city && (
              <div className="bg-white border border-stone-200 p-8 rounded-[1.5rem] space-y-4 shadow-sm text-center flex flex-col items-center md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-heading text-lg font-medium text-slate-900">Локация</h4>
                <p className="text-stone-500 font-light text-sm">Наш главный офис / студия:</p>
                <p className="font-medium text-slate-800 leading-relaxed text-sm">
                  {settings.city}
                  {settings.address && `, ${settings.address}`}
                </p>
              </div>
            )}
          </div>

          {/* Social connections block */}
          <div className="max-w-2xl mx-auto mt-16 p-8 border border-stone-200 rounded-[2rem] bg-stone-50/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-heading text-lg font-semibold text-slate-900">Мессенджеры и социальные сети</h4>
              <p className="text-stone-500 text-xs font-light">Следите за анонсами и пишите нам напрямую в чат</p>
            </div>
            <div className="flex items-center gap-4">
              {settings.telegram_url && (
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#FAF8F5] border border-stone-200 text-slate-800 text-xs font-mono tracking-widest uppercase rounded-md inline-flex items-center hover:border-amber-800 hover:text-amber-800 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 mr-2 text-amber-800" /> Telegram
                </a>
              )}
              {settings.whatsapp_url && (
                <a
                  href={settings.whatsapp_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#FAF8F5] border border-stone-200 text-slate-800 text-xs font-mono tracking-widest uppercase rounded-md inline-flex items-center hover:border-amber-800 hover:text-amber-800 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-2 text-amber-800" /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Embedded lead form section */}
      <LeadFormSection directions={directions} />
    </div>
  );
};
export default ContactsPage;
