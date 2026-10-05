import { createContext } from 'react';
import type { UsuarioLogado } from '../services/auth.service';

export interface AuthContextValue {
  usuario: UsuarioLogado | null;
  carregando: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
