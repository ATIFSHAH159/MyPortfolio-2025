const API_BASE_URL = 'http://localhost:5000/api';

// Send contact email
export const sendContactEmail = async (emailData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

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