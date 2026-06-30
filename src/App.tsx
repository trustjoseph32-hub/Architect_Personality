import React, { useState, useEffect } from 'react';
import { useRouter } from './lib/use-router';
import { api } from './lib/api-client';
import { 
  SiteSettings, NavigationItem, PageSection, Direction, 
  Service, TeamMember, Founder, Review, DesignSettings, SeoPage 
} from './types';

// UI components
import Loader from './components/ui/Loader';
import Container from './components/ui/Container';
import Card from './components/ui/Card';
import Button from './components/ui/Button';

// Public sections
import Header from './components/public/Header';
import Footer from './components/public/Footer';
import HeroSection from './components/public/HeroSection';
import PhilosophySection from './components/public/PhilosophySection';
import AboutSection from './components/public/AboutSection';
import LeadFormSection from './components/public/LeadFormSection';

// Public pages
import AboutPage from './components/public/AboutPage';
import DirectionsPage from './components/public/DirectionsPage';
import DirectionDetailPage from './components/public/DirectionDetailPage';
import ServiceDetailPage from './components/public/ServiceDetailPage';
import TeamPage from './components/public/TeamPage';
import FounderPage from './components/public/FounderPage';
import ReviewsPage from './components/public/ReviewsPage';
import ContactsPage from './components/public/ContactsPage';
import ThankYouPage from './components/public/ThankYouPage';

// Admin views
import AdminLoginForm from './components/admin/AdminLoginForm';
import AdminDashboard from './components/admin/AdminDashboard';

