import express from 'express';
import { sendContactEmail } from '../Controllers/emailController.js';

const router = express.Router();

// Route for sending contact form emails
router.post('/contact', sendContactEmail);

export default router;