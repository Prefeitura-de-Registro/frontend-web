import { ocorrenciasMock } from '../../mock/ocorrencia.mock';
import type { Ocorrencias } from '../../types/ocorrencia';

export async function buscarChamado(
  protocolo: string,
): Promise<{ ok: true; chamado: Ocorrencias } | { ok: false; erro: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const chamado = ocorrenciasMock.find((o) => o.id === protocolo);

  if (!chamado) {
    return { ok: false, erro: 'Protocolo não encontrado.' };
  }

  return { ok: true, chamado };
}
