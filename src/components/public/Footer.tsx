import React from 'react';
import { SiteSettings, NavigationItem } from '../../types.js';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  navigation: NavigationItem[];
}

export const Footer: React.FC<FooterProps> = ({ settings, navigation }) => {
  const activeNavs = navigation.filter(n => n.is_active);

  return (
    <footer className="bg-[#1A1A1A] text-stone-300 pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
        {/* Brand Block */}
        <div className="space-y-6">
          <a href="/" className="flex flex-col items-start">
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-[0.15em] text-white uppercase">
              {settings.logo_text || 'ПРОЕКТ Я'}
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] text-[var(--accent-color)] uppercase mt-0.5">
              архитектор личности
            </span>
          </a>
          <p className="text-stone-400 font-sans font-light text-sm leading-relaxed max-w-xs">
            Премиальное пространство раскрытия вашей аутентичности, стиля и внутреннего кода личности.
          </p>
          {/* Social Icons */}
          <div className="flex items-center space-x-4 pt-2">
            {settings.telegram_url && (
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-[var(--accent-color)] transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </a>
            )}
            {settings.whatsapp_url && (
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-[var(--accent-color)] transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            {settings.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-slate-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-[var(--accent-color)] transition-all duration-300"
                title="Messenger Max"
              >
                <span className="text-xs font-semibold">MAX</span>
              </a>
            )}
            {settings.vk_url && (
              <a
                href={settings.vk_url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-slate-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-[var(--accent-color)] transition-all duration-300"
              >
                <span className="text-xs font-semibold">VK</span>
              </a>
            )}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-6">
          <h4 className="font-heading text-sm font-semibold text-white tracking-widest uppercase">
            Разделы
          </h4>
          <ul className="space-y-3">
            {activeNavs.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="text-stone-400 hover:text-[var(--accent-color)] text-sm font-light transition-all duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts Quick Block */}
        <div className="space-y-6">
          <h4 className="font-heading text-sm font-semibold text-white tracking-widest uppercase">
            Контакты
          </h4>
          <ul className="space-y-4">
            {settings.phone && (
              <li className="flex items-start space-x-3 text-sm font-light text-stone-400">
                <Phone className="w-4 h-4 text-[var(--accent-color)] mt-0.5 flex-shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li className="flex items-start space-x-3 text-sm font-light text-stone-400">
                <Mail className="w-4 h-4 text-[var(--accent-color)] mt-0.5 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.city && (
              <li className="flex items-start space-x-3 text-sm font-light text-stone-400">
                <MapPin className="w-4 h-4 text-[var(--accent-color)] mt-0.5 flex-shrink-0" />
                <span>
                  {settings.city}
                  {settings.address && `, ${settings.address}`}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Legal and Privacy Link */}
        <div className="space-y-6">
          <h4 className="font-heading text-sm font-semibold text-white tracking-widest uppercase">
            Инфо
          </h4>
          <p className="text-stone-400 font-light text-xs leading-relaxed">
            Индивидуальный предприниматель Хисамутдинова З. Х.<br />
            ИНН: 771234567890<br />
            ОГРНИП: 326770000123456
          </p>
          <div className="flex flex-col space-y-2 pt-2">
            <a
              href={settings.privacy_policy_url || '#'}
              className="text-stone-500 hover:text-stone-300 text-xs font-light transition-colors"
            >
              Политика конфиденциальности
            </a>
            <a
              href={settings.personal_data_url || '#'}
              className="text-stone-500 hover:text-stone-300 text-xs font-light transition-colors"
            >
              Согласие на обработку перс. данных
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-stone-500">
        <p>{settings.copyright_text || '© 2026 Проект Я. Все права защищены.'}</p>
        <p className="font-mono text-[9px] tracking-wider uppercase">
          Crafted for Premium Personal Branding
        </p>
      </div>
    </footer>
  );
};
export default Footer;
