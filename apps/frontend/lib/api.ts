const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export type AuthResponse = { token: string; user: { id: string; name: string; email: string } };

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('slt_token');
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message ?? 'API request failed');
  return response.json() as Promise<T>;
}

export async function authenticate(mode: 'login' | 'signup', payload: Record<string, string>) {
  const data = await api<AuthResponse>(`/api/auth/${mode}`, { method: 'POST', body: JSON.stringify(payload) });
  localStorage.setItem('slt_token', data.token);
  localStorage.setItem('slt_user', JSON.stringify(data.user));
  return data;
}
