import { spawn } from 'child_process';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MODEL_DIR  = path.join(process.cwd(), 'public', 'models');
// auto-create folders if missing
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(MODEL_DIR))  fs.mkdirSync(MODEL_DIR,  { recursive: true });

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send('Scan endpoint alive—use POST to upload');
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const form = formidable({
    multiples: false,
    uploadDir: UPLOAD_DIR,
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Error parsing form' });
    }
    const file = files.file;
    const inputPath = file.filepath;
    const outputPath = path.join(MODEL_DIR, 'generated.glb');

    let stdout = '', stderr = '';
    const py = spawn('python3', ['./api/scan/process_blueprint.py', inputPath, outputPath]);

    py.stdout.on('data', d => stdout += d.toString());
    py.stderr.on('data', d => stderr += d.toString());

    py.on('close', code => {
      if (code === 0) {
        try {
          const { suggestions } = JSON.parse(stdout);
          return res.status(200).json({ success: true, modelPath: '/models/generated.glb', suggestions });
        } catch (e) {
          console.error('JSON parse error:', e, stdout);
          return res.status(500).json({ error: 'Invalid JSON from Python' });
        }
      } else {
        console.error('Python error:', stderr);
        return res.status(500).json({ error: 'AI processing failed', detail: stderr });
      }
    });
  });
}
