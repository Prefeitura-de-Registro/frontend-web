import { api } from './api';

export interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
}

interface LoginResponse {
  usuario: UsuarioLogado;
  token: string;
}

export async function loginRequest(
  email: string,
  senha: string,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/api/user/login', {
    email,
    senha,
  });
  return response.data;
}
