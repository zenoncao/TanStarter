import { createFileRoute, useRouter } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';

// Server Function to list files
const getFiles = createServerFn({ method: 'GET' }).handler(async () => {
  const env = process.env as unknown as Env;

  if (!env || !env.BUCKET) {
    console.warn(
      'R2 Bucket binding not found. Are you running in Cloudflare context?',
    );
    return [];
  }

  const list = await env.BUCKET.list();
  return list.objects.map((obj) => ({
    key: obj.key,
    size: obj.size,
    uploaded: obj.uploaded.toISOString(),
  }));
});

// Server Function to upload file
const uploadFile = createServerFn({ method: 'POST' })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    const { getEvent } = await import('vinxi/http');
    const event = getEvent();
    const env = event.context.cloudflare?.env as Env;

    if (!env || !env.BUCKET) {
      throw new Error('R2 Bucket binding not found');
    }

    const file = data.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const key = file.name;
    // Convert File to ArrayBuffer for R2
    const arrayBuffer = await file.arrayBuffer();

    await env.BUCKET.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    return { success: true, key };
  });

export const Route = createFileRoute('/storage')({
  loader: () => getFiles(),
  component: StoragePage,
});

function StoragePage() {
  const files = Route.useLoaderData();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await uploadFile({ data: formData });
      setMessage('File uploaded successfully!');
      form.reset();
      // Refresh the list
      router.invalidate();
    } catch (error) {
      console.error(error);
      setMessage('Upload failed. See console for details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cloudflare R2 Storage</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload File</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="file"
              name="file"
              required
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload to R2'}
          </button>
          {message && <p className="text-sm mt-2">{message}</p>}
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Files in Bucket</h2>
        {files.length === 0 ? (
          <p className="text-gray-500">
            No files found or bucket not connected.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {files.map((file) => (
              <li
                key={file.key}
                className="py-3 flex justify-between items-center"
              >
                <span className="font-medium">{file.key}</span>
                <div className="text-sm text-gray-500">
                  <span className="mr-4">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                  <span>{new Date(file.uploaded).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
