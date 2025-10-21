import nodemailer from 'nodemailer';

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form email
export const sendContactEmail = async (req, res) => {
  try {
    console.log('Contact email request received:', req.body);
    console.log('Environment variables check:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set'
    });

    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1de9ff, #ff6b6b); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: white; margin: 0; text-align: center;">New Portfolio Contact</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #1de9ff;">
            <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 10px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Sent from portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Contact email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check email configuration.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const transporter = createTransporter();

    // Sends a notification to your inbox. In real apps, integrate with a list provider.
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New newsletter subscription`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1de9ff, #6b6bff); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: white; margin: 0; text-align: center;">New Subscription</h2>
          </div>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #1de9ff;">
            <p style="margin:0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin:0; font-size: 12px; color: #666;">Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Subscription notification sent:', info.messageId);

    return res.status(200).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Subscription failed:', error);
    if (error.code === 'EAUTH') {
      return res.status(500).json({ success: false, message: 'Email authentication failed. Check configuration.' });
    }
    return res.status(500).json({ success: false, message: 'Failed to subscribe. Please try again later.' });
  }
};