import fs from 'fs';
import path from 'path';
import { DatabaseSchema, SiteSettings, NavigationItem, PageSection, Direction, Service, TeamMember, Founder, Review, Lead, SeoPage, DesignSettings } from '../types.js';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Helper to guarantee unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

const defaultDb: DatabaseSchema = {
  site_settings: {
    id: 'settings_1',
    site_name: 'Проект Я: Архитектор личности',
    logo_text: 'ПРОЕКТ Я',
    logo_image_url: '',
    phone: '+7 (999) 123-45-67',
    email: 'hello@project-ya.ru',
    city: 'Москва',
    address: 'Пресненская набережная, 12, Москва-Сити',
    telegram_url: 'https://t.me/project_ya',
    whatsapp_url: 'https://wa.me/79991234567',
    instagram_url: 'https://instagram.com/project_ya',
    vk_url: 'https://vk.com/project_ya',
    youtube_url: 'https://youtube.com/project_ya',
    copyright_text: '© 2026 Проект Я. Все права защищены.',
    privacy_policy_url: '#',
    personal_data_url: '#',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  navigation_items: [
    { id: 'nav_1', label: 'Философия', url: '#philosophy', type: 'anchor', sort_order: 1, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_2', label: 'О проекте', url: '/about', type: 'page', sort_order: 2, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_3', label: 'Направления', url: '/directions', type: 'page', sort_order: 3, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_4', label: 'Услуги', url: '#services', type: 'anchor', sort_order: 4, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_5', label: 'Команда', url: '/team', type: 'page', sort_order: 5, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_6', label: 'Основатель', url: '/founder', type: 'page', sort_order: 6, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_7', label: 'Отзывы', url: '/reviews', type: 'page', sort_order: 7, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'nav_8', label: 'Контакты', url: '/contacts', type: 'page', sort_order: 8, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ],
  page_sections: [
    {
      id: 'sec_hero',
      page_key: 'home',
      section_key: 'hero',
      title: 'Проект “Я”: архитектор личности',
      subtitle: 'Пространство для раскрытия аутентичности, личного стиля и внутренней опоры',
      eyebrow: 'Проект раскрытия индивидуальности',
      content: 'Мы помогаем человеку увидеть свою индивидуальность, соединить внутреннее состояние с внешним образом и выстроить личную стратегию проявления в жизни, профессии и отношениях.',
      quote: '',
      image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
      button_text: 'Оставить заявку',
      button_url: '#lead-form',
      sort_order: 1,
      is_active: true,
      data_json: JSON.stringify({
        secondary_button_text: 'Узнать подробнее',
        secondary_button_url: '#philosophy',
        additional_image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
      }),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sec_philosophy',
      page_key: 'home',
      section_key: 'philosophy',
      title: 'Наша Философия',
      subtitle: 'Трансформация через осознанность и стиль',
      eyebrow: 'ЦЕННОСТИ И ПРИНЦИПЫ',
      content: 'Мы верим, что истинная красота и сила человека рождаются на стыке глубокого понимания себя и гармоничного внешнего проявления. Наш подход базируется на пяти фундаментальных принципах:',
      quote: '«Быть собой — это не роскошь, а единственно верная стратегия жизни.»',
      image_url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800',
      button_text: '',
      button_url: '',
      sort_order: 2,
      is_active: true,
      data_json: JSON.stringify([
        { title: 'Аутентичность', description: 'Быть верным своей природе и не пытаться соответствовать чужим ожиданиям.' },
        { title: 'Индивидуальность', description: 'Каждая личность — уникальный архитектурный ансамбль со своими пропорциями, смыслами и талантами.' },
        { title: 'Внутренняя опора', description: 'Развитие психологической устойчивости и глубокого понимания своих сильных сторон.' },
        { title: 'Осознанный образ', description: 'Одежда и стиль как продолжение внутреннего мира, а не просто слепое следование трендам.' },
        { title: 'Реализация через природу', description: 'Раскрытие потенциала без выгорания и надрыва, следуя своим подлинным ценностям.' }
      ]),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sec_about',
      page_key: 'home',
      section_key: 'about',
      title: 'О проекте',
      subtitle: 'Пространство, где индивидуальность становится системой',
      eyebrow: 'ИМИДЖЕВЫЙ ЛОНГРИД',
      content: 'Проект “Я” возник как ответ на потребность современного человека в глубоком самопознании и поиске своего подлинного проявления. Мы объединили методы современной практической психологии, телесного коучинга и концептуальной стилистики, чтобы создать комплексный подход к развитию личности.',
      quote: '«Мы создаем пространство, где ваша индивидуальность становится не случайностью, а выверенной системой.»',
      image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
      button_text: 'Читать миссию',
      button_url: '/about',
      sort_order: 3,
      is_active: true,
      data_json: JSON.stringify({
        mission: 'Помочь каждому человеку раскрыть свой уникальный код личности, обрести уверенность и проявить свою внутреннюю эстетику во внешнем мире.',
        values: [
          'Уважение к уникальной истории каждого человека',
          'Глубинный психологический подход взамен поверхностных решений',
          'Эстетика и качество в каждой детали взаимодействия',
          'Научно доказанные методы коучинга и психотерапии'
        ]
      }),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  directions: [
    {
      id: 'dir_1',
      title: 'Личная стратегия',
      slug: 'personal-strategy',
      short_description: 'Проектирование жизненного пути на основе ваших ценностей и потенциала.',
      full_description: 'Глубокая индивидуальная работа по определению ваших ключевых ориентиров, сильных сторон и барьеров. Мы создаем пошаговый план развития вашей личности в карьере, отношениях и самореализации, опираясь на ваши подлинные стремления, а не навязанные стереотипы.',
      image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      icon: 'Compass',
      results_json: JSON.stringify([
        'Ясное понимание своих жизненных целей на 3-5 лет',
        'Список личных ценностей и сильных качеств',
        'Освобождение от синдрома самозванца',
        'Пошаговый план проявления в социуме'
      ]),
      sort_order: 1,
      is_published: true,
      seo_title: 'Личная стратегия развития личности | Проект Я',
      seo_description: 'Проектирование жизненного пути на основе личных ценностей.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'dir_2',
      title: 'Индивидуальный стиль',
      slug: 'personal-style',
      short_description: 'Создание визуального образа, транслирующего ваши смыслы и статус.',
      full_description: 'Стиль — это не про моду, это невербальный диалог с миром. Мы помогаем составить гармоничный гардероб, который транслирует ваш характер, ценности и профессиональный статус, делая вас уверенными в любой ситуации.',
      image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      icon: 'Sparkles',
      results_json: JSON.stringify([
        'Идеально подобранная палитра цветов и силуэтов',
        'Капсульный гардероб под ваши задачи',
        'Экономия времени при покупках',
        'Уверенность в своем внешнем виде на 100%'
      ]),
      sort_order: 2,
      is_published: true,
      seo_title: 'Создание индивидуального стиля | Проект Я',
      seo_description: 'Разработка визуального образа и гардероба на основе внутренних смыслов.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'dir_3',
      title: 'Психология образа',
      slug: 'image-psychology',
      short_description: 'Синхронизация внутреннего самоощущения с внешним проявлением.',
      full_description: 'Интегративный подход на стыке психотерапии и стилистики. Мы исследуем ваши внутренние зажимы, страхи проявления, проблемы с самооценкой и через работу с телом, цветом и текстурами помогаем принять и полюбить свое истинное "Я".',
      image_url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800',
      icon: 'UserCheck',
      results_json: JSON.stringify([
        'Принятие своей телесности',
        'Снятие блоков на проявление себя',
        'Осознание психологических защит через одежду',
        'Глубокое чувство внутренней свободы'
      ]),
      sort_order: 3,
      is_published: true,
      seo_title: 'Психология образа и терапия стиля | Проект Я',
      seo_description: 'Синхронизация внутреннего состояния с внешним видом на стыке психологии и моды.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  services: [
    {
      id: 'srv_1',
      title: 'Индивидуальное сопровождение «Архитектура Я»',
      slug: 'architecture-of-me',
      short_description: '3-месячная премиальная программа глубинной трансформации личности и стиля.',
      full_description: 'Это флагманский продукт нашего проекта. Полное погружение в исследование вашей личности, психологических опор и внешнего имиджа с личным ведением от основателя и ведущих экспертов.',
      target_audience: 'Предприниматели, эксперты, руководители и все, кто находится на пороге масштабных жизненных изменений.',
      includes_json: JSON.stringify([
        '12 индивидуальных сессий с психологом и стилистом',
        'Разработка персональной карты стиля и книги ценностей',
        'Ревизия гардероба и совместный шопинг-сопровождение',
        'Поддержка в мессенджере 24/7 в течение всей программы'
      ]),
      results_json: JSON.stringify([
        'Полное обновление имиджа и гардероба',
        'Четкая стратегия позиционирования и проявления',
        'Обретение внутренней уверенности и свободы самовыражения'
      ]),
      duration: '3 месяца',
      format: 'Офлайн (Москва) или Онлайн (весь мир)',
      price: '180 000 ₽',
      button_text: 'Оставить заявку',
      button_url: '#lead-form',
      image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      sort_order: 1,
      is_published: true,
      seo_title: 'Индивидуальное сопровождение Архитектура Я | Проект Я',
      seo_description: 'Премиальная программа трансформации личности и стиля.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'srv_2',
      title: 'Экспресс-аудит личности и стиля',
      slug: 'express-audit',
      short_description: 'Однократная двухчасовая сессия для определения вектора вашего развития.',
      full_description: 'Интенсивный разбор вашего текущего состояния, гардероба и позиционирования. Отличная возможность получить быстрый и честный экспертный взгляд со стороны и наметить план самостоятельных действий.',
      target_audience: 'Тем, кто хочет познакомиться с методологией проекта и получить точечные рекомендации.',
      includes_json: JSON.stringify([
        'Предварительное анкетирование',
        '2-часовая стратегическая онлайн-сессия',
        'Презентация с рекомендациями по стилю и развитию'
      ]),
      results_json: JSON.stringify([
        'Понимание ключевых ошибок в текущем образе',
        '3 практических направления для развития стиля',
        'Рекомендации по преодолению страха проявления'
      ]),
      duration: '1 день',
      format: 'Онлайн в Zoom',
      price: '25 000 ₽',
      button_text: 'Оставить заявку',
      button_url: '#lead-form',
      image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
      sort_order: 2,
      is_published: true,
      seo_title: 'Экспресс-аудит личности и стиля | Проект Я',
      seo_description: 'Онлайн сессия разбора образа и стратегии самовыражения.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  team_members: [
    {
      id: 'tm_1',
      name: 'Екатерина Миронова',
      role: 'Старший психотерапевт-коуч',
      short_description: 'Специалист по телесно-ориентированной терапии и глубинному коучингу с опытом более 8 лет.',
      full_description: 'Екатерина помогает клиентам обнаружить свои истинные ценности, снять телесные зажимы и страхи, мешающие самовыражению. В своей работе использует интегративный подход, сочетающий гештальт-терапию и современный коучинг.',
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      social_links_json: JSON.stringify({ telegram: 'https://t.me/kate_mironova' }),
      sort_order: 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'tm_2',
      name: 'Александр Орлов',
      role: 'Концептуальный стилист',
      short_description: 'Имидж-дизайнер, эксперт по визуальной коммуникации. Создает гардеробы со смыслом.',
      full_description: 'Александр рассматривает одежду как продолжение характера человека. Работал с ведущими российскими брендами и медийными личностями. Помогает соединить статус, удобство и художественную эстетику.',
      photo_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      social_links_json: JSON.stringify({ telegram: 'https://t.me/orlov_stylist' }),
      sort_order: 2,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  founder: {
    id: 'fnd_1',
    name: 'Земфира Хисамутдинова',
    role: 'Основатель Проекта, Психолог-Имиджмейкер',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    short_description: 'Автор уникальной методики синергии психологии и стиля. Более 10 лет опыта работы с первыми лицами.',
    full_bio: 'Земфира Хисамутдинова посвятила более десяти лет изучению того, как наш внутренний мир отражается в наших внешних выборах. Получив образование в сфере практической психологии и концептуального стайлинга во Франции, она объединила эти дисциплины в единую стройную систему. Земфира убеждена, что одежда — это мощнейший инструмент психологической саморегуляции и социальной коммуникации.',
    experience: '12 лет практики, более 500 индивидуальных выпускников по всему миру, спикер отраслевых конференций.',
    education_json: JSON.stringify([
      'МГУ им. М.В. Ломоносова, Факультет психологии',
      'Istituto Marangoni (Париж), Имидж-дизайн и стайлинг',
      'Сертифицированный коуч ICF'
    ]),
    achievements_json: JSON.stringify([
      'Разработала авторский курс «Психология проявления»',
      'Публикации в Vogue, Harper’s Bazaar, Psychologies',
      'Приглашенный лектор в ведущих школах стиля России'
    ]),
    competencies_json: JSON.stringify([
      'Глубинный анализ личности',
      'Разработка концепций личных брендов',
      'Психологическое консультирование',
      'Концептуальный стайлинг'
    ]),
    quote: '«Внешний вид — это самое быстрое послание, которое вы отправляете миру. Пусть оно будет правдивым.»',
    button_text: 'Оставить заявку на консультацию',
    button_url: '#lead-form',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  reviews: [
    {
      id: 'rev_1',
      client_name: 'Мария Ковалева',
      client_role: 'Основательница IT-стартапа',
      client_photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
      review_text: 'Программа «Архитектура Я» разделила мою жизнь на до и после. Я пришла с полной потерей ориентиров и непониманием, кто я в новой роли лидера. Алёна и ее команда помогли мне раскопать свои подлинные опоры. А стиль, который мне создали, теперь придает мне невероятную силу на переговорах с инвесторами.',
      result_text: 'Обрела уверенность лидера, привлекла инвестиции на $1.5M, полностью обновила гардероб.',
      review_date: 'Июнь 2026',
      sort_order: 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'rev_2',
      client_name: 'Дмитрий Шепелев',
      client_role: 'Топ-менеджер финансовой компании',
      client_photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      review_text: 'Никогда не думал, что работа со стилистом может быть настолько психологически глубокой. Здесь нет навязывания модных трендов. Мы шли от моих ценностей, целей и внутреннего ощущения. Результат поразил — одежда села как вторая кожа, а общение с коллегами и партнерами стало более искренним и продуктивным.',
      result_text: 'Составил гардероб-капсулу из 25 вещей, закрыл сделку года, чувствую себя на 10/10.',
      review_date: 'Май 2026',
      sort_order: 2,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  leads: [
    {
      id: 'lead_1',
      name: 'София Соколова',
      phone: '+7 911 222-33-44',
      email: 'sofia@mail.ru',
      messenger: 'Telegram: @sofia_s',
      direction: 'Личная стратегия',
      message: 'Здравствуйте! Хочу записаться на программу "Архитектура Я". Интересует личная стратегия и работа со стилем.',
      status: 'new',
      admin_comment: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'lead_2',
      name: 'Артем Лебедев',
      phone: '+7 922 555-66-77',
      email: 'artem@design.ru',
      messenger: 'WhatsApp: +79225556677',
      direction: 'Индивидуальный стиль',
      message: 'Приветствую! Нужен аудит гардероба и подбор нового стиля под выступление на конференции.',
      status: 'in_progress',
      admin_comment: 'Договорились о созвоне в пятницу',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  seo_pages: [
    {
      id: 'seo_home',
      page_key: 'home',
      title: 'Архитектор личности | Проект Я',
      description: 'Премиальный экспертный проект по раскрытию индивидуальности, самопознанию, стилю и психологии.',
      keywords: 'психология, стиль, индивидуальность, саморазвитие, эксперт, личный бренд',
      og_title: 'Архитектор личности | Проект Я',
      og_description: 'Премиальный экспертный проект по раскрытию индивидуальности, самопознанию, стилю и психологии.',
      og_image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
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
    heading_font: 'Cormorant Garamond',
    body_font: 'Montserrat',
    border_radius: '9999px',
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
        // Deep merge or assign to handle new keys cleanly
        this.data = {
          ...defaultDb,
          ...parsed,
          site_settings: { ...defaultDb.site_settings, ...parsed.site_settings },
          founder: { ...defaultDb.founder, ...parsed.founder },
          design_settings: { ...defaultDb.design_settings, ...parsed.design_settings },
        };
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
        short_description: payload.short_description || '',
        full_description: payload.full_description || '',
        image_url: payload.image_url || '',
        icon: payload.icon || 'Compass',
        results_json: payload.results_json || '[]',
        sort_order: payload.sort_order !== undefined ? payload.sort_order : this.data.directions.length + 1,
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
}

export const dbServer = new JSONDatabase();
