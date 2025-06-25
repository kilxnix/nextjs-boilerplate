'use client';

import { useState } from 'react';
import { getHealth } from '@/lib/api';

export default function HealthCheck() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getHealth();
      setData(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleCheck}
        className="rounded px-4 py-2 bg-blue-600 text-white"
      >
        Check Backend Health
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <pre className="text-left overflow-auto w-full max-w-lg p-2 bg-gray-100 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