// Lucide Icons
import { Sparkles, Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function App() {
  const { currentPath, navigate } = useRouter();
  
  // App state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [founder, setFounder] = useState<Founder | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [designSettings, setDesignSettings] = useState<DesignSettings | null>(null);

  // Initialize and load public configurations
  const initApp = async () => {
    try {
      setLoading(true);
      setError('');
      
      const pub = await api.getPublicData();
      
      setSettings(pub.settings);
      setNavigation(pub.navigation_items);
      setSections(pub.page_sections);
      setDirections(pub.directions);
      setServices(pub.services);
      setTeam(pub.team_members);
      setFounder(pub.founder);
      setReviews(pub.reviews);
      setDesignSettings(pub.design_settings);

      // Inject active Design settings dynamically into CSS variables
      const ds = pub.design_settings;
      if (ds) {
        document.documentElement.style.setProperty('--primary-color', ds.primary_color);
        document.documentElement.style.setProperty('--accent-color', ds.accent_color);
        document.documentElement.style.setProperty('--bg-color', ds.background_color);
        document.documentElement.style.setProperty('--text-color', ds.text_color);
        document.documentElement.style.setProperty('--border-radius', ds.border_radius);
        
        // Font pairings injection
        if (ds.heading_font) {
          document.documentElement.style.setProperty('--font-heading', `"${ds.heading_font}", serif`);
        }
        if (ds.body_font) {
          document.documentElement.style.setProperty('--font-body', `"${ds.body_font}", sans-serif`);
          document.documentElement.style.setProperty('--font-mono', `"${ds.body_font}", sans-serif`);
        }
      }

    } catch (err: any) {
      console.error('App init failed', err);
      setError(err.message || 'Ошибка подключения к серверу. Попробуйте обновить страницу.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initApp();
  }, [currentPath]);

  // Synchronize browser tab titles / SEO tags
  useEffect(() => {
    if (!settings) return;

    // Default SEO tags
    let pageTitle = settings.site_name || 'Проект Я';
    let pageDesc = 'Премиальное пространство раскрытия вашей аутентичности и внутреннего кода личности.';

    // Dynamic title depending on active client route
    if (currentPath === '/about') {
      pageTitle = `История и миссия — ${settings.site_name}`;
    } else if (currentPath === '/directions') {
      pageTitle = `Векторы саморазвития — ${settings.site_name}`;
    } else if (currentPath.startsWith('/directions/')) {
      const slug = currentPath.split('/').pop();
      const dir = directions.find(d => d.slug === slug);
      if (dir) pageTitle = `${dir.title} — ${settings.site_name}`;
    } else if (currentPath.startsWith('/services/')) {
      const slug = currentPath.split('/').pop();
      const srv = services.find(s => s.slug === slug);
      if (srv) pageTitle = `${srv.title} — ${settings.site_name}`;
    } else if (currentPath === '/team') {
      pageTitle = `Команда экспертов — ${settings.site_name}`;
    } else if (currentPath === '/founder') {
      pageTitle = `Земфира Хисамутдинова, основатель — ${settings.site_name}`;
    } else if (currentPath === '/reviews') {
      pageTitle = `Отзывы и истории — ${settings.site_name}`;
    } else if (currentPath === '/contacts') {
      pageTitle = `Контакты и запись — ${settings.site_name}`;
    } else if (currentPath === '/thank-you') {
      pageTitle = `Успешная регистрация — ${settings.site_name}`;
    } else if (currentPath.startsWith('/admin')) {
      pageTitle = `Панель управления — ${settings.site_name}`;
    }

    document.title = pageTitle;

    // Sync meta descriptions
    const metaEl = document.querySelector('meta[name="description"]');
    if (metaEl) metaEl.setAttribute('content', pageDesc);

  }, [currentPath, settings, directions, services]);

  if (loading) {
    return <Loader fullScreen message="Загрузка премиум пространства..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-8">
        <Card className="p-8 max-w-md text-center space-y-6 border border-stone-200">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mx-auto font-bold text-lg">!</div>
          <h2 className="font-heading text-xl font-bold">Упс, что-то пошло не так</h2>
          <p className="text-stone-500 font-light text-sm">{error}</p>
          <Button variant="primary" className="w-full" onClick={initApp}>Повторить попытку</Button>
        </Card>
      </div>
    );
  }

  // --- ADMIN PORTAL INTERCEPT ---
  if (currentPath === '/admin/login') {
    return <AdminLoginForm />;
  }
  if (currentPath.startsWith('/admin')) {
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) {
      // Redirect to login
      setTimeout(() => navigate('/admin/login'), 50);
      return <Loader fullScreen message="Перенаправление..." />;
    }
    return <AdminDashboard />;
  }

  // --- PUBLIC CLIENT LAYOUTS & PAGE COMPILATION ---
  const renderPublicPage = () => {
    switch (currentPath) {
      // Home page longrid
      case '/':
      case '':
        return (
          <>
            {/* Hero Block */}
            {sections.find(s => s.section_key === 'hero') && (
              <HeroSection 
                section={sections.find(s => s.section_key === 'hero')!} 
                buttonStyle={designSettings?.button_style}
              />
            )}

            {/* Philosophy Principles Block */}
            {sections.find(s => s.section_key === 'philosophy') && (
              <PhilosophySection 
                section={sections.find(s => s.section_key === 'philosophy')!} 
                buttonStyle={designSettings?.button_style}
              />
            )}

            {/* General About Segment */}
            {sections.find(s => s.section_key === 'about') && (
              <AboutSection 
                section={sections.find(s => s.section_key === 'about')!} 
                buttonStyle={designSettings?.button_style}
              />
            )}

            {/* Custom Interactive Services & Programs Block */}
            <section id="services" className="py-24 sm:py-32 bg-[#FAF8F5]">
              <Container>
                <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto space-y-4">
                  <span className="font-mono text-xs tracking-[0.25em] text-amber-800 uppercase font-semibold">ПРОГРАММЫ И КУРСЫ</span>
                  <h2 className="text-3xl sm:text-4xl font-medium text-slate-900 tracking-tight font-heading">Программы Сопровождения</h2>
                  <p className="text-stone-500 font-light text-sm sm:text-base leading-relaxed">
                    Авторские синергетические продукты Земфиры Хисамутдиновой для глубокой проработки психологической зрелости и невербального стиля.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {services.map((srv) => (
                    <Card
                      key={srv.id}
                      className="flex flex-col bg-white border border-stone-200 group cursor-pointer"
                      onClick={() => navigate(`/services/${srv.slug}`)}
                    >
                      <div className="h-64 sm:h-80 w-full overflow-hidden relative">
                        <img
                          src={srv.image_url || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'}
                          alt={srv.title}
                          className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {srv.duration}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {srv.format}</span>
                          </div>
                          <h3 className="font-heading text-xl sm:text-2xl font-medium text-slate-900 leading-tight">
                            {srv.title}
                          </h3>
                          <p className="text-sm text-stone-500 font-light leading-relaxed line-clamp-2">
                            {srv.short_description}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-stone-50 flex items-center justify-between">
                          <span className="font-heading font-semibold text-slate-950 text-base">{srv.price}</span>
                          <span className="text-xs font-mono tracking-widest text-amber-800 uppercase font-bold flex items-center gap-1.5">
                            Подробнее <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Container>
            </section>

            {/* Inbound Client leads form capture */}
            <LeadFormSection directions={directions} />
          </>
        );

      case '/about':
        return <AboutPage settings={settings!} sections={sections} />;

      case '/directions':
        return <DirectionsPage directions={directions} />;

      case '/team':
        return <TeamPage team={team} />;

      case '/founder':
        return <FounderPage founder={founder!} />;

      case '/reviews':
        return <ReviewsPage reviews={reviews} />;

      case '/contacts':
        return <ContactsPage settings={settings!} directions={directions} />;

      case '/thank-you':
        return <ThankYouPage />;

      default:
        // Handle Directions Slug Match
        if (currentPath.startsWith('/directions/')) {
          const slug = currentPath.split('/').pop();
          const dir = directions.find(d => d.slug === slug);
          return <DirectionDetailPage direction={dir!} />;
        }
        // Handle Services Slug Match
        if (currentPath.startsWith('/services/')) {
          const slug = currentPath.split('/').pop();
          const srv = services.find(s => s.slug === slug);
          return <ServiceDetailPage service={srv!} />;
        }

        // 404 Fallback page
        return (
          <div className="py-24 text-center bg-[#FAF8F5] min-h-[50vh] flex items-center justify-center">
            <Container className="space-y-6">
              <span className="text-6xl font-bold font-heading text-stone-200">404</span>
              <h2 className="font-heading text-2xl font-bold text-slate-900">Страница не найдена</h2>
              <p className="text-stone-500 font-light text-sm max-w-sm mx-auto">
                Запрошенный адрес не существует или был временно перемещен.
              </p>
              <Button variant="primary" onClick={() => navigate('/')} className="px-8 py-3 text-xs tracking-wider font-semibold uppercase">
                Вернуться на главную
              </Button>
            </Container>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col justify-between selection:bg-amber-800/10 selection:text-amber-900">
      
      {/* HEADER NAVBAR */}
      <Header settings={settings!} navigation={navigation} currentPath={currentPath} />

      {/* CORE RENDERED PAGE CONTENT */}
      <div className="flex-grow animate-in fade-in duration-500">
        {renderPublicPage()}
      </div>

      {/* FOOTER SECTION */}
      <Footer settings={settings!} navigation={navigation} />

    </div>
  );
}
