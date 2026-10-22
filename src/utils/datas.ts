const FUSO_HORARIO = 'America/Sao_Paulo';
const UM_DIA_MS = 24 * 60 * 60 * 1000;

export interface Periodo {
  inicio: string; // AAAA-MM-DD (inclusivo)
  fim: string; // AAAA-MM-DD (exclusivo)
}

export function hojeEmBrasilia(): string {
  // 'en-CA' formata como AAAA-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: FUSO_HORARIO }).format(
    new Date(),
  );
}

export function somarDias(data: string, dias: number): string {
  const d = new Date(`${data}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

export function diasEntre(inicio: string, fim: string): number {
  return Math.round(
    (Date.parse(`${fim}T00:00:00Z`) - Date.parse(`${inicio}T00:00:00Z`)) /
      UM_DIA_MS,
  );
}

// O back trata "fim" como exclusivo, então usamos amanhã para incluir hoje
export function periodoUltimosDias(dias: number): Periodo {
  const fim = somarDias(hojeEmBrasilia(), 1);
  return { inicio: somarDias(fim, -dias), fim };
}

// De 1º de janeiro do ano corrente até hoje
export function periodoDesdeInicioDoAno(): Periodo {
  const hoje = hojeEmBrasilia();
  return { inicio: `${hoje.slice(0, 4)}-01-01`, fim: somarDias(hoje, 1) };
}

// Mesmo tamanho do período informado, imediatamente antes dele
export function periodoAnterior(periodo: Periodo): Periodo {
  const dias = diasEntre(periodo.inicio, periodo.fim);
  return { inicio: somarDias(periodo.inicio, -dias), fim: periodo.inicio };
}
