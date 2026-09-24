import { usuarioMock } from '../../mock/usuario.mock';
import { credencialMock } from '../../mock/credencial.mock';
import type { CadastroUsuario, Usuarios } from '../../types/usuario';

export async function cadastrar(
  dados: CadastroUsuario,
): Promise<{ ok: true; usuario: Usuarios } | { ok: false; erro: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (dados.senha !== dados.confirmarSenha) {
    return { ok: false, erro: 'As senhas não coincidem.' };
  }

  const emailJaExiste = usuarioMock.some((u) => u.email === dados.email);
  if (emailJaExiste) {
    return { ok: false, erro: 'Este email já está cadastrado.' };
  }

  const novoUsuario: Usuarios = {
    id: String(usuarioMock.length + 1),
    nomeCompleto: dados.nomeCompleto,
    CPF: dados.CPF,
    email: dados.email,
  };

  usuarioMock.push(novoUsuario);
  credencialMock.push({ email: dados.email, senha: dados.senha });

  return { ok: true, usuario: novoUsuario };
}
