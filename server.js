import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { hospitalConfig } from './src/config/hospitalConfig.js';
import { getInitialData, saveDataToFile, saveBase64Image } from './api-handlers.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve uploaded assets statically
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.use('/uploads', express.static(uploadsDir));

// API 1: Get latest hospital data
app.get('/api/hospital-data', (_req, res) => {
  try {
    const data = getInitialData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve hospital data' });
  }
});

// API 2: Save hospital data (Admin save)
app.post('/api/hospital-data', (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.hospitalName) {
      return res.status(400).json({ error: 'Invalid data format' });
    }
    const success = saveDataToFile(data);
    if (success) {
      return res.json({ success: true, data });
    }
    res.status(500).json({ error: 'Failed to persist hospital data' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 3: Upload image file (supports base64 image strings)
app.post('/api/upload', (req, res) => {
  try {
    const { image, name } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }
    const url = saveBase64Image(image, name || 'hospital_image.jpg');
    res.json({ success: true, url });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Image upload failed' });
  }
});

// API 4: Reset data to verified defaults
app.post('/api/reset-defaults', (_req, res) => {
  try {
    saveDataToFile(hospitalConfig);
    res.json({ success: true, data: hospitalConfig });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset data' });
  }
});

// API 5: Admin Login
app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body || {};
  const cleanPin = (pin || '').trim().toLowerCase();
  if (cleanPin === '1234' || cleanPin === 'admin' || cleanPin === 'masaraddi') {
    return res.json({ success: true, token: 'masaraddi_admin_session_valid' });
  }
  res.status(401).json({ error: 'Invalid PIN or password' });
});

// Public legacy info endpoint
app.get('/api/hospital-info', (_req, res) => {
  const data = getInitialData();
  res.json({
    hospitalName: data.hospitalName,
    doctor: data.doctors?.[0]?.name || hospitalConfig.doctors[0].name,
    specialization: data.doctors?.[0]?.specialization || 'Neurology',
    timings: data.contact?.timings || hospitalConfig.contact.timings,
    address: data.contact?.address?.full || hospitalConfig.contact.address.full,
    phone: data.contact?.phoneDisplay || hospitalConfig.contact.phoneDisplay,
  });
});

// Serve frontend assets in production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Masaraddi Neuro Care Center</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #080E1A; color: #F8FAFC; text-align: center; padding: 20px; }
            .card { background: #0F172A; border: 1px solid #1E293B; padding: 32px; border-radius: 20px; max-width: 520px; }
            h1 { font-size: 20px; color: #38BDF8; margin-top: 0; }
            code { background: #1E293B; color: #7DD3FC; padding: 3px 8px; border-radius: 6px; font-family: monospace; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Masaraddi Neuro Care Center</h1>
            <p>Production build directory <code>dist/</code> was not found.</p>
            <p>For development with live reloading, run:<br><code>npm run dev</code></p>
            <p>To build for production first, run:<br><code>npm run build && npm start</code></p>
          </div>
        </body>
      </html>
    `);
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Masaraddi Neuro Care Center server running on http://0.0.0.0:${PORT}`);
});
