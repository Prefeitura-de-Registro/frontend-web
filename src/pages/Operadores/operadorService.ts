import { operadoresMock } from '../../mock/operador.mock';
import type { NovoOperador, Operador } from '../../types/operador';

export async function atualizarOperador(
  id: string,
  dados: Partial<NovoOperador>,
): Promise<{ ok: true; operador: Operador } | { ok: false; erro: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const indice = operadoresMock.findIndex((o) => o.id === id);
  if (indice === -1) {
    return { ok: false, erro: 'Operador não encontrado.' };
  }

  const matriculaEmUso =
    dados.matricula &&
    operadoresMock.some(
      (o) =>
        o.id !== id &&
        o.matricula.toLowerCase() === dados.matricula!.toLowerCase(),
    );
  if (matriculaEmUso) {
    return { ok: false, erro: 'Já existe outro operador com essa matrícula.' };
  }

  // Mantém o que o modal não edita (e-mail, telefone, chamados)
  const atualizado: Operador = { ...operadoresMock[indice], ...dados };
  operadoresMock[indice] = atualizado;

  return { ok: true, operador: atualizado };
}

export async function excluirOperador(
  id: string,
): Promise<{ ok: true } | { ok: false; erro: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const indice = operadoresMock.findIndex((o) => o.id === id);
  if (indice === -1) {
    return { ok: false, erro: 'Operador não encontrado.' };
  }

  operadoresMock.splice(indice, 1);
  return { ok: true };
}
