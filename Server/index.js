import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables (already called in app.js, but safe here too)
dotenv.config();

const PORT = process.env.PORT || 5000;

// Only start a local server outside of Vercel serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📧 Email service is ready at http://localhost:${PORT}/api/email`);
  });
}