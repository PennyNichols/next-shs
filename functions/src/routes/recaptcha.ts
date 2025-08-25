import { Router, Request, Response } from 'express';

const router = Router();

router.post('/verify-recaptcha', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, error: 'reCAPTCHA token is required.' });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set in environment variables.');
      return res.status(500).json({ success: false, error: 'Server configuration error.' });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const response = await fetch(verifyUrl, {
      method: 'POST',
    });

    const data = await response.json();

    if (data.success && data.score >= 0.5) {
      return res.status(200).json({ success: true, score: data.score });
    } else {
      console.warn('reCAPTCHA verification failed:', data['error-codes']);
      return res
        .status(400)
        .json({ success: false, message: 'reCAPTCHA verification failed.', errors: data['error-codes'] });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

export default router;
