import { DatabaseSchema, SiteSettings, NavigationItem, PageSection, Direction, DirectionBranch, DevelopmentArea, Service, TeamMember, Founder, Review, Lead, SeoPage, DesignSettings } from '../types.js';

const API_BASE = '';

// Get admin token from storage
const getAdminToken = () => localStorage.getItem('admin_token') || '';

// Base fetch wrapper
async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, { ...options, headers });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${res.status}`);
  }
  
  return res.json() as Promise<T>;
}

export const api = {
  // Public Data
  getPublicData: () => apiRequest<{
    settings: SiteSettings;
    navigation_items: NavigationItem[];
    page_sections: PageSection[];
    directions: Direction[];
    direction_branches: DirectionBranch[];
    development_areas: DevelopmentArea[];
    services: Service[];
    team_members: TeamMember[];
    founder: Founder;
    reviews: Review[];
    design_settings: DesignSettings;
  }>(`${API_BASE}/api/public/data`),

  submitLead: (payload: {
    name: string;
    phone: string;
    email: string;
    messenger: string;
    direction: string;
    message: string;
    selected_areas?: string[];
    desired_changes?: string;
    main_obstacle?: string;
  }) => apiRequest<{ success: boolean; lead: Lead }>(`${API_BASE}/api/public/leads`, {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  // Admin Auth
  adminLogin: (email: string, password: string) => 
    apiRequest<{ token: string }>(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  verifyAdminToken: () => 
    apiRequest<{ valid: boolean }>(`${API_BASE}/api/admin/verify`),

  // Leads
  getLeads: () => apiRequest<Lead[]>(`${API_BASE}/api/admin/leads`),
  updateLead: (id: string, payload: Partial<Lead>) => 
    apiRequest<Lead>(`${API_BASE}/api/admin/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  // Settings
  updateSettings: (payload: Partial<SiteSettings>) => 
    apiRequest<SiteSettings>(`${API_BASE}/api/admin/settings`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  // Navigation Items
  updateNavigation: (items: NavigationItem[]) => 
    apiRequest<NavigationItem[]>(`${API_BASE}/api/admin/navigation`, {
      method: 'PUT',
      body: JSON.stringify(items)
    }),

  // Sections
  updateSection: (id: string, payload: Partial<PageSection>) => 
    apiRequest<PageSection>(`${API_BASE}/api/admin/sections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  // Directions
  getDirections: () => apiRequest<Direction[]>(`${API_BASE}/api/admin/directions`),
  saveDirection: (id: string | null, payload: Partial<Direction>) => 
    apiRequest<Direction>(id ? `${API_BASE}/api/admin/directions/${id}` : `${API_BASE}/api/admin/directions`, {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    }),
  deleteDirection: (id: string) => 
    apiRequest<{ success: boolean }>(`${API_BASE}/api/admin/directions/${id}`, {
      method: 'DELETE'
    }),

  // Direction Branches
  getDirectionBranches: () => apiRequest<DirectionBranch[]>(`${API_BASE}/api/admin/direction-branches`),
  saveDirectionBranch: (id: string | null, payload: Partial<DirectionBranch>) =>
    apiRequest<DirectionBranch>(id ? `${API_BASE}/api/admin/direction-branches/${id}` : `${API_BASE}/api/admin/direction-branches`, {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    }),
  deleteDirectionBranch: (id: string) =>
    apiRequest<{ success: boolean }>(`${API_BASE}/api/admin/direction-branches/${id}`, {
      method: 'DELETE'
    }),

  // Services
  getServices: () => apiRequest<Service[]>(`${API_BASE}/api/admin/services`),
  saveService: (id: string | null, payload: Partial<Service>) => 
    apiRequest<Service>(id ? `${API_BASE}/api/admin/services/${id}` : `${API_BASE}/api/admin/services`, {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    }),
  deleteService: (id: string) => 
    apiRequest<{ success: boolean }>(`${API_BASE}/api/admin/services/${id}`, {
      method: 'DELETE'
    }),

  // Team
  getTeam: () => apiRequest<TeamMember[]>(`${API_BASE}/api/admin/team`),
  saveTeamMember: (id: string | null, payload: Partial<TeamMember>) => 
    apiRequest<TeamMember>(id ? `${API_BASE}/api/admin/team/${id}` : `${API_BASE}/api/admin/team`, {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    }),
  deleteTeamMember: (id: string) => 
    apiRequest<{ success: boolean }>(`${API_BASE}/api/admin/team/${id}`, {
      method: 'DELETE'
    }),

  // Founder
  getFounder: () => apiRequest<Founder>(`${API_BASE}/api/admin/founder`),
  updateFounder: (payload: Partial<Founder>) => 
    apiRequest<Founder>(`${API_BASE}/api/admin/founder`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  // Reviews
  getReviews: () => apiRequest<Review[]>(`${API_BASE}/api/admin/reviews`),
  saveReview: (id: string | null, payload: Partial<Review>) => 
    apiRequest<Review>(id ? `${API_BASE}/api/admin/reviews/${id}` : `${API_BASE}/api/admin/reviews`, {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    }),
  deleteReview: (id: string) => 
    apiRequest<{ success: boolean }>(`${API_BASE}/api/admin/reviews/${id}`, {
      method: 'DELETE'
    }),

  // SEO
  getSeoPages: () => apiRequest<SeoPage[]>(`${API_BASE}/api/admin/seo`),
  saveSeoPage: (pageKey: string, payload: Partial<SeoPage>) => 
    apiRequest<SeoPage>(`${API_BASE}/api/admin/seo/${pageKey}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  // Design Settings
  updateDesignSettings: (payload: Partial<DesignSettings>) => 
    apiRequest<DesignSettings>(`${API_BASE}/api/admin/design`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  // Development Areas
  getDevelopmentAreas: () => apiRequest<DevelopmentArea[]>(`${API_BASE}/api/admin/development-areas`),
  saveDevelopmentArea: (id: string | null, payload: Partial<DevelopmentArea>) => 
    apiRequest<DevelopmentArea>(id ? `${API_BASE}/api/admin/development-areas/${id}` : `${API_BASE}/api/admin/development-areas`, {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    }),
  deleteDevelopmentArea: (id: string) => 
    apiRequest<{ success: boolean }>(`${API_BASE}/api/admin/development-areas/${id}`, {
      method: 'DELETE'
    }),

  // Media
  getMediaFiles: () => apiRequest<Array<{ name: string; url: string; size: string; uploaded_at: string }>>(`${API_BASE}/api/admin/media`),
  uploadMedia: (filename: string, base64Data: string) => 
    apiRequest<{ url: string; name: string }>(`${API_BASE}/api/admin/upload`, {
      method: 'POST',
      body: JSON.stringify({ filename, data: base64Data })
    }),
  deleteMedia: (filename: string) => 
    apiRequest<{ success: boolean }>(`${API_BASE}/api/admin/media/${filename}`, {
      method: 'DELETE'
    })
};
export default api;
