import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getResend } from '../../lib/email';

// Server Function to send email
const sendEmail = createServerFn({ method: 'POST' })
  .validator((data: { to: string; subject: string; message: string }) => data)
  .handler(async ({ data }) => {
    const env = process.env as unknown as Env;

    if (!env || !env.RESEND_API_KEY) {
      throw new Error('Resend configuration missing');
    }

    const resend = getResend(env);

    const { error } = await resend.emails.send({
      from: 'TanStarter <onboarding@resend.dev>', // Use your verified domain in production
      to: [data.to],
      subject: data.subject,
      html: `<p>${data.message}</p>`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });

export const Route = createFileRoute('/email/send')({
  component: EmailPage,
});

function EmailPage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    msg: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await sendEmail({ data: { to, subject, message } });
      setStatus({ type: 'success', msg: 'Email sent successfully!' });
      // Reset form
      setTo('');
      setSubject('');
      setMessage('');
      // biome-ignore lint/suspicious/noExplicitAny: Error handling
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', msg: err.message || 'Failed to send email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Send Email with Resend
        </h1>

        {status && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              To
            </label>
            <input
              id="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Hello from TanStarter"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-150 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Powered by Resend
        </p>
      </div>
    </div>
  );
}
