// Use different API URLs based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://my-portfolio-2025-lilac.vercel.app/api'
  : 'https://my-portfolio-2025-lilac.vercel.app/api'; // Use hosted backend for both local and production

// Send contact email
export const sendContactEmail = async (emailData) => {
  try {
    console.log('Sending email to:', `${API_BASE_URL}/email/contact`);
    console.log('Email data:', emailData);
    
    const response = await fetch(`${API_BASE_URL}/email/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
    }

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

// Check server health (optional, for frontend health checks)
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error('Error checking server health:', error);
    throw error;
  }
};

// Send a chat message to the AI assistant
export const sendChatMessage = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Chat request failed');
    }
    return result.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Subscription failed');
    }
    return result;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};