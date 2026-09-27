export interface DetalhesChamado {
  id: string;
  status: string;
}

const protocolosMock: Record<string, DetalhesChamado> = {
  '12345': { id: '12345', status: 'Em andamento' },
  '99999': { id: '99999', status: 'Concluído' },
};

export async function buscarChamado(
  protocolo: string,
): Promise<
  { ok: true; chamado: DetalhesChamado } | { ok: false; erro: string }
> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const chamado = protocolosMock[protocolo];

  if (!chamado) {
    return { ok: false, erro: 'Protocolo não encontrado.' };
  }

  return { ok: true, chamado };
}
