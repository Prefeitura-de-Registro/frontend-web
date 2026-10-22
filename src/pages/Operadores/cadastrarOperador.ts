import { errosPorCampo, mensagemDeErro } from '../../services/erros';
import { criarFuncionario } from '../../services/funcionarios.service';
import type { NovoFuncionario } from '../../types/gestao';

export type ResultadoCadastro =
  | { ok: true; id: number }
  | { ok: false; erro: string; campos: Record<string, string> };

// POST /api/user. Os erros de validação do back voltam por campo em `campos`
// (nome, email, senha, cpf, cargo, matricula, departamentoIds).
export async function cadastrarOperador(
  dados: NovoFuncionario,
): Promise<ResultadoCadastro> {
  try {
    const criado = await criarFuncionario(dados);
    return { ok: true, id: criado.id };
  } catch (erro) {
    return {
      ok: false,
      erro: mensagemDeErro(erro, 'Erro ao cadastrar. Tente novamente.'),
      campos: errosPorCampo(erro),
    };
  }
}
