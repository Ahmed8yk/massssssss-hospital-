import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hospitalConfig } from './src/config/hospitalConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'hospital-data.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// Ensure necessary directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure default data exists
export function getInitialData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && parsed.hospitalName) {
        return parsed;
      }
    } catch (e) {
      console.warn('Error reading data file, using defaults:', e);
    }
  }
  // Initialize with hospitalConfig
  saveDataToFile(hospitalConfig);
  return hospitalConfig;
}

export function saveDataToFile(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving data to file:', e);
    return false;
  }
}

// Process image data (base64, data URI, or raw SVG) and save to disk
export function saveBase64Image(dataString, originalName = 'upload.jpg') {
  if (!dataString || typeof dataString !== 'string') {
    throw new Error('Image data must be a non-empty string');
  }

  // If already a persisted or static URL, return as-is
  if (dataString.startsWith('/uploads/') || dataString.startsWith('/logo') || dataString.startsWith('http://') || dataString.startsWith('https://')) {
    return dataString;
  }

  let buffer;
  let ext = '.jpg';

  // 1. Check for standard data URI (e.g. data:image/png;base64,...)
  const dataUriMatch = dataString.match(/^data:([^;,]+)(?:;charset=[^;,]+)?(?:;(base64))?,([\s\S]+)$/i);

  if (dataUriMatch) {
    const mimeType = (dataUriMatch[1] || '').toLowerCase();
    const isBase64 = Boolean(dataUriMatch[2]);
    const payload = dataUriMatch[3];

    try {
      if (isBase64) {
        buffer = Buffer.from(payload, 'base64');
      } else {
        buffer = Buffer.from(decodeURIComponent(payload), 'utf-8');
      }
    } catch (e) {
      throw new Error('Failed to decode image data URI');
    }

    if (mimeType.includes('png')) ext = '.png';
    else if (mimeType.includes('webp')) ext = '.webp';
    else if (mimeType.includes('svg')) ext = '.svg';
    else if (mimeType.includes('icon') || mimeType.includes('ico')) ext = '.ico';
    else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg';
  } else if (dataString.trim().startsWith('<svg')) {
    // Raw SVG string
    buffer = Buffer.from(dataString, 'utf-8');
    ext = '.svg';
  } else {
    // Fallback: try raw base64 string
    try {
      buffer = Buffer.from(dataString, 'base64');
      if (originalName && originalName.includes('.')) {
        ext = path.extname(originalName).toLowerCase() || '.jpg';
      }
    } catch (e) {
      throw new Error('Invalid or corrupted image data');
    }
  }

  if (!buffer || buffer.length === 0) {
    throw new Error('Image buffer is empty');
  }

  // Max 15MB
  if (buffer.length > 15 * 1024 * 1024) {
    throw new Error('Image exceeds 15MB limit');
  }

  const cleanName = path.basename(originalName, path.extname(originalName))
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .slice(0, 30) || 'logo';
  const fileName = `${Date.now()}-${cleanName}${ext}`;
  const filePath = path.join(UPLOADS_DIR, fileName);

  fs.writeFileSync(filePath, buffer);
  return `/uploads/${fileName}`;
}
