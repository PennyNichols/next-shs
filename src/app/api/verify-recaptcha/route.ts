/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

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
      return NextResponse.json({ success: true, score: data.score });
    } else {
      console.error('Recaptcha errors: ', data['error-codes']);
      return NextResponse.json({ success: false, errors: data['error-codes'] }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying recaptcha: ', error);
    return NextResponse.json({ error: 'Failed to verify reCAPTCHA' }, { status: 500 });
  }
}
