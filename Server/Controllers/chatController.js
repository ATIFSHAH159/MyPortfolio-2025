import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const askAssistant = async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // In Vercel serverless, spawning Python processes is not supported by default.
    // Guard this path and return a friendly message when on Vercel.
    if (process.env.VERCEL) {
      return res.status(501).json({
        success: false,
        message: 'Assistant is unavailable on the serverless environment.',
      });
    }

    const pythonExecutable = process.env.PYTHON_PATH || 'python';

    const serverRoot = path.join(__dirname, '..');
    const scriptPath = path.join(serverRoot, 'AI Assistant', 'chat.py');

    const child = spawn(pythonExecutable, [scriptPath, message], {
      env: process.env,
      cwd: serverRoot,
    });

    let stdoutData = '';
    let stderrData = '';

    child.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    child.on('error', (error) => {
      return res.status(500).json({ success: false, message: 'Failed to start Python process', error: String(error) });
    });

    child.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ success: false, message: 'Python script error', details: stderrData || `Exit code ${code}` });
      }
      const responseText = stdoutData.trim();
      return res.status(200).json({ success: true, response: responseText });
    });
  } catch (err) {
    console.error('askAssistant error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


