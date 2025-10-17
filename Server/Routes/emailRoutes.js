import express from 'express';
import { sendContactEmail, subscribeToNewsletter } from '../Controllers/emailController.js';

const router = express.Router();

// Route for sending contact form emails
router.post('/contact', sendContactEmail);

// Route for newsletter subscription
router.post('/subscribe', subscribeToNewsletter);

export default router;