import React, { useState } from 'react';
import { useRouter } from '../../lib/use-router.js';
import { SiteSettings, NavigationItem } from '../../types.js';
import { Menu, X, ArrowRight } from 'lucide-react';
import Button from '../ui/Button.js';

interface HeaderProps {
  settings: SiteSettings;
  navigation: NavigationItem[];
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ settings, navigation, currentPath }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigate } = useRouter();

  const activeNavs = navigation.filter(n => n.is_active);

  const isActive = (url: string) => {
    if (url.startsWith('#')) {
      return currentPath === '/' || currentPath === '';
    }
    return currentPath === url;
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-color)]/95 backdrop-blur-md border-b border-stone-200/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 select-none group">
          <div className="w-8 h-8 border border-[var(--primary-color)] flex items-center justify-center rounded-full transition-colors group-hover:bg-[var(--primary-color)] group-hover:text-[var(--bg-color)]">
            <span className="font-heading text-xs font-bold">Я</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm font-semibold tracking-[0.15em] text-[var(--primary-color)] uppercase">
              {settings.logo_text || 'ПРОЕКТ Я'}
            </span>
            <span className="font-sans text-[8px] tracking-[0.25em] text-[var(--accent-color)] uppercase font-medium mt-0.5">
              архитектор личности
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {activeNavs.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className={`text-[10px] uppercase tracking-widest font-medium transition-all duration-300 relative py-2 ${
                isActive(item.url)
                  ? 'text-[var(--primary-color)] border-b border-[var(--primary-color)] font-semibold'
                  : 'text-stone-500 hover:text-[var(--primary-color)]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="outline"
            className="px-5 py-2.5 !text-xs tracking-widest"
            onClick={() => navigate('#lead-form')}
          >
            Связаться
          </Button>
          {/* Admin Fast Entry link */}
          <a
            href="/admin"
            className="font-mono text-[10px] tracking-wider text-stone-400 hover:text-amber-800 transition-colors"
          >
            Админ
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-stone-600 hover:text-stone-950 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[var(--bg-color)] border-b border-stone-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="px-6 py-8 space-y-6 flex flex-col">
            {activeNavs.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs uppercase tracking-widest font-medium py-2 border-b border-stone-100 ${
                  isActive(item.url) ? 'text-[var(--accent-color)] font-bold' : 'text-stone-600'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-4">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('#lead-form');
                }}
              >
                Оставить заявку <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center font-mono text-[10px] tracking-wider text-stone-400 hover:text-[var(--accent-color)] py-2"
              >
                Панель управления (Админ)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
