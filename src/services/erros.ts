import { isAxiosError } from 'axios';

interface CorpoErro {
  message?: string;
  errors?: {
    formErrors?: string[];
    fieldErrors?: Record<string, string[] | undefined>;
  };
}

export function mensagemDeErro(
  erro: unknown,
  padrao = 'Não foi possível concluir a operação.',
): string {
  if (!isAxiosError<CorpoErro>(erro)) return padrao;

  if (!erro.response) return 'Não foi possível conectar ao servidor.';

  const corpo = erro.response.data;
  const detalhes = corpo?.errors;
  const primeiroDetalhe =
    detalhes?.formErrors?.[0] ??
    Object.values(detalhes?.fieldErrors ?? {}).flat()[0];

  if (primeiroDetalhe) return primeiroDetalhe;

  // O back devolve "Validation failed" em inglês quando não há detalhe útil
  if (!corpo?.message || corpo.message === 'Validation failed') return padrao;

  return corpo.message;
}

// Erros de validação do back por campo: { cpf: 'CPF inválido', ... }
export function errosPorCampo(erro: unknown): Record<string, string> {
  if (!isAxiosError<CorpoErro>(erro)) return {};

  const campos = erro.response?.data?.errors?.fieldErrors ?? {};
  const resultado: Record<string, string> = {};

  for (const [campo, mensagens] of Object.entries(campos)) {
    if (mensagens?.[0]) resultado[campo] = mensagens[0];
  }

  return resultado;
}
