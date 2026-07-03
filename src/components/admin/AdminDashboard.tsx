import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/use-router.js';
import { api } from '../../lib/api-client.js';
import { DatabaseSchema, SiteSettings, NavigationItem, PageSection, Direction, DirectionBranch, DevelopmentArea, Service, TeamMember, Founder, Review, Lead, SeoPage, DesignSettings, LeadStatus, ButtonStyleType } from '../../types.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';
import Loader from '../ui/Loader.js';
import { 
  LayoutDashboard, Settings, Menu, Columns, Compass, Sparkles, 
  Users, User, MessageSquare, Inbox, Image, Globe, Palette, 
  LogOut, Plus, Trash2, Edit2, Check, X, ArrowUpRight, Copy, Upload 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'menu' | 'sections' | 'directions' | 'development_areas' | 'services' | 'team' | 'founder' | 'reviews' | 'leads' | 'media' | 'seo' | 'design'>('dashboard');
  
  // App state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Loaded database entities
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [branches, setBranches] = useState<DirectionBranch[]>([]);
  const [developmentAreas, setDevelopmentAreas] = useState<DevelopmentArea[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [founder, setFounder] = useState<Founder | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [seoPages, setSeoPages] = useState<SeoPage[]>([]);
  const [designSettings, setDesignSettings] = useState<DesignSettings | null>(null);
  const [mediaFiles, setMediaFiles] = useState<Array<{ name: string; url: string; size: string; uploaded_at: string }>>([]);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);

  // Editor states (for CRUD models)
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingBranch, setEditingBranch] = useState<DirectionBranch | null>(null);
  const [isAddingNewBranch, setIsAddingNewBranch] = useState(false);

  // Load everything
  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      
      // Verify token
      const auth = await api.verifyAdminToken();
      if (!auth.valid) {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
        return;
      }

      const pub = await api.getPublicData();
      setSettings(pub.settings);
      setNavigation(pub.navigation_items);
      setSections(pub.page_sections);
      setDirections(pub.directions);
      setDevelopmentAreas(pub.development_areas || []);
      setServices(pub.services);
      setTeam(pub.team_members);
      setFounder(pub.founder);
      setReviews(pub.reviews);
      setDesignSettings(pub.design_settings);

      // Fetch admin-only resources
      const leadsList = await api.getLeads();
      setLeads(leadsList);

      const mediaList = await api.getMediaFiles();
      setMediaFiles(mediaList);

      const branchesList = await api.getDirectionBranches();
      setBranches(branchesList);

      const seoList = await api.getSeoPages();
      setSeoPages(seoList);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ошибка загрузки данных панели. Возможно, требуется повторная авторизация.');
      if (err.message?.includes('401') || err.message?.includes('права')) {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Standard success/error message flasher
  const flashSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };
  const flashError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  // --- IMAGE UPLOAD HELPER ---
  const [uploadLoading, setUploadLoading] = useState(false);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onComplete: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const res = await api.uploadMedia(file.name, base64String);
        onComplete(res.url);
        // Reload media gallery
        const list = await api.getMediaFiles();
        setMediaFiles(list);
        flashSuccess('Изображение успешно загружено');
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      flashError(err.message || 'Не удалось загрузить файл');
    } finally {
      setUploadLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen message="Загрузка панели управления..." />;
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col lg:flex-row font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-full lg:w-64 bg-slate-900 text-stone-300 flex flex-col justify-between p-6 lg:fixed lg:top-0 lg:bottom-0 lg:left-0 z-30">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex flex-col border-b border-slate-800 pb-5">
            <span className="font-heading text-lg font-bold text-white tracking-widest uppercase">
              {settings?.logo_text || 'ПРОЕКТ Я'}
            </span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-amber-500 uppercase mt-0.5">
              архитектор личности • админ
            </span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'leads', label: 'Заявки', icon: Inbox, badge: leads.filter(l => l.status === 'new').length },
              { id: 'settings', label: 'Настройки сайта', icon: Settings },
              { id: 'menu', label: 'Меню', icon: Menu },
              { id: 'sections', label: 'Секции главной', icon: Columns },
              { id: 'directions', label: 'Направления', icon: Compass },
              { id: 'development_areas', label: 'Сферы 360°', icon: Sparkles },
              { id: 'services', label: 'Услуги', icon: Sparkles },
              { id: 'team', label: 'Команда', icon: Users },
              { id: 'founder', label: 'Основатель', icon: User },
              { id: 'reviews', label: 'Отзывы', icon: MessageSquare },
              { id: 'media', label: 'Медиафайлы', icon: Image },
              { id: 'seo', label: 'SEO', icon: Globe },
              { id: 'design', label: 'Дизайн', icon: Palette },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setEditingItem(null);
                    setIsAddingNew(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs tracking-wider uppercase font-medium rounded-md cursor-pointer transition-colors ${
                    isActive 
                      ? 'bg-amber-800 text-white font-semibold' 
                      : 'text-stone-400 hover:bg-slate-800 hover:text-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="bg-amber-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-sans font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Bottom Block */}
        <div className="pt-6 border-t border-slate-800 mt-6 lg:mt-0">
          <div className="text-stone-500 text-[10px] font-mono mb-4">
            Вход выполнен: admin
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase font-medium text-stone-400 hover:bg-slate-800 hover:text-white rounded-md cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-grow lg:pl-64 min-h-screen flex flex-col justify-between">
        
        {/* HEADER */}
        <header className="bg-white border-b border-stone-200 h-20 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-heading font-medium text-slate-900 tracking-tight capitalize">
              {activeTab === 'dashboard' ? 'Сводка по проекту' : activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-stone-500 hover:text-amber-800 text-xs font-mono tracking-wider flex items-center gap-1.5"
            >
              Перейти на сайт <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="p-6 sm:p-10 flex-grow max-w-6xl w-full mx-auto">
          
          {/* Global Alert Notification bars */}
          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-lg text-xs tracking-wide font-light flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" /> {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg text-xs tracking-wide font-light flex items-center gap-2">
              <X className="w-4 h-4 text-red-600" /> {errorMsg}
            </div>
          )}

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stat Boxes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Новые заявки', count: leads.filter(l => l.status === 'new').length, subtitle: 'требуют разбора', color: 'bg-red-50 text-red-700 border-red-100' },
                  { title: 'Направления', count: directions.length, subtitle: 'опубликовано', color: 'bg-amber-50 text-amber-700 border-amber-100' },
                  { title: 'Программы/Услуги', count: services.length, subtitle: 'активно на сайте', color: 'bg-blue-50 text-blue-700 border-blue-100' },
                  { title: 'Отзывы клиентов', count: reviews.length, subtitle: 'истории успеха', color: 'bg-green-50 text-green-700 border-green-100' },
                ].map((stat, i) => (
                  <Card key={i} className={`p-6 border flex flex-col justify-between h-36 ${stat.color}`}>
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold opacity-75">{stat.title}</span>
                    <span className="text-4xl font-semibold font-heading">{stat.count}</span>
                    <span className="text-[10px] font-mono tracking-wide italic opacity-75">{stat.subtitle}</span>
                  </Card>
                ))}
              </div>

              {/* Fast Actions panel */}
              <div className="bg-white border border-stone-200 p-8 rounded-[1.5rem] space-y-6">
                <h3 className="font-heading text-lg font-medium text-slate-900 border-b border-stone-100 pb-3">
                  Быстрые действия
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button onClick={() => { setActiveTab('leads'); }} variant="primary" className="py-3 text-xs font-semibold tracking-wider">
                    Обработать заявки ({leads.filter(l => l.status === 'new').length})
                  </Button>
                  <Button onClick={() => { setActiveTab('sections'); }} variant="outline" className="py-3 text-xs font-semibold tracking-wider">
                    Редактировать главную
                  </Button>
                  <Button onClick={() => { setActiveTab('services'); setIsAddingNew(true); }} variant="outline" className="py-3 text-xs font-semibold tracking-wider">
                    Добавить новую программу
                  </Button>
                </div>
              </div>

              {/* Latest Leads Preview */}
              <div className="bg-white border border-stone-200 p-8 rounded-[1.5rem] space-y-4">
                <h3 className="font-heading text-lg font-medium text-slate-900 border-b border-stone-100 pb-3 flex items-center justify-between">
                  <span>Свежие заявки</span>
                  <button onClick={() => setActiveTab('leads')} className="text-xs text-amber-800 hover:underline font-mono uppercase tracking-wider">Все заявки</button>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-500">
                    <thead className="text-stone-700 uppercase font-mono tracking-wider border-b border-stone-100">
                      <tr>
                        <th className="py-3 px-2">Дата</th>
                        <th className="py-3 px-2">Имя</th>
                        <th className="py-3 px-2">Контакты</th>
                        <th className="py-3 px-2">Направление</th>
                        <th className="py-3 px-2">Статус</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {leads.slice(0, 4).map(l => (
                        <tr key={l.id}>
                          <td className="py-3 px-2">{new Date(l.created_at).toLocaleDateString()}</td>
                          <td className="py-3 px-2 font-medium text-stone-900">{l.name}</td>
                          <td className="py-3 px-2">{l.phone || l.email}</td>
                          <td className="py-3 px-2">{l.direction || 'Консультация'}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase ${
                              l.status === 'new' ? 'bg-red-100 text-red-800' :
                              l.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {l.status === 'new' ? 'Новая' : l.status === 'in_progress' ? 'В работе' : 'Закрыта'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS */}
          {activeTab === 'leads' && (
            <div className="bg-white border border-stone-200 p-8 sm:p-10 rounded-[1.5rem] space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-stone-500">
                  <thead className="text-stone-700 uppercase font-mono tracking-widest text-[10px] border-b border-stone-200">
                    <tr>
                      <th className="py-4 px-2">Дата</th>
                      <th className="py-4 px-2">Заявитель</th>
                      <th className="py-4 px-2">Направление</th>
                      <th className="py-4 px-2">Сообщение</th>
                      <th className="py-4 px-2">Статус</th>
                      <th className="py-4 px-2">Комментарий админа</th>
                      <th className="py-4 px-2 text-right">Действие</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {leads.map(l => (
                      <tr key={l.id} className="align-top">
                        <td className="py-4 px-2 font-light text-stone-400 whitespace-nowrap">
                          {new Date(l.created_at).toLocaleDateString()}<br />
                          {new Date(l.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-4 px-2 space-y-1">
                          <p className="font-semibold text-slate-900">{l.name}</p>
                          <p className="text-stone-400 text-xs">{l.phone}</p>
                          <p className="text-stone-400 text-xs">{l.email}</p>
                          {l.messenger && <p className="text-amber-800 text-[11px] font-mono">{l.messenger}</p>}
                        </td>
                        <td className="py-4 px-2 font-medium text-slate-800">{l.direction || 'Не выбрано'}</td>
                        <td className="py-4 px-2 max-w-xs truncate text-xs text-stone-400" title={l.message}>
                          {l.message || '—'}
                        </td>
                        <td className="py-4 px-2">
                          <select
                            value={l.status}
                            onChange={async (e) => {
                              try {
                                const updated = await api.updateLead(l.id, { status: e.target.value as LeadStatus });
                                setLeads(leads.map(x => x.id === l.id ? updated : x));
                                flashSuccess('Статус заявки обновлен');
                              } catch (err: any) {
                                flashError('Ошибка обновления статуса');
                              }
                            }}
                            className={`px-2 py-1 border text-xs rounded font-mono ${
                              l.status === 'new' ? 'border-red-300 text-red-700 bg-red-50' :
                              l.status === 'in_progress' ? 'border-amber-300 text-amber-700 bg-amber-50' :
                              'border-green-300 text-green-700 bg-green-50'
                            }`}
                          >
                            <option value="new">Новая</option>
                            <option value="in_progress">В работе</option>
                            <option value="closed">Закрыта</option>
                          </select>
                        </td>
                        <td className="py-4 px-2">
                          <input
                            type="text"
                            defaultValue={l.admin_comment || ''}
                            placeholder="Добавить комментарий..."
                            onBlur={async (e) => {
                              try {
                                const updated = await api.updateLead(l.id, { admin_comment: e.target.value });
                                setLeads(leads.map(x => x.id === l.id ? updated : x));
                                flashSuccess('Комментарий обновлен');
                              } catch (err: any) {
                                flashError('Ошибка обновления комментария');
                              }
                            }}
                            className="px-2 py-1 text-xs border border-stone-200 rounded w-full focus:outline-none focus:border-amber-700"
                          />
                        </td>
                        <td className="py-4 px-2 text-right">
                          <Button
                            variant="text"
                            onClick={() => setSelectedLeadForDetail(l)}
                            className="p-1"
                          >
                            Подробнее
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Lead Detail Modal */}
              {selectedLeadForDetail && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-[1.5rem] max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative border border-stone-100">
                    <button
                      onClick={() => setSelectedLeadForDetail(null)}
                      className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="space-y-1">
                      <span className="font-mono text-[10px] tracking-widest text-amber-800 uppercase font-bold">Детали заявки</span>
                      <h3 className="font-heading text-2xl font-medium text-slate-900 leading-tight">
                        {selectedLeadForDetail.name}
                      </h3>
                      <p className="text-stone-400 text-xs font-mono">
                        Поступила: {new Date(selectedLeadForDetail.created_at).toLocaleString('ru-RU')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block">Телефон</span>
                        <p className="text-stone-800 text-sm font-medium">{selectedLeadForDetail.phone || '—'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block">Email</span>
                        <p className="text-stone-800 text-sm font-medium">{selectedLeadForDetail.email || '—'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block">Ник в мессенджере</span>
                        <p className="text-stone-800 text-sm font-medium">{selectedLeadForDetail.messenger || '—'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block">Выбранное направление</span>
                        <p className="text-amber-900 text-sm font-semibold">{selectedLeadForDetail.direction || 'Консультация'}</p>
                      </div>
                    </div>

                    {/* Extended questionnaire data fields */}
                    <div className="bg-stone-50 p-5 rounded-xl space-y-4 border border-stone-200/60">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">Сферы развития 360° (выбранные в анкете):</span>
                        {selectedLeadForDetail.selected_areas && selectedLeadForDetail.selected_areas.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {selectedLeadForDetail.selected_areas.map((area, idx) => (
                              <span key={idx} className="bg-amber-100 text-amber-900 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                                {area}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-stone-500 text-xs italic">Сферы не выбраны или заявка создана по старой форме</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">Желаемые изменения в жизни:</span>
                        <p className="text-stone-800 text-xs sm:text-sm whitespace-pre-wrap font-light leading-relaxed">
                          {selectedLeadForDetail.desired_changes || 'Не заполнено'}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">Основное препятствие:</span>
                        <p className="text-stone-800 text-xs sm:text-sm whitespace-pre-wrap font-light leading-relaxed">
                          {selectedLeadForDetail.main_obstacle || 'Не заполнено'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block">Сообщение пользователя</span>
                      <div className="p-4 bg-stone-50 border border-stone-200/40 rounded-xl text-stone-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-light">
                        {selectedLeadForDetail.message || 'Нет сообщения'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end pt-4 border-t border-stone-100">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold block">Статус заявки</span>
                        <select
                          value={selectedLeadForDetail.status}
                          onChange={async (e) => {
                            try {
                              const updated = await api.updateLead(selectedLeadForDetail.id, { status: e.target.value as LeadStatus });
                              setLeads(leads.map(x => x.id === selectedLeadForDetail.id ? updated : x));
                              setSelectedLeadForDetail(updated);
                              flashSuccess('Статус заявки успешно обновлен');
                            } catch (err: any) {
                              flashError('Ошибка обновления статуса');
                            }
                          }}
                          className="px-3 py-2 border rounded-md w-full bg-white text-xs font-mono focus:outline-none"
                        >
                          <option value="new">Новая</option>
                          <option value="in_progress">В работе</option>
                          <option value="closed">Закрыта</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold block">Внутренний комментарий администратора</span>
                        <input
                          type="text"
                          defaultValue={selectedLeadForDetail.admin_comment || ''}
                          placeholder="Ваши пометки..."
                          onBlur={async (e) => {
                            try {
                              const updated = await api.updateLead(selectedLeadForDetail.id, { admin_comment: e.target.value });
                              setLeads(leads.map(x => x.id === selectedLeadForDetail.id ? updated : x));
                              setSelectedLeadForDetail(updated);
                              flashSuccess('Комментарий успешно сохранен');
                            } catch (err: any) {
                              flashError('Ошибка сохранения комментария');
                            }
                          }}
                          className="px-3 py-2 text-xs border border-stone-200 rounded-md w-full focus:outline-none focus:border-amber-700"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button onClick={() => setSelectedLeadForDetail(null)} variant="primary" className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider">
                        Закрыть окно
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && settings && (
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white">
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                try {
                  const data = new FormData(e.currentTarget);
                  const payload = Object.fromEntries(data.entries());
                  const res = await api.updateSettings(payload as any);
                  setSettings(res);
                  flashSuccess('Настройки сайта обновлены');
                } catch (err: any) {
                  flashError(err.message || 'Ошибка обновления');
                } finally {
                  setSaving(false);
                }
              }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Название сайта</label>
                    <input type="text" name="site_name" defaultValue={settings.site_name} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Логотип (Текст)</label>
                    <input type="text" name="logo_text" defaultValue={settings.logo_text} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Телефон</label>
                    <input type="text" name="phone" defaultValue={settings.phone} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Email</label>
                    <input type="text" name="email" defaultValue={settings.email} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Город</label>
                    <input type="text" name="city" defaultValue={settings.city} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Адрес (Офис)</label>
                    <input type="text" name="address" defaultValue={settings.address} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Telegram URL</label>
                    <input type="text" name="telegram_url" defaultValue={settings.telegram_url} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">WhatsApp URL</label>
                    <input type="text" name="whatsapp_url" defaultValue={settings.whatsapp_url} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Мессенджер Max URL</label>
                    <input type="text" name="instagram_url" defaultValue={settings.instagram_url} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">VK URL</label>
                    <input type="text" name="vk_url" defaultValue={settings.vk_url} className="px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Текст Копирайта (Footer)</label>
                    <input type="text" name="copyright_text" defaultValue={settings.copyright_text} className="px-3 py-2 border rounded-md w-full" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" disabled={saving} className="px-8 py-3.5 font-semibold text-xs tracking-widest uppercase">
                    {saving ? 'Сохранение...' : 'Сохранить настройки'}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* TAB 4: MENU */}
          {activeTab === 'menu' && (
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-stone-400 block uppercase tracking-wider font-semibold">УПРАВЛЕНИЕ НАВИГАЦИЕЙ В ШАПКЕ И ПОДВАЛЕ</span>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
                  {navigation.map((item, index) => (
                    <div key={item.id} className="p-4 flex items-center justify-between gap-4 bg-stone-50/50 hover:bg-stone-50">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-stone-400 font-bold">0{index + 1}</span>
                        <div>
                          <p className="font-heading font-medium text-slate-900">{item.label}</p>
                          <p className="text-stone-400 text-xs font-mono">{item.url} ({item.type})</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="inline-flex items-center cursor-pointer select-none">
                          <input
                            type="checkbox"
                            defaultChecked={item.is_active}
                            onChange={async (e) => {
                              const updated = navigation.map(n => n.id === item.id ? { ...n, is_active: e.target.checked } : n);
                              const res = await api.updateNavigation(updated);
                              setNavigation(res);
                              flashSuccess('Меню сохранено');
                            }}
                            className="w-4 h-4 rounded border-stone-300 text-amber-800"
                          />
                          <span className="text-xs text-stone-500 ml-2">активен</span>
                        </label>
                        <div className="flex gap-1.5">
                          <button
                            disabled={index === 0}
                            onClick={async () => {
                              const updated = [...navigation];
                              const temp = updated[index];
                              updated[index] = updated[index - 1];
                              updated[index - 1] = temp;
                              // re-sort_orders
                              const sorted = updated.map((x, i) => ({ ...x, sort_order: i + 1 }));
                              const res = await api.updateNavigation(sorted);
                              setNavigation(res);
                            }}
                            className="p-1 border text-xs rounded hover:bg-stone-200 disabled:opacity-30 cursor-pointer"
                          >
                            ▲
                          </button>
                          <button
                            disabled={index === navigation.length - 1}
                            onClick={async () => {
                              const updated = [...navigation];
                              const temp = updated[index];
                              updated[index] = updated[index + 1];
                              updated[index + 1] = temp;
                              // re-sort_orders
                              const sorted = updated.map((x, i) => ({ ...x, sort_order: i + 1 }));
                              const res = await api.updateNavigation(sorted);
                              setNavigation(res);
                            }}
                            className="p-1 border text-xs rounded hover:bg-stone-200 disabled:opacity-30 cursor-pointer"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* TAB 5: SECTIONS */}
          {activeTab === 'sections' && (
            <div className="space-y-8">
              {sections.map(section => (
                <Card key={section.id} className="p-8 border border-stone-200 bg-white space-y-6">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                    <h3 className="font-heading text-xl font-medium text-slate-900 uppercase tracking-wide">
                      Секция: {section.section_key}
                    </h3>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={section.is_active}
                        onChange={async (e) => {
                          const res = await api.updateSection(section.id, { is_active: e.target.checked });
                          setSections(sections.map(s => s.id === section.id ? res : s));
                          flashSuccess(`Секция ${section.section_key} обновлена`);
                        }}
                        className="w-4 h-4 rounded text-amber-800"
                      />
                      <span className="text-xs text-stone-500 ml-2">Секция включена</span>
                    </label>
                  </div>

                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    try {
                      const data = new FormData(e.currentTarget);
                      const payload = Object.fromEntries(data.entries());
                      const res = await api.updateSection(section.id, payload as any);
                      setSections(sections.map(s => s.id === section.id ? res : s));
                      flashSuccess('Контент секции обновлен');
                    } catch (err: any) {
                      flashError(err.message || 'Ошибка сохранения');
                    } finally {
                      setSaving(false);
                    }
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {section.eyebrow !== undefined && (
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Надзаголовок (Eyebrow)</label>
                          <input type="text" name="eyebrow" defaultValue={section.eyebrow} className="px-3 py-2 border rounded-md" />
                        </div>
                      )}
                      {section.title !== undefined && (
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Заголовок</label>
                          <input type="text" name="title" defaultValue={section.title} className="px-3 py-2 border rounded-md" />
                        </div>
                      )}
                      {section.subtitle !== undefined && (
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Подзаголовок</label>
                          <input type="text" name="subtitle" defaultValue={section.subtitle} className="px-3 py-2 border rounded-md" />
                        </div>
                      )}
                      {section.content !== undefined && (
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Описание / Контент</label>
                          <textarea name="content" defaultValue={section.content} rows={4} className="px-3 py-2 border rounded-md resize-none" />
                        </div>
                      )}
                      {section.quote !== undefined && (
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Имиджевая Цитата</label>
                          <textarea name="quote" defaultValue={section.quote} rows={2} className="px-3 py-2 border rounded-md resize-none" />
                        </div>
                      )}
                      
                      {/* Image uploader widget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Ссылка на фоновое изображение</label>
                          <input 
                            type="text" 
                            name="image_url" 
                            id={`img-field-${section.id}`} 
                            defaultValue={section.image_url} 
                            className="px-3 py-2 border rounded-md" 
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, (url) => {
                                const el = document.getElementById(`img-field-${section.id}`) as HTMLInputElement;
                                if (el) el.value = url;
                              })}
                              className="hidden"
                              id={`upload-btn-${section.id}`}
                            />
                            <label
                              htmlFor={`upload-btn-${section.id}`}
                              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 border text-xs font-mono rounded cursor-pointer inline-flex items-center gap-2 select-none"
                            >
                              <Upload className="w-4 h-4" /> Загрузить файл
                            </label>
                          </div>
                          {section.image_url && (
                            <img src={section.image_url} alt="thumbnail" className="w-10 h-10 object-cover rounded border border-stone-200" />
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {section.button_text !== undefined && (
                          <div className="flex flex-col space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Текст кнопки</label>
                            <input type="text" name="button_text" defaultValue={section.button_text} className="px-3 py-2 border rounded-md" />
                          </div>
                        )}
                        {section.button_url !== undefined && (
                          <div className="flex flex-col space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Ссылка кнопки</label>
                            <input type="text" name="button_url" defaultValue={section.button_url} className="px-3 py-2 border rounded-md" />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" disabled={saving} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                      Сохранить изменения
                    </Button>
                  </form>
                </Card>
              ))}
            </div>
          )}

          {/* TAB 6: DIRECTIONS */}
          {activeTab === 'directions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-stone-400 block uppercase tracking-wider">Направления деятельности</span>
                {!isAddingNew && !editingItem && (
                  <Button onClick={() => setIsAddingNew(true)} className="py-2.5 text-xs font-semibold uppercase tracking-wider">
                    <Plus className="w-4 h-4 mr-2" /> Добавить направление
                  </Button>
                )}
              </div>

              {/* LIST VIEW */}
              {!isAddingNew && !editingItem && (
                <div className="grid grid-cols-1 gap-4">
                  {directions.map(dir => (
                    <Card key={dir.id} className="p-6 bg-white border border-stone-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={dir.image_url} alt={dir.title} className="w-16 h-16 object-cover rounded-md border" />
                        <div>
                          <h4 className="font-heading font-medium text-slate-900 text-lg">{dir.title}</h4>
                          <p className="text-xs text-stone-400 font-mono">slug: {dir.slug} | icon: {dir.icon}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="p-2" onClick={() => setEditingItem(dir)}>
                          <Edit2 className="w-4 h-4 text-stone-600" />
                        </Button>
                        <Button variant="outline" className="p-2 border-red-200 hover:bg-red-50" onClick={async () => {
                          if (confirm('Вы уверены, что хотите удалить направление?')) {
                            await api.deleteDirection(dir.id);
                            setDirections(directions.filter(d => d.id !== dir.id));
                            flashSuccess('Направление удалено');
                          }
                        }}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* ADD NEW / EDIT FORM */}
              {(isAddingNew || editingItem) && (
                <Card className="p-8 sm:p-10 border bg-white space-y-6">
                  <h3 className="font-heading text-xl font-semibold border-b border-stone-100 pb-3 text-slate-900">
                    {isAddingNew ? 'Новое направление' : `Редактирование: ${editingItem.title}`}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    try {
                      const data = new FormData(e.currentTarget);
                      const payload = Object.fromEntries(data.entries());
                      const res = await api.saveDirection(editingItem?.id || null, payload as any);
                      
                      if (isAddingNew) {
                        setDirections([...directions, res]);
                      } else {
                        setDirections(directions.map(d => d.id === editingItem.id ? res : d));
                      }
                      setIsAddingNew(false);
                      setEditingItem(null);
                      flashSuccess('Направление сохранено');
                    } catch (err: any) {
                      flashError(err.message || 'Ошибка сохранения');
                    } finally {
                      setSaving(false);
                    }
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Название направления</label>
                        <input type="text" name="title" required defaultValue={editingItem?.title || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Slug (Код ссылки в URL)</label>
                        <input type="text" name="slug" required defaultValue={editingItem?.slug || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Ключевой вопрос (например: "Кто я?")</label>
                        <input type="text" name="key_question" defaultValue={editingItem?.key_question || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Цвет фона карточки (HEX, например: #FAF5F0)</label>
                        <input type="text" name="accent_color" defaultValue={editingItem?.accent_color || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Название иконки Lucide (Compass, Sparkles, UserCheck)</label>
                        <input type="text" name="icon" defaultValue={editingItem?.icon || 'Compass'} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Ссылка на обложку</label>
                        <input type="text" name="image_url" id="dir-image-field" defaultValue={editingItem?.image_url || ''} className="px-3 py-2 border rounded" />
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                          const el = document.getElementById('dir-image-field') as HTMLInputElement;
                          if (el) el.value = url;
                        })} className="text-xs mt-1" />
                      </div>
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Короткое описание</label>
                        <input type="text" name="short_description" defaultValue={editingItem?.short_description || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Подробное описание</label>
                        <textarea name="full_description" defaultValue={editingItem?.full_description || ''} rows={4} className="px-3 py-2 border rounded resize-none" />
                      </div>
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Ожидаемые результаты (в формате JSON массива, например: ["Уверенность", "Имидж"])</label>
                        <textarea name="results_json" defaultValue={editingItem?.results_json || '[]'} rows={2} className="px-3 py-2 border rounded font-mono text-xs resize-none" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" disabled={saving} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        {saving ? 'Сохранение...' : 'Сохранить направление'}
                      </Button>
                      <Button variant="outline" type="button" onClick={() => { setIsAddingNew(false); setEditingItem(null); setEditingBranch(null); setIsAddingNewBranch(false); }} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        Отмена
                      </Button>
                    </div>
                  </form>

                  {/* BRANCHES LIST EDITOR (ONLY WHEN EDITING EXISTING DIRECTION) */}
                  {!isAddingNew && editingItem?.id && (
                    <div className="border-t border-stone-200 pt-8 mt-8 space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-heading font-medium text-slate-900 text-lg">Внутренние ветки развития</h4>
                          <p className="text-xs text-stone-500 font-light">Добавьте или измените внутренние ветки для детальной проработки направления</p>
                        </div>
                        {!isAddingNewBranch && !editingBranch && (
                          <Button 
                            type="button"
                            onClick={() => {
                              setIsAddingNewBranch(true);
                              setEditingBranch(null);
                            }} 
                            className="py-2 px-4 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white"
                          >
                            <Plus className="w-4 h-4 mr-1.5" /> Добавить ветку
                          </Button>
                        )}
                      </div>

                      {/* Add/Edit branch inline sub-form */}
                      {(isAddingNewBranch || editingBranch) && (
                        <div className="p-5 border border-stone-200 bg-stone-50 rounded-xl space-y-4">
                          <h5 className="font-heading font-medium text-slate-900 text-sm">
                            {isAddingNewBranch ? 'Новая внутренняя ветка' : 'Редактирование внутренней ветки'}
                          </h5>
                          <form onSubmit={async (e) => {
                            e.preventDefault();
                            setSaving(true);
                            try {
                              const fd = new FormData(e.currentTarget);
                              const payload = {
                                direction_id: editingItem.id,
                                title: fd.get('branch_title') as string,
                                short_description: fd.get('branch_short_desc') as string,
                                sort_order: Number(fd.get('branch_sort_order')),
                                is_published: fd.get('branch_is_published') === 'true'
                              };

                              const res = await api.saveDirectionBranch(editingBranch?.id || null, payload);

                              if (isAddingNewBranch) {
                                setBranches([...branches, res]);
                              } else {
                                setBranches(branches.map(b => b.id === editingBranch?.id ? res : b));
                              }
                              setIsAddingNewBranch(false);
                              setEditingBranch(null);
                              flashSuccess('Ветка успешно сохранена');
                            } catch (err: any) {
                              flashError(err.message || 'Ошибка сохранения ветки');
                            } finally {
                              setSaving(false);
                            }
                          }} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex flex-col space-y-1">
                                <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Название ветки</label>
                                <input type="text" name="branch_title" required defaultValue={editingBranch?.title || ''} className="px-3 py-1.5 text-sm border rounded bg-white" />
                              </div>
                              <div className="flex flex-col space-y-1">
                                <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Порядок сортировки</label>
                                <input type="number" name="branch_sort_order" required defaultValue={editingBranch?.sort_order !== undefined ? editingBranch.sort_order : branches.filter(b => b.direction_id === editingItem.id).length + 1} className="px-3 py-1.5 text-sm border rounded bg-white" />
                              </div>
                              <div className="flex flex-col space-y-1">
                                <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Статус публикации</label>
                                <select name="branch_is_published" defaultValue={editingBranch?.is_published !== false ? 'true' : 'false'} className="px-3 py-1.5 text-sm border rounded bg-white">
                                  <option value="true">Опубликовано</option>
                                  <option value="false">Скрыто</option>
                                </select>
                              </div>
                              <div className="flex flex-col space-y-1 md:col-span-3">
                                <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Описание ветки</label>
                                <textarea name="branch_short_desc" required defaultValue={editingBranch?.short_description || ''} rows={3} className="px-3 py-1.5 text-sm border rounded bg-white resize-none" />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" disabled={saving} className="py-2 px-5 text-xs font-semibold uppercase tracking-wider bg-amber-800 text-white">
                                {saving ? 'Сохранение...' : 'Сохранить ветку'}
                              </Button>
                              <Button 
                                variant="outline" 
                                type="button" 
                                onClick={() => {
                                  setIsAddingNewBranch(false);
                                  setEditingBranch(null);
                                }} 
                                className="py-2 px-5 text-xs font-semibold uppercase tracking-wider"
                              >
                                Отмена
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Branches list table/cards */}
                      <div className="space-y-3">
                        {branches.filter(b => b.direction_id === editingItem.id).length === 0 ? (
                          <p className="text-sm text-stone-400 italic">Для данного направления еще нет веток. Добавьте первую ветку выше.</p>
                        ) : (
                          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                            <table className="w-full text-left text-xs text-stone-600 border-collapse">
                              <thead>
                                <tr className="bg-stone-50 border-b border-stone-200 text-[10px] font-mono uppercase tracking-wider text-stone-400">
                                  <th className="p-3">Название</th>
                                  <th className="p-3">Описание</th>
                                  <th className="p-3 text-center w-20">Порядок</th>
                                  <th className="p-3 text-center w-28">Статус</th>
                                  <th className="p-3 text-right w-24">Действия</th>
                                </tr>
                              </thead>
                              <tbody>
                                {branches.filter(b => b.direction_id === editingItem.id).sort((a,b) => a.sort_order - b.sort_order).map(b => (
                                  <tr key={b.id} className="border-b border-stone-100 hover:bg-stone-50/50">
                                    <td className="p-3 font-medium text-slate-800">{b.title}</td>
                                    <td className="p-3 max-w-xs truncate text-stone-500 font-light">{b.short_description}</td>
                                    <td className="p-3 text-center font-mono">{b.sort_order}</td>
                                    <td className="p-3 text-center">
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono ${b.is_published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-600 border border-stone-200'}`}>
                                        {b.is_published ? 'АКТИВНА' : 'СКРЫТА'}
                                      </span>
                                    </td>
                                    <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                                      <button 
                                        type="button" 
                                        onClick={() => {
                                          setEditingBranch(b);
                                          setIsAddingNewBranch(false);
                                        }} 
                                        className="text-stone-500 hover:text-stone-800"
                                      >
                                        <Edit2 className="w-3.5 h-3.5 inline" />
                                      </button>
                                      <button 
                                        type="button" 
                                        onClick={async () => {
                                          if (confirm('Удалить ветку?')) {
                                            await api.deleteDirectionBranch(b.id);
                                            setBranches(branches.filter(x => x.id !== b.id));
                                            flashSuccess('Ветка удалена');
                                          }
                                        }} 
                                        className="text-red-500 hover:text-red-800"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 inline" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              )}
            </div>
          )}

          {/* TAB 6B: DEVELOPMENT AREAS (Сферы развития 360°) */}
          {activeTab === 'development_areas' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-stone-400 block uppercase tracking-wider">Сферы развития 360°</span>
                {!isAddingNew && !editingItem && (
                  <Button onClick={() => setIsAddingNew(true)} className="py-2.5 text-xs font-semibold uppercase tracking-wider">
                    <Plus className="w-4 h-4 mr-2" /> Добавить сферу
                  </Button>
                )}
              </div>

              {/* LIST VIEW */}
              {!isAddingNew && !editingItem && (
                <div className="grid grid-cols-1 gap-4">
                  {developmentAreas.map(area => (
                    <Card key={area.id} className="p-6 bg-white border border-stone-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 font-bold border border-amber-200">
                          {area.icon || '✦'}
                        </div>
                        <div>
                          <h4 className="font-heading font-medium text-slate-900 text-lg">{area.title}</h4>
                          <p className="text-xs text-stone-400 font-mono">key: {area.key} | icon: {area.icon} | color: {area.color}</p>
                          <p className="text-stone-500 text-xs mt-1 font-light line-clamp-1">{area.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="p-2" onClick={() => setEditingItem(area)}>
                          <Edit2 className="w-4 h-4 text-stone-600" />
                        </Button>
                        <Button variant="outline" className="p-2 border-red-200 hover:bg-red-50" onClick={async () => {
                          if (confirm('Вы уверены, что хотите удалить эту сферу развития?')) {
                            await api.deleteDevelopmentArea(area.id);
                            setDevelopmentAreas(developmentAreas.filter(a => a.id !== area.id));
                            flashSuccess('Сфера развития успешно удалена');
                          }
                        }}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* ADD NEW / EDIT FORM */}
              {(isAddingNew || editingItem) && (
                <Card className="p-8 sm:p-10 border bg-white space-y-6">
                  <h3 className="font-heading text-xl font-semibold border-b border-stone-100 pb-3 text-slate-900">
                    {isAddingNew ? 'Новая сфера развития' : `Редактирование: ${editingItem.title}`}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    try {
                      const data = new FormData(e.currentTarget);
                      const payload = Object.fromEntries(data.entries());
                      const res = await api.saveDevelopmentArea(editingItem?.id || null, payload as any);
                      
                      if (isAddingNew) {
                        setDevelopmentAreas([...developmentAreas, res]);
                      } else {
                        setDevelopmentAreas(developmentAreas.map(a => a.id === editingItem.id ? res : a));
                      }
                      setIsAddingNew(false);
                      setEditingItem(null);
                      flashSuccess('Сфера развития успешно сохранена');
                    } catch (err: any) {
                      flashError(err.message || 'Ошибка сохранения');
                    } finally {
                      setSaving(false);
                    }
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Название сферы</label>
                        <input type="text" name="title" required defaultValue={editingItem?.title || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Системный ключ (key)</label>
                        <input type="text" name="key" required defaultValue={editingItem?.key || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Иконка Lucide (e.g. Brain, Heart, Focus, Sparkles)</label>
                        <input type="text" name="icon" defaultValue={editingItem?.icon || 'Sparkles'} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Градиент / Цвет (Tailwind CSS, e.g. from-amber-500 to-amber-700)</label>
                        <input type="text" name="color" defaultValue={editingItem?.color || 'from-stone-500 to-stone-700'} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Подробное описание</label>
                        <textarea name="description" defaultValue={editingItem?.description || ''} rows={4} className="px-3 py-2 border rounded resize-none" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" disabled={saving} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        {saving ? 'Сохранение...' : 'Сохранить'}
                      </Button>
                      <Button variant="outline" type="button" onClick={() => { setIsAddingNew(false); setEditingItem(null); }} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        Отмена
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>
          )}

          {/* TAB 7: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-stone-400 block uppercase tracking-wider">Услуги и программы</span>
                {!isAddingNew && !editingItem && (
                  <Button onClick={() => setIsAddingNew(true)} className="py-2.5 text-xs font-semibold uppercase tracking-wider">
                    <Plus className="w-4 h-4 mr-2" /> Добавить услугу
                  </Button>
                )}
              </div>

              {/* LIST VIEW */}
              {!isAddingNew && !editingItem && (
                <div className="grid grid-cols-1 gap-4">
                  {services.map(srv => (
                    <Card key={srv.id} className="p-6 bg-white border border-stone-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={srv.image_url} alt={srv.title} className="w-16 h-16 object-cover rounded-md border" />
                        <div>
                          <h4 className="font-heading font-medium text-slate-900 text-lg">{srv.title}</h4>
                          <p className="text-xs text-stone-400 font-mono">Цена: {srv.price} | Длительность: {srv.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="p-2" onClick={() => setEditingItem(srv)}>
                          <Edit2 className="w-4 h-4 text-stone-600" />
                        </Button>
                        <Button variant="outline" className="p-2 border-red-200 hover:bg-red-50" onClick={async () => {
                          if (confirm('Удалить эту услугу?')) {
                            await api.deleteService(srv.id);
                            setServices(services.filter(s => s.id !== srv.id));
                            flashSuccess('Услуга удалена');
                          }
                        }}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* ADD NEW / EDIT SERVICE FORM */}
              {(isAddingNew || editingItem) && (
                <Card className="p-8 sm:p-10 border bg-white space-y-6">
                  <h3 className="font-heading text-xl font-semibold border-b border-stone-100 pb-3 text-slate-900">
                    {isAddingNew ? 'Новая программа / услуга' : `Редактирование: ${editingItem.title}`}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    try {
                      const data = new FormData(e.currentTarget);
                      const payload = Object.fromEntries(data.entries());
                      const res = await api.saveService(editingItem?.id || null, payload as any);
                      
                      if (isAddingNew) {
                        setServices([...services, res]);
                      } else {
                        setServices(services.map(s => s.id === editingItem.id ? res : s));
                      }
                      setIsAddingNew(false);
                      setEditingItem(null);
                      flashSuccess('Услуга сохранена');
                    } catch (err: any) {
                      flashError(err.message || 'Ошибка сохранения');
                    } finally {
                      setSaving(false);
                    }
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5 col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Название услуги</label>
                        <input type="text" name="title" required defaultValue={editingItem?.title || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Slug (Код в URL)</label>
                        <input type="text" name="slug" required defaultValue={editingItem?.slug || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Цена (например: 180 000 ₽)</label>
                        <input type="text" name="price" defaultValue={editingItem?.price || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Длительность</label>
                        <input type="text" name="duration" defaultValue={editingItem?.duration || '3 месяца'} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Формат (например: Онлайн в Zoom)</label>
                        <input type="text" name="format" defaultValue={editingItem?.format || 'Онлайн'} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Ссылка на фото обложки</label>
                        <input type="text" name="image_url" id="srv-image-field" defaultValue={editingItem?.image_url || ''} className="px-3 py-2 border rounded" />
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                          const el = document.getElementById('srv-image-field') as HTMLInputElement;
                          if (el) el.value = url;
                        })} className="text-xs mt-1" />
                      </div>
                      <div className="flex flex-col space-y-1.5 col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Для кого (Целевая аудитория)</label>
                        <input type="text" name="target_audience" defaultValue={editingItem?.target_audience || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5 col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Короткое описание</label>
                        <textarea name="short_description" defaultValue={editingItem?.short_description || ''} rows={2} className="px-3 py-2 border rounded resize-none" />
                      </div>
                      <div className="flex flex-col space-y-1.5 col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Полное подробное описание</label>
                        <textarea name="full_description" defaultValue={editingItem?.full_description || ''} rows={4} className="px-3 py-2 border rounded resize-none" />
                      </div>
                      <div className="flex flex-col space-y-1.5 col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Что входит в программу (в формате JSON массива, например: ["Сессия 1", "Шопинг"])</label>
                        <textarea name="includes_json" defaultValue={editingItem?.includes_json || '[]'} rows={3} className="px-3 py-2 border rounded font-mono text-xs resize-none" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" disabled={saving} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        Сохранить
                      </Button>
                      <Button variant="outline" type="button" onClick={() => { setIsAddingNew(false); setEditingItem(null); }} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        Отмена
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>
          )}

          {/* TAB 8: TEAM */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-stone-400 block uppercase tracking-wider">Участники команды</span>
                {!isAddingNew && !editingItem && (
                  <Button onClick={() => setIsAddingNew(true)} className="py-2.5 text-xs font-semibold uppercase tracking-wider">
                    <Plus className="w-4 h-4 mr-2" /> Добавить участника
                  </Button>
                )}
              </div>

              {/* LIST */}
              {!isAddingNew && !editingItem && (
                <div className="grid grid-cols-1 gap-4">
                  {team.map(m => (
                    <Card key={m.id} className="p-6 bg-white border border-stone-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={m.photo_url} alt={m.name} className="w-16 h-16 object-cover rounded-md border" />
                        <div>
                          <h4 className="font-heading font-medium text-slate-900 text-lg">{m.name}</h4>
                          <span className="font-mono text-[9px] text-amber-800 uppercase font-semibold">{m.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="p-2" onClick={() => setEditingItem(m)}>
                          <Edit2 className="w-4 h-4 text-stone-600" />
                        </Button>
                        <Button variant="outline" className="p-2 border-red-200 hover:bg-red-50" onClick={async () => {
                          if (confirm('Удалить участника команды?')) {
                            await api.deleteTeamMember(m.id);
                            setTeam(team.filter(t => t.id !== m.id));
                            flashSuccess('Участник удален');
                          }
                        }}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* TEAM ADD/EDIT FORM */}
              {(isAddingNew || editingItem) && (
                <Card className="p-8 sm:p-10 border bg-white space-y-6">
                  <h3 className="font-heading text-xl font-semibold border-b border-stone-100 pb-3 text-slate-900">
                    {isAddingNew ? 'Добавить участника' : `Редактирование: ${editingItem.name}`}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    try {
                      const data = new FormData(e.currentTarget);
                      const payload = Object.fromEntries(data.entries());
                      const res = await api.saveTeamMember(editingItem?.id || null, payload as any);
                      
                      if (isAddingNew) {
                        setTeam([...team, res]);
                      } else {
                        setTeam(team.map(t => t.id === editingItem.id ? res : t));
                      }
                      setIsAddingNew(false);
                      setEditingItem(null);
                      flashSuccess('Участник успешно сохранен');
                    } catch (err: any) {
                      flashError(err.message || 'Ошибка сохранения');
                    } finally {
                      setSaving(false);
                    }
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">ФИО Участника</label>
                        <input type="text" name="name" required defaultValue={editingItem?.name || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Роль в проекте</label>
                        <input type="text" name="role" required defaultValue={editingItem?.role || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Ссылка на фото</label>
                        <input type="text" name="photo_url" id="team-image-field" defaultValue={editingItem?.photo_url || ''} className="px-3 py-2 border rounded" />
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                          const el = document.getElementById('team-image-field') as HTMLInputElement;
                          if (el) el.value = url;
                        })} className="text-xs mt-1" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Контакты (Telegram URL в формате JSON, например: telegram: https://t.me/nick)</label>
                        <input type="text" name="social_links_json" defaultValue={editingItem?.social_links_json || '{"telegram": ""}'} className="px-3 py-2 border rounded font-mono text-xs" />
                      </div>
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Короткое описание</label>
                        <input type="text" name="short_description" defaultValue={editingItem?.short_description || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Подробная биография</label>
                        <textarea name="full_description" defaultValue={editingItem?.full_description || ''} rows={4} className="px-3 py-2 border rounded resize-none" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" disabled={saving} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        Сохранить
                      </Button>
                      <Button variant="outline" type="button" onClick={() => { setIsAddingNew(false); setEditingItem(null); }} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        Отмена
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>
          )}

          {/* TAB 9: FOUNDER */}
          {activeTab === 'founder' && founder && (
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white">
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                try {
                  const data = new FormData(e.currentTarget);
                  const payload = Object.fromEntries(data.entries());
                  const res = await api.updateFounder(payload as any);
                  setFounder(res);
                  flashSuccess('Данные основателя обновлены');
                } catch (err: any) {
                  flashError(err.message || 'Ошибка обновления');
                } finally {
                  setSaving(false);
                }
              }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Имя</label>
                    <input type="text" name="name" defaultValue={founder.name} className="px-3 py-2 border rounded" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Роль / Титул</label>
                    <input type="text" name="role" defaultValue={founder.role} className="px-3 py-2 border rounded" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Ссылка на фото</label>
                    <input type="text" name="photo_url" id="founder-image-field" defaultValue={founder.photo_url} className="px-3 py-2 border rounded" />
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                      const el = document.getElementById('founder-image-field') as HTMLInputElement;
                      if (el) el.value = url;
                    })} className="text-xs mt-1" />
                  </div>
                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Короткое описание</label>
                    <input type="text" name="short_description" defaultValue={founder.short_description} className="px-3 py-2 border rounded" />
                  </div>
                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Полная Биография</label>
                    <textarea name="full_bio" defaultValue={founder.full_bio} rows={5} className="px-3 py-2 border rounded resize-none" />
                  </div>
                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Опыт работы (Строка)</label>
                    <input type="text" name="experience" defaultValue={founder.experience} className="px-3 py-2 border rounded" />
                  </div>
                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Имиджевая цитата основателя</label>
                    <input type="text" name="quote" defaultValue={founder.quote} className="px-3 py-2 border rounded" />
                  </div>
                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Образование (JSON массив, например: ["ВУЗ 1", "ВУЗ 2"])</label>
                    <textarea name="education_json" defaultValue={founder.education_json} rows={3} className="px-3 py-2 border rounded font-mono text-xs resize-none" />
                  </div>
                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Достижения (JSON массив, например: ["Награда 1"])</label>
                    <textarea name="achievements_json" defaultValue={founder.achievements_json} rows={3} className="px-3 py-2 border rounded font-mono text-xs resize-none" />
                  </div>
                  <div className="flex flex-col space-y-1.5 col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Компетенции (JSON массив, например: ["Стиль", "Психология"])</label>
                    <textarea name="competencies_json" defaultValue={founder.competencies_json} rows={3} className="px-3 py-2 border rounded font-mono text-xs resize-none" />
                  </div>
                </div>

                <Button type="submit" disabled={saving} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                  {saving ? 'Сохранение...' : 'Сохранить данные'}
                </Button>
              </form>
            </Card>
          )}

          {/* TAB 10: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-stone-400 block uppercase tracking-wider">Отзывы клиентов</span>
                {!isAddingNew && !editingItem && (
                  <Button onClick={() => setIsAddingNew(true)} className="py-2.5 text-xs font-semibold uppercase tracking-wider">
                    <Plus className="w-4 h-4 mr-2" /> Добавить отзыв
                  </Button>
                )}
              </div>

              {/* LIST */}
              {!isAddingNew && !editingItem && (
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map(rev => (
                    <Card key={rev.id} className="p-6 bg-white border border-stone-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={rev.client_photo_url} alt={rev.client_name} className="w-16 h-16 object-cover rounded-md border" />
                        <div>
                          <h4 className="font-heading font-medium text-slate-900 text-lg">{rev.client_name}</h4>
                          <span className="text-xs text-stone-400">{rev.client_role} | {rev.review_date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="p-2" onClick={() => setEditingItem(rev)}>
                          <Edit2 className="w-4 h-4 text-stone-600" />
                        </Button>
                        <Button variant="outline" className="p-2 border-red-200 hover:bg-red-50" onClick={async () => {
                          if (confirm('Удалить отзыв?')) {
                            await api.deleteReview(rev.id);
                            setReviews(reviews.filter(r => r.id !== rev.id));
                            flashSuccess('Отзыв удален');
                          }
                        }}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* REVIEWS ADD/EDIT FORM */}
              {(isAddingNew || editingItem) && (
                <Card className="p-8 sm:p-10 border bg-white space-y-6">
                  <h3 className="font-heading text-xl font-semibold border-b border-stone-100 pb-3 text-slate-900">
                    {isAddingNew ? 'Добавить отзыв' : `Редактирование: Отзыв ${editingItem.client_name}`}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    try {
                      const data = new FormData(e.currentTarget);
                      const payload = Object.fromEntries(data.entries());
                      const res = await api.saveReview(editingItem?.id || null, payload as any);
                      
                      if (isAddingNew) {
                        setReviews([...reviews, res]);
                      } else {
                        setReviews(reviews.map(r => r.id === editingItem.id ? res : r));
                      }
                      setIsAddingNew(false);
                      setEditingItem(null);
                      flashSuccess('Отзыв успешно сохранен');
                    } catch (err: any) {
                      flashError(err.message || 'Ошибка сохранения');
                    } finally {
                      setSaving(false);
                    }
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Имя клиента</label>
                        <input type="text" name="client_name" required defaultValue={editingItem?.client_name || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Должность / Роль (Статус)</label>
                        <input type="text" name="client_role" defaultValue={editingItem?.client_role || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Ссылка на фото</label>
                        <input type="text" name="client_photo_url" id="review-image-field" defaultValue={editingItem?.client_photo_url || ''} className="px-3 py-2 border rounded" />
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => {
                          const el = document.getElementById('review-image-field') as HTMLInputElement;
                          if (el) el.value = url;
                        })} className="text-xs mt-1" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Дата отзыва (например: Июнь 2026)</label>
                        <input type="text" name="review_date" defaultValue={editingItem?.review_date || ''} className="px-3 py-2 border rounded" />
                      </div>
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Текст отзыва</label>
                        <textarea name="review_text" required defaultValue={editingItem?.review_text || ''} rows={4} className="px-3 py-2 border rounded resize-none" />
                      </div>
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600">Результат клиента (например: Полностью обновила гардероб и привлекла инвестиции)</label>
                        <input type="text" name="result_text" defaultValue={editingItem?.result_text || ''} className="px-3 py-2 border rounded" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" disabled={saving} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        Сохранить
                      </Button>
                      <Button variant="outline" type="button" onClick={() => { setIsAddingNew(false); setEditingItem(null); }} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                        Отмена
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>
          )}

          {/* TAB 11: MEDIA */}
          {activeTab === 'media' && (
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white space-y-8">
              {/* Manual upload element */}
              <div className="p-8 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center text-center space-y-4">
                <Upload className="w-10 h-10 text-stone-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-stone-700">Загрузить новые медиафайлы</p>
                  <p className="text-xs text-stone-400">Поддерживаются PNG, JPG, JPEG, WEBP</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadLoading(true);
                    try {
                      const r = new FileReader();
                      r.onloadend = async () => {
                        await api.uploadMedia(file.name, r.result as string);
                        const list = await api.getMediaFiles();
                        setMediaFiles(list);
                        flashSuccess('Файл загружен');
                      };
                      r.readAsDataURL(file);
                    } catch (err: any) {
                      flashError('Ошибка загрузки');
                    } finally {
                      setUploadLoading(false);
                    }
                  }}
                  className="hidden"
                  id="direct-gallery-upload"
                />
                <label
                  htmlFor="direct-gallery-upload"
                  className="px-6 py-2.5 bg-amber-800 hover:bg-amber-700 text-white text-xs font-mono tracking-wider uppercase rounded cursor-pointer select-none"
                >
                  {uploadLoading ? 'Загрузка...' : 'Выбрать файлы'}
                </label>
              </div>

              {/* Media gallery grid */}
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-stone-400 block uppercase tracking-wider font-semibold">СПИСОК ФАЙЛОВ В СИСТЕМЕ</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {mediaFiles.map((file, i) => (
                    <div key={i} className="border border-stone-100 rounded-lg overflow-hidden group bg-stone-50 flex flex-col justify-between h-48 relative">
                      <div className="flex-grow overflow-hidden relative">
                        <img src={file.url} alt={file.name} className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform" />
                        {/* Copy URL trigger */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(file.url);
                            flashSuccess('Ссылка на медиафайл скопирована в буфер!');
                          }}
                          className="absolute bottom-2 left-2 p-1.5 bg-white/90 backdrop-blur-sm shadow rounded hover:bg-white text-stone-600 transition-colors cursor-pointer"
                          title="Скопировать ссылку"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-3 bg-white flex items-center justify-between gap-1.5 border-t">
                        <div className="truncate pr-1">
                          <p className="text-[10px] font-semibold text-stone-800 truncate" title={file.name}>{file.name}</p>
                          <p className="text-[8px] font-mono text-stone-400">{file.size}</p>
                        </div>
                        <button
                          onClick={async () => {
                            if (confirm('Удалить этот медиафайл? Это действие необратимо.')) {
                              await api.deleteMedia(file.name);
                              setMediaFiles(mediaFiles.filter(m => m.name !== file.name));
                              flashSuccess('Файл удален');
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          title="Удалить"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* TAB 12: SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              {seoPages.map(page => (
                <Card key={page.id} className="p-8 border border-stone-200 bg-white space-y-6">
                  <h3 className="font-heading text-xl font-medium text-slate-900 uppercase border-b border-stone-100 pb-3">
                    SEO Страницы: {page.page_key}
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    try {
                      const data = new FormData(e.currentTarget);
                      const payload = Object.fromEntries(data.entries());
                      const res = await api.saveSeoPage(page.page_key, payload as any);
                      setSeoPages(seoPages.map(s => s.page_key === page.page_key ? res : s));
                      flashSuccess('SEO настройки успешно сохранены');
                    } catch (err: any) {
                      flashError(err.message || 'Ошибка сохранения');
                    } finally {
                      setSaving(false);
                    }
                  }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5 col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Title (Заголовок во вкладке браузера)</label>
                        <input type="text" name="title" defaultValue={page.title} className="px-3 py-2 border rounded-md" />
                      </div>
                      <div className="flex flex-col space-y-1.5 col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Description (Описание в поисковиках)</label>
                        <textarea name="description" defaultValue={page.description} rows={2} className="px-3 py-2 border rounded-md resize-none" />
                      </div>
                      <div className="flex flex-col space-y-1.5 col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Keywords (Ключевые слова через запятую)</label>
                        <input type="text" name="keywords" defaultValue={page.keywords} className="px-3 py-2 border rounded-md" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">OG Title (Заголовок при отправке ссылки)</label>
                        <input type="text" name="og_title" defaultValue={page.og_title} className="px-3 py-2 border rounded-md" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">OG Image URL (Превью картинка ссылки)</label>
                        <input type="text" name="og_image_url" defaultValue={page.og_image_url} className="px-3 py-2 border rounded-md" />
                      </div>
                    </div>
                    <Button type="submit" disabled={saving} className="px-8 py-3 text-xs tracking-widest font-semibold uppercase">
                      Сохранить SEO
                    </Button>
                  </form>
                </Card>
              ))}
            </div>
          )}

          {/* TAB 13: DESIGN */}
          {activeTab === 'design' && designSettings && (
            <Card className="p-8 sm:p-10 border border-stone-200 bg-white">
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                try {
                  const data = new FormData(e.currentTarget);
                  const payload: any = Object.fromEntries(data.entries());
                  // parse boolean from form checkbox
                  payload.animations_enabled = e.currentTarget.animations_enabled.checked;
                  const res = await api.updateDesignSettings(payload);
                  setDesignSettings(res);
                  flashSuccess('Дизайн-настройки обновлены. Сайт перестроен.');
                  // Inject new css variables instantly
                  document.documentElement.style.setProperty('--primary-color', res.primary_color);
                  document.documentElement.style.setProperty('--accent-color', res.accent_color);
                  document.documentElement.style.setProperty('--bg-color', res.background_color);
                  document.documentElement.style.setProperty('--text-color', res.text_color);
                  document.documentElement.style.setProperty('--border-radius', res.border_radius);
                } catch (err: any) {
                  flashError(err.message || 'Ошибка сохранения');
                } finally {
                  setSaving(false);
                }
              }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Основной цвет (HEX)</label>
                    <div className="flex gap-2">
                      <input type="color" name="primary_color" defaultValue={designSettings.primary_color} className="w-10 h-10 border p-0.5 rounded cursor-pointer" />
                      <input type="text" name="primary_color_text" key={designSettings.primary_color} defaultValue={designSettings.primary_color} className="px-3 py-2 border rounded-md flex-grow" onChange={(e) => {
                        const colInput = e.currentTarget.previousSibling as HTMLInputElement;
                        if (colInput && /^#[0-9A-F]{6}$/i.test(e.currentTarget.value)) colInput.value = e.currentTarget.value;
                      }} />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Акцентный цвет ( HEX Бронза / Медь )</label>
                    <div className="flex gap-2">
                      <input type="color" name="accent_color" defaultValue={designSettings.accent_color} className="w-10 h-10 border p-0.5 rounded cursor-pointer" />
                      <input type="text" name="accent_color_text" key={designSettings.accent_color} defaultValue={designSettings.accent_color} className="px-3 py-2 border rounded-md flex-grow" />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Цвет фона ( HEX Светло-кремовый )</label>
                    <div className="flex gap-2">
                      <input type="color" name="background_color" defaultValue={designSettings.background_color} className="w-10 h-10 border p-0.5 rounded cursor-pointer" />
                      <input type="text" name="background_color_text" key={designSettings.background_color} defaultValue={designSettings.background_color} className="px-3 py-2 border rounded-md flex-grow" />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Цвет текста ( HEX Графит )</label>
                    <div className="flex gap-2">
                      <input type="color" name="text_color" defaultValue={designSettings.text_color} className="w-10 h-10 border p-0.5 rounded cursor-pointer" />
                      <input type="text" name="text_color_text" key={designSettings.text_color} defaultValue={designSettings.text_color} className="px-3 py-2 border rounded-md flex-grow" />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Шрифт Заголовков</label>
                    <select name="heading_font" defaultValue={designSettings.heading_font} className="px-3 py-2 border rounded-md">
                      <option value="Playfair Display">Playfair Display (Премиум Сериф)</option>
                      <option value="Inter">Inter (Минимализм)</option>
                      <option value="JetBrains Mono">JetBrains Mono (Техно-Моно)</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Скругление углов (Border Radius)</label>
                    <select name="border_radius" defaultValue={designSettings.border_radius} className="px-3 py-2 border rounded-md">
                      <option value="0px">0px (Строгий Brutalism)</option>
                      <option value="8px">8px (Классический)</option>
                      <option value="12px">12px (Премиальный Мягкий)</option>
                      <option value="24px">24px (Ультра Мягкий)</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">Стиль Кнопок</label>
                    <select name="button_style" defaultValue={designSettings.button_style} className="px-3 py-2 border rounded-md">
                      <option value="premium">Премиальный (Рамки и Hover заливка)</option>
                      <option value="soft">Мягкий (Скругленные цветные плашки)</option>
                      <option value="strict">Строгий (Прямые углы, монохром)</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3 pt-6">
                    <input
                      id="animations_enabled"
                      type="checkbox"
                      name="animations_enabled"
                      defaultChecked={designSettings.animations_enabled}
                      className="w-4 h-4 rounded text-amber-800"
                    />
                    <label htmlFor="animations_enabled" className="text-xs text-stone-600 select-none cursor-pointer">
                      Включить легкие анимации при скролле
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" disabled={saving} className="px-8 py-3.5 text-xs font-semibold tracking-widest uppercase">
                    Применить дизайн-настройки
                  </Button>
                </div>
              </form>
            </Card>
          )}

        </div>

        {/* FOOTER */}
        <footer className="bg-white border-t border-stone-200 h-16 px-6 sm:px-10 flex items-center justify-between text-xs text-stone-400 font-mono">
          <p>© 2026 Проект Я. Все права защищены.</p>
          <p>Раздел: {activeTab.toUpperCase()}</p>
        </footer>
      </main>
    </div>
  );
};
export default AdminDashboard;
