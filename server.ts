import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { dbServer } from './src/lib/db-server.js';

const app = express();
const PORT = 3000;

// Increase JSON payload limits to support Base64 file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure upload directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded media statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Simple Cookie-free Admin Auth validation
const AUTH_TOKEN = 'mock-premium-admin-token-2026';

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${AUTH_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: 'Неавторизованный доступ. Необходимы права администратора.' });
  }
}

// --- PUBLIC API ROUTES ---

// Aggregate public data fetch
app.get('/api/public/data', (req, res) => {
  try {
    const response = {
      settings: dbServer.getSettings(),
      navigation_items: dbServer.getNavigationItems(),
      page_sections: dbServer.getPageSections(),
      directions: dbServer.getDirections().filter(d => d.is_published),
      direction_branches: dbServer.getDirectionBranches().filter(b => b.is_published),
      development_areas: dbServer.getDevelopmentAreas().filter(a => a.is_published),
      services: dbServer.getServices().filter(s => s.is_published),
      team_members: dbServer.getTeamMembers().filter(t => t.is_published),
      founder: dbServer.getFounder(),
      reviews: dbServer.getReviews().filter(r => r.is_published),
      design_settings: dbServer.getDesignSettings()
    };
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create Lead (Public Submit Form)
app.post('/api/public/leads', (req, res) => {
  try {
    const { name, phone, email, messenger, direction, message, selected_areas, desired_changes, main_obstacle } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Поле "Имя" обязательно для заполнения' });
    }
    if (!phone && !email) {
      return res.status(400).json({ error: 'Необходимо указать Телефон или Email для связи' });
    }
    const lead = dbServer.createLead({
      name,
      phone,
      email,
      messenger,
      direction,
      message,
      selected_areas,
      desired_changes,
      main_obstacle
    });
    res.status(201).json({ success: true, lead });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- ADMIN AUTH ROUTE ---
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  // Standard default admin credentials
  if (email === 'admin@project-ya.ru' && password === 'adminpassword') {
    res.json({ token: AUTH_TOKEN });
  } else {
    res.status(401).json({ error: 'Неверный логин или пароль. Попробуйте admin@project-ya.ru / adminpassword' });
  }
});

// Verify token route
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${AUTH_TOKEN}`) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
});

// --- ADMIN PROTECTED ROUTES ---

// Leads Management
app.get('/api/admin/leads', requireAdmin, (req, res) => {
  res.json(dbServer.getLeads());
});

app.put('/api/admin/leads/:id', requireAdmin, (req, res) => {
  try {
    const lead = dbServer.updateLead(req.params.id, req.body);
    res.json(lead);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

// Site Settings
app.put('/api/admin/settings', requireAdmin, (req, res) => {
  try {
    const settings = dbServer.updateSettings(req.body);
    res.json(settings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Page Sections
app.put('/api/admin/sections/:id', requireAdmin, (req, res) => {
  try {
    const section = dbServer.updatePageSection(req.params.id, req.body);
    res.json(section);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

// Navigation Items
app.put('/api/admin/navigation', requireAdmin, (req, res) => {
  try {
    const items = dbServer.updateNavigationItems(req.body);
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Directions CRUD
app.get('/api/admin/directions', requireAdmin, (req, res) => {
  res.json(dbServer.getDirections());
});

app.post('/api/admin/directions', requireAdmin, (req, res) => {
  try {
    const dir = dbServer.saveDirection('', req.body);
    res.status(201).json(dir);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/directions/:id', requireAdmin, (req, res) => {
  try {
    const dir = dbServer.saveDirection(req.params.id, req.body);
    res.json(dir);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/directions/:id', requireAdmin, (req, res) => {
  try {
    const success = dbServer.deleteDirection(req.params.id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Direction Branches CRUD
app.get('/api/admin/direction-branches', requireAdmin, (req, res) => {
  res.json(dbServer.getDirectionBranches());
});

app.post('/api/admin/direction-branches', requireAdmin, (req, res) => {
  try {
    const branch = dbServer.saveDirectionBranch('', req.body);
    res.status(201).json(branch);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/direction-branches/:id', requireAdmin, (req, res) => {
  try {
    const branch = dbServer.saveDirectionBranch(req.params.id, req.body);
    res.json(branch);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/direction-branches/:id', requireAdmin, (req, res) => {
  try {
    const success = dbServer.deleteDirectionBranch(req.params.id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Development Areas CRUD
app.get('/api/admin/development-areas', requireAdmin, (req, res) => {
  res.json(dbServer.getDevelopmentAreas());
});

app.post('/api/admin/development-areas', requireAdmin, (req, res) => {
  try {
    const area = dbServer.saveDevelopmentArea('', req.body);
    res.status(201).json(area);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/development-areas/:id', requireAdmin, (req, res) => {
  try {
    const area = dbServer.saveDevelopmentArea(req.params.id, req.body);
    res.json(area);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/development-areas/:id', requireAdmin, (req, res) => {
  try {
    const success = dbServer.deleteDevelopmentArea(req.params.id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Services CRUD
app.get('/api/admin/services', requireAdmin, (req, res) => {
  res.json(dbServer.getServices());
});

app.post('/api/admin/services', requireAdmin, (req, res) => {
  try {
    const srv = dbServer.saveService('', req.body);
    res.status(201).json(srv);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/services/:id', requireAdmin, (req, res) => {
  try {
    const srv = dbServer.saveService(req.params.id, req.body);
    res.json(srv);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/services/:id', requireAdmin, (req, res) => {
  try {
    const success = dbServer.deleteService(req.params.id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Team Members CRUD
app.get('/api/admin/team', requireAdmin, (req, res) => {
  res.json(dbServer.getTeamMembers());
});

app.post('/api/admin/team', requireAdmin, (req, res) => {
  try {
    const member = dbServer.saveTeamMember('', req.body);
    res.status(201).json(member);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/team/:id', requireAdmin, (req, res) => {
  try {
    const member = dbServer.saveTeamMember(req.params.id, req.body);
    res.json(member);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/team/:id', requireAdmin, (req, res) => {
  try {
    const success = dbServer.deleteTeamMember(req.params.id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Founder Settings
app.get('/api/admin/founder', requireAdmin, (req, res) => {
  res.json(dbServer.getFounder());
});

app.put('/api/admin/founder', requireAdmin, (req, res) => {
  try {
    const founder = dbServer.updateFounder(req.body);
    res.json(founder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Reviews CRUD
app.get('/api/admin/reviews', requireAdmin, (req, res) => {
  res.json(dbServer.getReviews());
});

app.post('/api/admin/reviews', requireAdmin, (req, res) => {
  try {
    const review = dbServer.saveReview('', req.body);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/reviews/:id', requireAdmin, (req, res) => {
  try {
    const review = dbServer.saveReview(req.params.id, req.body);
    res.json(review);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/reviews/:id', requireAdmin, (req, res) => {
  try {
    const success = dbServer.deleteReview(req.params.id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// SEO Page Settings
app.get('/api/admin/seo', requireAdmin, (req, res) => {
  res.json(dbServer.getSeoPages());
});

app.put('/api/admin/seo/:pageKey', requireAdmin, (req, res) => {
  try {
    const seo = dbServer.saveSeoPage(req.params.pageKey, req.body);
    res.json(seo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Design Settings
app.put('/api/admin/design', requireAdmin, (req, res) => {
  try {
    const design = dbServer.updateDesignSettings(req.body);
    res.json(design);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Image / Media Files list
app.get('/api/admin/media', requireAdmin, (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    const media = files.map(file => {
      const stats = fs.statSync(path.join(UPLOADS_DIR, file));
      return {
        name: file,
        url: `/uploads/${file}`,
        size: `${(stats.size / 1024).toFixed(1)} KB`,
        uploaded_at: stats.mtime.toISOString()
      };
    }).sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
    res.json(media);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Media upload endpoint (expects Base64 payload { filename: string, data: string })
app.post('/api/admin/upload', requireAdmin, (req, res) => {
  try {
    const { filename, data } = req.body;
    if (!filename || !data) {
      return res.status(400).json({ error: 'Необходимо указать имя файла и контент (Base64 data)' });
    }

    // Clean up filename to prevent directory traversal
    const cleanName = path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const ext = path.extname(cleanName);
    const nameWithoutExt = path.basename(cleanName, ext);
    const finalFilename = `${nameWithoutExt}_${Date.now()}${ext}`;
    const filePath = path.join(UPLOADS_DIR, finalFilename);

    // Strip base64 headers if present
    const base64Data = data.includes(';base64,') ? data.split(';base64,')[1] : data;
    const buffer = Buffer.from(base64Data, 'base64');

    fs.writeFileSync(filePath, buffer);

    res.json({
      url: `/uploads/${finalFilename}`,
      name: finalFilename
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Media delete endpoint
app.delete('/api/admin/media/:filename', requireAdmin, (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Файл не найден' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- VITE MIDDLEWARE & STATIC SERVING ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA routing fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
