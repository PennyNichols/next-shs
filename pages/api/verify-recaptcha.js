// pages/api/verify-recaptcha.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Use your secret key
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true, score: data.score });
    } else {
      console.error('Recaptcha errors: ', data['error-codes']);
      return res.status(400).json({ success: false, errors: data['error-codes'] });
    }
  } catch (error) {
    console.error('Error verifying recaptcha: ', error);
    return res.status(500).json({ error: 'Failed to verify reCAPTCHA' });
  }
}
