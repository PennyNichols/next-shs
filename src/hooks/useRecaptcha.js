/* eslint-disable no-console */
import { useState, useEffect } from 'react';

const useRecaptcha = (siteKey) => {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!siteKey) {
      console.error('reCAPTCHA site key is missing.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script.');
      setError('Failed to load reCAPTCHA script.');
    };
    script.onload = () => {
      setIsReady(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [siteKey]);

  const executeRecaptcha = async (action) => {
    if (!isReady) {
      console.error('reCAPTCHA is not loaded yet.');
      setError('reCAPTCHA is not loaded yet.');
      return null;
    }
    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      setToken(token);
      return token;
    } catch (err) {
      console.error('reCAPTCHA execution error:', err);
      setError('reCAPTCHA execution error.');
      return null;
    }
  };

  return { executeRecaptcha, isReady, token, error };
};

export default useRecaptcha;
