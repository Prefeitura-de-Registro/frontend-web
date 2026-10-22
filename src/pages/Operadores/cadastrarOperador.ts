import { operadoresMock } from '../../mock/operador.mock';
import type { NovoOperador, Operador } from '../../types/operador';

export async function cadastrarOperador(
  dados: NovoOperador,
): Promise<{ ok: true; operador: Operador } | { ok: false; erro: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const matriculaJaExiste = operadoresMock.some(
    (o) => o.matricula.toLowerCase() === dados.matricula.toLowerCase(),
  );
  if (matriculaJaExiste) {
    return { ok: false, erro: 'Já existe um operador com essa matrícula.' };
  }

  const emailJaExiste = operadoresMock.some(
    (o) => o.email.toLowerCase() === dados.email.toLowerCase(),
  );
  if (emailJaExiste) {
    return { ok: false, erro: 'Já existe um operador com esse e-mail.' };
  }

  const novo: Operador = { ...dados, id: String(Date.now()), chamados: 0 };
  operadoresMock.push(novo);

  return { ok: true, operador: novo };
}
