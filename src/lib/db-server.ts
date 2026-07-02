import fs from 'fs';
import path from 'path';
import { DatabaseSchema, SiteSettings, NavigationItem, PageSection, Direction, DirectionBranch, DevelopmentArea, Service, TeamMember, Founder, Review, Lead, SeoPage, DesignSettings } from '../types.js';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Helper to guarantee unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

const defaultDb: DatabaseSchema = {
  site_settings: {
    id: 'settings_1',
    site_name: 'Проект Я — архитектура личности, образа и реализации',
    logo_text: 'ПРОЕКТ Я',
    logo_image_url: '',
    phone: '+7 (999) 123-45-67',
    email: 'hello@proektya.ru',
    city: 'Москва',
    address: 'Москва',
    telegram_url: 'https://t.me/project_ya',
    whatsapp_url: 'https://wa.me/79991234567',
    instagram_url: 'https://instagram.com/project_ya',
    vk_url: '',
    youtube_url: '',
    copyright_text: '© 2026 Проект Я. Все права защищены.',
    privacy_policy_url: '#',
    personal_data_url: '#',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  navigation_items: [
    { id: 'nav_1', label: 'Философия', url: '#philosophy', type: 'anchor', sort_order: 1, is_active: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_2', label: 'О проекте', url: '#about', type: 'anchor', sort_order: 2, is_active: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_3', label: 'Направления', url: '#directions', type: 'anchor', sort_order: 3, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_4', label: 'Как это работает', url: '#how-it-works', type: 'anchor', sort_order: 4, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_5', label: 'Основатель', url: '#founder', type: 'anchor', sort_order: 5, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_6', label: 'Заявка', url: '#lead-form', type: 'anchor', sort_order: 6, is_active: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_7', label: 'Контакты', url: '#contacts', type: 'anchor', sort_order: 7, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ],
  page_sections: [
    {
      id: 'sec_hero',
      page_key: 'home',
      section_key: 'hero',
      title: 'Проект «Я»',
      subtitle: 'Архитектура личности, образа и реализации',
      eyebrow: '',
      content: 'Пространство для тех, кто хочет соединить внутреннее состояние, внешний образ и личную реализацию в одну цельную систему. Мы помогаем человеку лучше понять себя, выразить индивидуальность через стиль и позиционирование, а затем проявить это в профессии, личном бренде или собственном деле.',
      quote: '«Внешний вид — это самое быстрое послание, которое вы отправляете миру. Пусть оно будет правдивым.»',
      image_url: 'https://hhzxqrqfeudecnyujowb.supabase.co/storage/v1/object/public/AMIRA/Zemfira.jpg',
      button_text: 'Оставить заявку',
      button_url: '#lead-form',
      sort_order: 1,
      is_active: true,
      data_json: JSON.stringify({
        secondary_button_text: 'Узнать подробнее',
        secondary_button_url: '#about'
      }),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sec_philosophy',
      page_key: 'home',
      section_key: 'philosophy',
      title: 'Человек раскрывается целиком',
      subtitle: '',
      eyebrow: 'ФИЛОСОФИЯ',
      content: 'Мы не рассматриваем человека отдельно как внешность, профессию, тело или социальную роль. Личность проявляется через состояние, выбор, образ, отношения, дело и то, как человек занимает место в мире.\n\nПроект «Я» помогает соединить внутреннее и внешнее: понять себя, собрать образ и проявиться в жизни более точно.',
      quote: '',
      image_url: '',
      button_text: '',
      button_url: '',
      sort_order: 2,
      is_active: true,
      data_json: JSON.stringify([
        { title: 'Внутренняя опора', description: 'понимание себя, своих ценностей, состояния и направления движения.' },
        { title: 'Внешний образ', description: 'стиль, одежда и визуальное позиционирование как продолжение личности.' },
        { title: 'Реализация', description: 'проявление себя в профессии, личном бренде, деятельности или собственном деле.' }
      ]),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sec_about',
      page_key: 'home',
      section_key: 'about',
      title: 'О проекте',
      subtitle: 'Пространство для раскрытия вашего потенциала',
      eyebrow: 'О ПРОЕКТЕ',
      content: 'Проект «Я» — это авторское пространство для личного, визуального и профессионального развития.\n\nНа старте проект помогает человеку определить актуальную точку роста: внутреннее состояние, образ или реализацию. В дальнейшем проект будет развиваться как экспертная платформа, где постепенно появятся специалисты, программы и направления для комплексного развития человека.',
      quote: '',
      image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
      button_text: 'Получить первичный маршрут',
      button_url: '#lead-form',
      sort_order: 3,
      is_active: true,
      data_json: JSON.stringify({
        mission: 'Раскрыть уникальный код личности каждого человека.',
        values: []
      }),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sec_expert_env',
      page_key: 'home',
      section_key: 'expert_env',
      title: 'Экспертная среда проекта',
      subtitle: '',
      eyebrow: 'СООБЩЕСТВО',
      content: 'Сейчас проект развивается как авторское пространство. Постепенно к нему будут присоединяться специалисты в области психологии, стиля, здоровья, личного бренда, профессионального развития и бизнеса.',
      quote: '',
      image_url: '',
      button_text: 'Стать экспертом проекта',
      button_url: '#lead-form',
      sort_order: 4,
      is_active: true,
      data_json: '{}',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  directions: [
    {
      id: 'dir_1',
      title: 'Личность',
      slug: 'personality',
      key_question: 'Кто я?',
      accent_color: '#FAF5F0',
      short_description: 'Внутренняя основа человека: состояние, ценности, самоотношение, тело, энергия и способ воспринимать себя и мир.',
      full_description: 'Личность — это внутренняя основа: состояние, ценности, самоотношение, тело, энергия и способ воспринимать себя, людей и жизненные ситуации.',
      image_url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800',
      icon: 'Brain',
      results_json: JSON.stringify([
        'больше ясности о себе',
        'лучшее понимание своих ценностей',
        'более устойчивая внутренняя опора',
        'понимание, с чего начать личное развитие'
      ]),
      sort_order: 1,
      is_published: true,
      seo_title: 'Направление Личность | Проект Я',
      seo_description: 'Внутреннее состояние, психология, привычки и отношение к себе.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'dir_2',
      title: 'Образ',
      slug: 'image',
      key_question: 'Как я выгляжу?',
      accent_color: '#F3EFE9',
      short_description: 'Внешнее выражение личности через стиль, одежду, визуальный код, эстетику и точное позиционирование.',
      full_description: 'Образ — это способ сделать внутреннее видимым: через стиль, одежду, визуальный код, эстетику и точное позиционирование.',
      image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      icon: 'Sparkles',
      results_json: JSON.stringify([
        'более точный внешний образ',
        'понимание своего визуального кода',
        'стиль, который поддерживает личность',
        'образ, связанный с ценностями и целями'
      ]),
      sort_order: 2,
      is_published: true,
      seo_title: 'Направление Образ | Проект Я',
      seo_description: 'Внешний стиль, одежда, подбор гардероба и визуальная проявленность.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'dir_3',
      title: 'Реализация',
      slug: 'realization',
      key_question: 'Как я проявляюсь?',
      accent_color: '#EDEAE4',
      short_description: 'Переход от внутреннего понимания и внешнего образа к профессии, личному бренду, бизнесу и деятельности.',
      full_description: 'Реализация — это переход от внутреннего понимания и внешнего образа к действиям: профессии, бренду, бизнесу и публичному проявлению.',
      image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      icon: 'TrendingUp',
      results_json: JSON.stringify([
        'яснее профессиональная траектория',
        'понятнее личное позиционирование',
        'первые шаги в развитии бренда',
        'связь между личностью, образом и деятельностью'
      ]),
      sort_order: 3,
      is_published: true,
      seo_title: 'Направление Реализация | Проект Я',
      seo_description: 'Профессиональный рост, личный бренд, бизнес и продвижение.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  direction_branches: [
    {
      id: 'br_1_1',
      direction_id: 'dir_1',
      title: 'Психология и самоотношение',
      short_description: 'самооценка, эмоции, внутренняя опора, тревога, отношение к себе, личные границы.',
      full_description: 'самооценка, эмоции, внутренняя опора, тревога, отношение к себе, личные границы.',
      sort_order: 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'br_1_2',
      direction_id: 'dir_1',
      title: 'Тело, здоровье и энергия',
      short_description: 'спорт, питание, привычки, восстановление, физическое состояние, ресурсность.',
      full_description: 'спорт, питание, привычки, восстановление, физическое состояние, ресурсность.',
      sort_order: 2,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'br_1_3',
      direction_id: 'dir_1',
      title: 'Ценности и отношения с миром',
      short_description: 'личная философия, отношение к жизни, окружению, ситуациям, выбору и собственному пути.',
      full_description: 'личная философия, отношение к жизни, окружению, ситуациям, выбору и собственному пути.',
      sort_order: 3,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'br_2_1',
      direction_id: 'dir_2',
      title: 'Стиль и гардероб',
      short_description: 'подбор образа, одежда, капсула, внешний стиль, соответствующий личности.',
      full_description: 'подбор образа, одежда, капсула, внешний стиль, соответствующий личности.',
      sort_order: 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'br_2_2',
      direction_id: 'dir_2',
      title: 'Визуальное позиционирование',
      short_description: 'визуальный код, фотостиль, образ в социальных сетях, эстетика личной подачи.',
      full_description: 'визуальный код, фотостиль, образ в социальных сетях, эстетика личной подачи.',
      sort_order: 2,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'br_2_3',
      direction_id: 'dir_2',
      title: 'Бренд одежды',
      short_description: 'одежда как продолжение личности, ценностей и авторского взгляда на образ.',
      full_description: 'одежда как продолжение личности, ценностей и авторского взгляда на образ.',
      sort_order: 3,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'br_3_1',
      direction_id: 'dir_3',
      title: 'Профессиональное развитие',
      short_description: 'компетенции, обучение, наставники, профессиональный рост, карьерная или экспертная траектория.',
      full_description: 'компетенции, обучение, наставники, профессиональный рост, карьерная или экспертная траектория.',
      sort_order: 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'br_3_2',
      direction_id: 'dir_3',
      title: 'Личный бренд',
      short_description: 'позиционирование, ценности, философия, социальные сети, публичность и узнаваемость.',
      full_description: 'позиционирование, ценности, философия, социальные сети, публичность и узнаваемость.',
      sort_order: 2,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'br_3_3',
      direction_id: 'dir_3',
      title: 'Бизнес и деятельность',
      short_description: 'развитие своего дела, продукта, проекта, предпринимательства и коммуникации с аудиторией.',
      full_description: 'развитие своего дела, продукта, проекта, предпринимательства и коммуникации с аудиторией.',
      sort_order: 3,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  development_areas: [],
  services: [],
  team_members: [],
  founder: {
    id: 'fnd_1',
    name: 'Земфира Хисамутдинова',
    role: 'Основатель Проекта, Психолог-Имиджмейкер',
    photo_url: 'https://hhzxqrqfeudecnyujowb.supabase.co/storage/v1/object/public/AMIRA/Zemfira.jpg',
    short_description: 'Автор уникальной методики синергии психологии и стиля. Более 10 лет опыта работы с первыми лицами.',
    full_bio: 'Проект «Я» создан вокруг идеи целостного развития человека. В центре не отдельная услуга, а сам человек: его состояние, образ, ценности, деятельность и способ проявляться в мире. Получив психологическое образование и многолетний практический опыт, я объединила эти аспекты, чтобы помочь каждому обрести истинную гармонию.',
    experience: '12 лет практики, более 500 индивидуальных выпускников по всему миру.',
    education_json: JSON.stringify([
      'МГУ им. М.В. Ломоносова, Факультет психологии',
      'Имидж-дизайн и концептуальный стайлинг',
      'Сертифицированный коуч'
    ]),
    achievements_json: JSON.stringify([
      'Разработала авторский метод синергии психологии и стиля',
      'Более 500 выпускников индивидуального сопровождения'
    ]),
    competencies_json: JSON.stringify([
      'Глубинный анализ личности',
      'Разработка концепций личного бренда',
      'Психологическое консультирование',
      'Концептуальный стайлинг'
    ]),
    quote: '«Внешний вид — это самое быстрое послание, которое вы отправляете миру. Пусть оно будет правдивым.»',
    button_text: 'Связаться',
    button_url: '#lead-form',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  reviews: [],
  leads: [],
  seo_pages: [
    {
      id: 'seo_home',
      page_key: 'home',
      title: 'Проект Я — архитектура личности, образа и реализации',
      description: 'Авторское пространство для тех, кто хочет соединить внутреннее состояние, внешний образ и личную реализацию в одну цельную систему.',
      keywords: 'личность, стиль, образ, реализация, психология, личный бренд, Земфира Хисамутдинова',
      og_title: 'Проект Я — архитектура личности, образа и реализации',
      og_description: 'Авторское пространство для тех, кто хочет соединить внутреннее состояние, внешний образ и личную реализацию в одну цельную систему.',
      og_image_url: 'https://hhzxqrqfeudecnyujowb.supabase.co/storage/v1/object/public/AMIRA/Zemfira.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  design_settings: {
    id: 'design_1',
    primary_color: '#1A1A1A',
    accent_color: '#8C7355',
    background_color: '#F5F2ED',
    text_color: '#1A1A1A',
    heading_font: 'Space Grotesk',
    body_font: 'Inter',
    border_radius: '0px',
    button_style: 'premium',
    animations_enabled: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
};

class JSONDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.data = { ...defaultDb };
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        
        // Check if we need to migrate/update to the clean premium format
        const needsPremiumMigration = !parsed.navigation_items || 
                                      !parsed.navigation_items.some((n: any) => n.url === '#philosophy') || 
                                      !parsed.direction_branches || 
                                      !parsed.directions || 
                                      parsed.directions.length < 3 || 
                                      !parsed.directions[0].key_question;

        // Deep merge or assign to handle new keys cleanly
        this.data = {
          ...defaultDb,
          ...parsed,
          site_settings: { ...defaultDb.site_settings, ...parsed.site_settings },
          founder: { ...defaultDb.founder, ...parsed.founder },
          design_settings: { ...defaultDb.design_settings, ...parsed.design_settings },
          development_areas: parsed.development_areas || [...defaultDb.development_areas],
          direction_branches: parsed.direction_branches || [...defaultDb.direction_branches],
        };

        if (needsPremiumMigration) {
          this.data = { ...defaultDb };
          this.save();
        }
      } else {
        this.save();
      }
    } catch (e) {
      console.error('Failed to init local database file, using fallback in-memory data:', e);
    }
  }

  private save() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (e) {
      console.error('Failed to write to local database file:', e);
    }
  }

  // --- API ---
  public getSettings(): SiteSettings {
    return this.data.site_settings;
  }

  public updateSettings(payload: Partial<SiteSettings>): SiteSettings {
    this.data.site_settings = {
      ...this.data.site_settings,
      ...payload,
      updated_at: new Date().toISOString()
    };
    this.save();
    return this.data.site_settings;
  }

  public getNavigationItems(): NavigationItem[] {
    return [...this.data.navigation_items].sort((a, b) => a.sort_order - b.sort_order);
  }

  public updateNavigationItems(items: NavigationItem[]): NavigationItem[] {
    this.data.navigation_items = items.map(item => ({
      ...item,
      updated_at: new Date().toISOString()
    }));
    this.save();
    return this.getNavigationItems();
  }

  public getPageSections(): PageSection[] {
    return [...this.data.page_sections].sort((a, b) => a.sort_order - b.sort_order);
  }

  public updatePageSection(id: string, payload: Partial<PageSection>): PageSection {
    const idx = this.data.page_sections.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.data.page_sections[idx] = {
        ...this.data.page_sections[idx],
        ...payload,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.page_sections[idx];
    }
    throw new Error(`Section with ID ${id} not found.`);
  }

  public getDirections(): Direction[] {
    return [...this.data.directions].sort((a, b) => a.sort_order - b.sort_order);
  }

  public saveDirection(id: string, payload: Partial<Direction>): Direction {
    const idx = this.data.directions.findIndex(d => d.id === id);
    if (idx !== -1) {
      this.data.directions[idx] = {
        ...this.data.directions[idx],
        ...payload,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.directions[idx];
    } else {
      const newDir: Direction = {
        id: id || 'dir_' + generateId(),
        title: payload.title || 'Новое направление',
        slug: payload.slug || 'new-slug',
        key_question: payload.key_question || '',
        accent_color: payload.accent_color || '',
        short_description: payload.short_description || '',
        full_description: payload.full_description || '',
        image_url: payload.image_url || '',
        icon: payload.icon || 'Compass',
        results_json: payload.results_json || '[]',
        sort_order: payload.sort_order !== undefined ? Number(payload.sort_order) : this.data.directions.length + 1,
        is_published: payload.is_published !== undefined ? payload.is_published : true,
        seo_title: payload.seo_title || '',
        seo_description: payload.seo_description || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.data.directions.push(newDir);
      this.save();
      return newDir;
    }
  }

  public deleteDirection(id: string): boolean {
    const lenBefore = this.data.directions.length;
    this.data.directions = this.data.directions.filter(d => d.id !== id);
    if (this.data.directions.length < lenBefore) {
      this.save();
      return true;
    }
    return false;
  }

  public getDirectionBranches(): DirectionBranch[] {
    if (!this.data.direction_branches) {
      this.data.direction_branches = [];
    }
    return [...this.data.direction_branches].sort((a, b) => a.sort_order - b.sort_order);
  }

  public saveDirectionBranch(id: string | null, payload: Partial<DirectionBranch>): DirectionBranch {
    if (!this.data.direction_branches) {
      this.data.direction_branches = [];
    }
    const targetId = id || payload.id;
    const idx = targetId ? this.data.direction_branches.findIndex(b => b.id === targetId) : -1;
    if (idx !== -1) {
      this.data.direction_branches[idx] = {
        ...this.data.direction_branches[idx],
        ...payload,
        updated_at: new Date().toISOString()
      } as DirectionBranch;
      this.save();
      return this.data.direction_branches[idx];
    } else {
      const newBranch: DirectionBranch = {
        id: targetId || 'br_' + generateId(),
        direction_id: payload.direction_id || '',
        title: payload.title || 'Новая ветка',
        short_description: payload.short_description || '',
        full_description: payload.full_description || '',
        sort_order: payload.sort_order !== undefined ? Number(payload.sort_order) : this.data.direction_branches.length + 1,
        is_published: payload.is_published !== undefined ? payload.is_published : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.data.direction_branches.push(newBranch);
      this.save();
      return newBranch;
    }
  }

  public deleteDirectionBranch(id: string): boolean {
    if (!this.data.direction_branches) {
      this.data.direction_branches = [];
    }
    const lenBefore = this.data.direction_branches.length;
    this.data.direction_branches = this.data.direction_branches.filter(b => b.id !== id);
    if (this.data.direction_branches.length < lenBefore) {
      this.save();
      return true;
    }
    return false;
  }

  public getServices(): Service[] {
    return [...this.data.services].sort((a, b) => a.sort_order - b.sort_order);
  }

  public saveService(id: string, payload: Partial<Service>): Service {
    const idx = this.data.services.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.data.services[idx] = {
        ...this.data.services[idx],
        ...payload,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.services[idx];
    } else {
      const newSrv: Service = {
        id: id || 'srv_' + generateId(),
        title: payload.title || 'Новая услуга',
        slug: payload.slug || 'new-service',
        short_description: payload.short_description || '',
        full_description: payload.full_description || '',
        target_audience: payload.target_audience || '',
        includes_json: payload.includes_json || '[]',
        results_json: payload.results_json || '[]',
        duration: payload.duration || '',
        format: payload.format || '',
        price: payload.price || '',
        button_text: payload.button_text || 'Оставить заявку',
        button_url: payload.button_url || '#lead-form',
        image_url: payload.image_url || '',
        sort_order: payload.sort_order !== undefined ? payload.sort_order : this.data.services.length + 1,
        is_published: payload.is_published !== undefined ? payload.is_published : true,
        seo_title: payload.seo_title || '',
        seo_description: payload.seo_description || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.data.services.push(newSrv);
      this.save();
      return newSrv;
    }
  }

  public deleteService(id: string): boolean {
    const lenBefore = this.data.services.length;
    this.data.services = this.data.services.filter(s => s.id !== id);
    if (this.data.services.length < lenBefore) {
      this.save();
      return true;
    }
    return false;
  }

  public getTeamMembers(): TeamMember[] {
    return [...this.data.team_members].sort((a, b) => a.sort_order - b.sort_order);
  }

  public saveTeamMember(id: string, payload: Partial<TeamMember>): TeamMember {
    const idx = this.data.team_members.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.data.team_members[idx] = {
        ...this.data.team_members[idx],
        ...payload,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.team_members[idx];
    } else {
      const newMember: TeamMember = {
        id: id || 'tm_' + generateId(),
        name: payload.name || 'Имя участника',
        role: payload.role || 'Роль',
        short_description: payload.short_description || '',
        full_description: payload.full_description || '',
        photo_url: payload.photo_url || '',
        social_links_json: payload.social_links_json || '{}',
        sort_order: payload.sort_order !== undefined ? payload.sort_order : this.data.team_members.length + 1,
        is_published: payload.is_published !== undefined ? payload.is_published : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.data.team_members.push(newMember);
      this.save();
      return newMember;
    }
  }

  public deleteTeamMember(id: string): boolean {
    const lenBefore = this.data.team_members.length;
    this.data.team_members = this.data.team_members.filter(t => t.id !== id);
    if (this.data.team_members.length < lenBefore) {
      this.save();
      return true;
    }
    return false;
  }

  public getFounder(): Founder {
    return this.data.founder;
  }

  public updateFounder(payload: Partial<Founder>): Founder {
    this.data.founder = {
      ...this.data.founder,
      ...payload,
      updated_at: new Date().toISOString()
    };
    this.save();
    return this.data.founder;
  }

  public getReviews(): Review[] {
    return [...this.data.reviews].sort((a, b) => a.sort_order - b.sort_order);
  }

  public saveReview(id: string, payload: Partial<Review>): Review {
    const idx = this.data.reviews.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.data.reviews[idx] = {
        ...this.data.reviews[idx],
        ...payload,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.reviews[idx];
    } else {
      const newRev: Review = {
        id: id || 'rev_' + generateId(),
        client_name: payload.client_name || 'Имя клиента',
        client_role: payload.client_role || 'Роль',
        client_photo_url: payload.client_photo_url || '',
        review_text: payload.review_text || '',
        result_text: payload.result_text || '',
        review_date: payload.review_date || '',
        sort_order: payload.sort_order !== undefined ? payload.sort_order : this.data.reviews.length + 1,
        is_published: payload.is_published !== undefined ? payload.is_published : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.data.reviews.push(newRev);
      this.save();
      return newRev;
    }
  }

  public deleteReview(id: string): boolean {
    const lenBefore = this.data.reviews.length;
    this.data.reviews = this.data.reviews.filter(r => r.id !== id);
    if (this.data.reviews.length < lenBefore) {
      this.save();
      return true;
    }
    return false;
  }

  public getLeads(): Lead[] {
    return [...this.data.leads].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public createLead(payload: Omit<Lead, 'id' | 'status' | 'admin_comment' | 'created_at' | 'updated_at'>): Lead {
    const newLead: Lead = {
      id: 'lead_' + generateId(),
      ...payload,
      status: 'new',
      admin_comment: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.data.leads.push(newLead);
    this.save();
    return newLead;
  }

  public updateLead(id: string, payload: Partial<Lead>): Lead {
    const idx = this.data.leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.data.leads[idx] = {
        ...this.data.leads[idx],
        ...payload,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.leads[idx];
    }
    throw new Error(`Lead with ID ${id} not found.`);
  }

  public getSeoPages(): SeoPage[] {
    return this.data.seo_pages;
  }

  public saveSeoPage(pageKey: string, payload: Partial<SeoPage>): SeoPage {
    const idx = this.data.seo_pages.findIndex(s => s.page_key === pageKey);
    if (idx !== -1) {
      this.data.seo_pages[idx] = {
        ...this.data.seo_pages[idx],
        ...payload,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.seo_pages[idx];
    } else {
      const newSeo: SeoPage = {
        id: 'seo_' + generateId(),
        page_key: pageKey,
        title: payload.title || '',
        description: payload.description || '',
        keywords: payload.keywords || '',
        og_title: payload.og_title || '',
        og_description: payload.og_description || '',
        og_image_url: payload.og_image_url || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.data.seo_pages.push(newSeo);
      this.save();
      return newSeo;
    }
  }

  public getDesignSettings(): DesignSettings {
    return this.data.design_settings;
  }

  public updateDesignSettings(payload: Partial<DesignSettings>): DesignSettings {
    this.data.design_settings = {
      ...this.data.design_settings,
      ...payload,
      updated_at: new Date().toISOString()
    };
    this.save();
    return this.data.design_settings;
  }

  public getDevelopmentAreas(): DevelopmentArea[] {
    if (!this.data.development_areas) {
      this.data.development_areas = [...defaultDb.development_areas];
    }
    return [...this.data.development_areas].sort((a, b) => a.sort_order - b.sort_order);
  }

  public saveDevelopmentArea(id: string, payload: Partial<DevelopmentArea>): DevelopmentArea {
    if (!this.data.development_areas) {
      this.data.development_areas = [...defaultDb.development_areas];
    }
    const idx = this.data.development_areas.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.data.development_areas[idx] = {
        ...this.data.development_areas[idx],
        ...payload,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.development_areas[idx];
    } else {
      const newArea: DevelopmentArea = {
        id: id || 'area_' + generateId(),
        title: payload.title || 'Новая сфера',
        slug: payload.slug || 'new-area',
        short_description: payload.short_description || '',
        full_description: payload.full_description || '',
        icon: payload.icon || 'Activity',
        image_url: payload.image_url || '',
        tasks_json: payload.tasks_json || '[]',
        results_json: payload.results_json || '[]',
        sort_order: payload.sort_order !== undefined ? payload.sort_order : this.data.development_areas.length + 1,
        is_published: payload.is_published !== undefined ? payload.is_published : true,
        seo_title: payload.seo_title || '',
        seo_description: payload.seo_description || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.data.development_areas.push(newArea);
      this.save();
      return newArea;
    }
  }

  public deleteDevelopmentArea(id: string): boolean {
    if (!this.data.development_areas) {
      this.data.development_areas = [...defaultDb.development_areas];
    }
    const lenBefore = this.data.development_areas.length;
    this.data.development_areas = this.data.development_areas.filter(a => a.id !== id);
    if (this.data.development_areas.length < lenBefore) {
      this.save();
      return true;
    }
    return false;
  }
}

export const dbServer = new JSONDatabase();
