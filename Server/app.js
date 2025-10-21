import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables early for both local and serverless
dotenv.config();

// Import routes with error handling
import emailRoutes from './Routes/emailRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      process.env.FRONTEND_URL,
      'https://my-portfolio-2025-lilac.vercel.app',
      'https://my-portfolio-2025-6xhd.vercel.app',
      'https://my-portfolio-2025.vercel.app'
    ].filter(Boolean), // Remove any undefined values
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Root endpoint for testing
app.get('/', (req, res) => {
  try {
    res.status(200).json({
      message: 'Portfolio Backend API is running!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      vercel: !!process.env.VERCEL,
      envCheck: {
        EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set',
        FRONTEND_URL: process.env.FRONTEND_URL || 'Not set'
      },
      availableEndpoints: [
        'GET /api/health',
        'POST /api/email/contact',
        'POST /api/email/subscribe',
        'POST /api/chat'
      ]
    });
  } catch (error) {
    console.error('Root endpoint error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Routes
app.use('/api/email', emailRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'Server is running successfully!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    vercel: !!process.env.VERCEL,
    availableEndpoints: [
      'GET /api/health',
      'POST /api/email/contact',
      'POST /api/email/subscribe',
      'POST /api/chat'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableEndpoints: ['GET /api/health', 'POST /api/email/contact', 'POST /api/chat'],
  });
});

// Export with error handling
try {
  export default app;
} catch (error) {
  console.error('App export error:', error);
  // Create a minimal app for error cases
  const errorApp = express();
  errorApp.use(cors());
  errorApp.get('*', (req, res) => {
    res.status(500).json({
      error: 'Application failed to start',
      message: error.message
    });
  });
  export default errorApp;
}


