const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:5000';

export async function getHealth() {
  const res = await fetch(`${BASE_URL}/api/health`);
  if (!res.ok) {
    throw new Error('Failed to fetch health status');
  }
  return res.json();
}

export interface EnhancedSearchPayload {
  query: string;
  filters?: Record<string, unknown>;
  top_k?: number;
  image_size?: string;
  include_images?: boolean;
}

export async function enhancedSearch(payload: EnhancedSearchPayload) {
  const res = await fetch(`${BASE_URL}/api/rag/enhanced-search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to search cards');
  }

  return res.json();
}
