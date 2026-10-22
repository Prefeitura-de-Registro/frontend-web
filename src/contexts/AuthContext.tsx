import { useCallback, useEffect, useState } from 'react';
import { loginRequest, type UsuarioLogado } from '../services/auth.service';
import { setOnUnauthorized, TOKEN_STORAGE_KEY } from '../services/api';
import { AuthContext } from './auth-context';

const USER_STORAGE_KEY = 'auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const usuarioSalvo = localStorage.getItem(USER_STORAGE_KEY);
    return token && usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const [carregando] = useState(false);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUsuario(null);
  }, []);

  useEffect(() => {
    setOnUnauthorized(() => {
      signOut();
    });

    return () => setOnUnauthorized(null);
  }, [signOut]);

  const signIn = useCallback(async (email: string, senha: string) => {
    const { usuario: usuarioLogado, token } = await loginRequest(email, senha);

    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usuarioLogado));

    setUsuario(usuarioLogado);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
