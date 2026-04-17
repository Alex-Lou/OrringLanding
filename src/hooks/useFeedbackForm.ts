import { useCallback, useState } from 'react';
import { API } from '../constants/config';

export type FeedbackStatus = 'idle' | 'sending' | 'sent' | 'error';

interface FeedbackPayload {
  name: string;
  email: string;
  message: string;
  _subject?: string;
}

/**
 * Holds the form state and the async submit to FormSubmit.
 * Empty messages are rejected client-side; anonymous is allowed.
 */
export function useFeedbackForm() {
  const [status, setStatus] = useState<FeedbackStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const reset = useCallback(() => {
    setName(''); setEmail(''); setMessage('');
  }, []);

  const submit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;
    setStatus('sending');
    const payload: FeedbackPayload = {
      name: name || 'Anonymous',
      email: email || 'no-reply@orring',
      message,
      _subject: 'Nouveau feedback Orring',
    };
    try {
      const res = await fetch(API.feedback, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) { setStatus('sent'); reset(); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }, [name, email, message, reset]);

  return {
    status,
    name, setName,
    email, setEmail,
    message, setMessage,
    submit,
  };
}
