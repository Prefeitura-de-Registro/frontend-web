interface Usuario {
  id: string;
  nomeCompleto: string;
  CPF: string;
  email: string;
}

// Exportando no momento de criação
export interface CadastroUsuario extends Omit<Usuario, 'id'> {
  senha: string;
  confirmarSenha: string;
}

export type Usuarios = Usuario;
