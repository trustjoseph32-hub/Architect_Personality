export interface SiteSettings {
  id: string;
  site_name: string;
  logo_text: string;
  logo_image_url: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  telegram_url: string;
  whatsapp_url: string;
  instagram_url: string;
  vk_url: string;
  youtube_url: string;
  copyright_text: string;
  privacy_policy_url: string;
  personal_data_url: string;
  created_at: string;
  updated_at: string;
}

export type NavigationItemType = 'anchor' | 'page' | 'external';

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  type: NavigationItemType;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PageSection {
  id: string;
  page_key: string;
  section_key: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  content: string;
  quote: string;
  image_url: string;
  button_text: string;
  button_url: string;
  sort_order: number;
  is_active: boolean;
  data_json: string; // Used for flexible lists (e.g., principles)
  created_at: string;
  updated_at: string;
}

export interface Direction {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  image_url: string;
  icon: string;
  results_json: string; // List of results/outcomes
  sort_order: number;
  is_published: boolean;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  target_audience: string;
  includes_json: string; // List of what's included
  results_json: string; // List of outcomes
  duration: string;
  format: string;
  price: string;
  button_text: string;
  button_url: string;
  image_url: string;
  sort_order: number;
  is_published: boolean;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  short_description: string;
  full_description: string;
  photo_url: string;
  social_links_json: string; // JSON object with links
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  short_description: string;
  full_bio: string;
  experience: string;
  education_json: string; // Array of education items
  achievements_json: string; // Array of achievements
  competencies_json: string; // Array of competencies
  quote: string;
  button_text: string;
  button_url: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  client_name: string;
  client_role: string;
  client_photo_url: string;
  review_text: string;
  result_text: string;
  review_date: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 'new' | 'in_progress' | 'closed';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  messenger: string;
  direction: string;
  message: string;
  status: LeadStatus;
  admin_comment: string;
  created_at: string;
  updated_at: string;
}

export interface SeoPage {
  id: string;
  page_key: string;
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
  created_at: string;
  updated_at: string;
}

export type ButtonStyleType = 'soft' | 'strict' | 'premium';

export interface DesignSettings {
  id: string;
  primary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  heading_font: string;
  body_font: string;
  border_radius: string; // e.g. "0px", "8px", "16px"
  button_style: ButtonStyleType;
  animations_enabled: boolean;
  created_at: string;
  updated_at: string;
}

// Composite full state object for local db persistence
export interface DatabaseSchema {
  site_settings: SiteSettings;
  navigation_items: NavigationItem[];
  page_sections: PageSection[];
  directions: Direction[];
  services: Service[];
  team_members: TeamMember[];
  founder: Founder;
  reviews: Review[];
  leads: Lead[];
  seo_pages: SeoPage[];
  design_settings: DesignSettings;
}
