import api from './api';

export async function register(email: string, password: string) {
  return api.post('/api/auth/register', { email, password });
}

export async function login(email: string, password: string) {
  return api.post('/api/auth/login', { email, password });
}

export async function getProfile() {
  return api.get('/api/profile/');
}

export async function updateProfile(data: { firstName?: string; lastName?: string }) {
  return api.put('/api/profile/', data);
}

export async function logout() {
  return api.post("/api/auth/logout");
}
