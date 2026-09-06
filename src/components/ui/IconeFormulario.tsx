import type { ReactNode } from 'react';

export type TipoIconeFormulario = 'ocorrencia' | 'endereco' | 'fotos';

interface IconeFormularioProps {
  tipo: TipoIconeFormulario;
  ativo?: boolean;
}

/**
 * Ícone de etapa do formulário (usado no topo das telas de preenchimento).
 * Specs do diagrama: container ~44x44, corner-radius ~12, ícone ~20x20.
 * Estado ativo: fundo preenchido na cor primária, ícone branco[cite: 12].
 * Estado inativo: fundo transparente, borda e ícone na cor primária[cite: 12].
 */
const ICONES: Record<TipoIconeFormulario, ReactNode> = {
  ocorrencia: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    >
      <path d="M12 3L2 20h20L12 3z" />
      <line x1="12" y1="10" x2="12" y2="14" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  ),
  endereco: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  fotos: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 18a4.5 4.5 0 0 1-1-8.9A5 5 0 0 1 15.9 7.1 4 4 0 0 1 17 15" />
      <path d="M12 12v7" />
      <path d="M9 15l3-3 3 3" />
    </svg>
  ),
};

function IconeFormulario({ tipo, ativo = false }: IconeFormularioProps) {
  return (
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors
        ${ativo ? 'bg-primary text-white' : 'bg-transparent text-primary border-2 border-primary'}`}
    >
      <span className="w-5 h-5">{ICONES[tipo]}</span>
    </div>
  );
}

export default IconeFormulario;
