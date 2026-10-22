import axios from 'axios';

export const TOKEN_STORAGE_KEY = 'auth_token';

// TODO: Coloque aqui a URL onde seu back-end Node.js está rodando localmente
export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

let onUnauthorizedCallback: (() => void) | null = null;

export function setOnUnauthorized(callback: (() => void) | null) {
  onUnauthorizedCallback = callback;
}

// Injeta o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Captura erro 401 (Não autorizado) para deslogar o usuário
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (onUnauthorizedCallback) {
        onUnauthorizedCallback();
      }
    }
    return Promise.reject(error);
  },
);
