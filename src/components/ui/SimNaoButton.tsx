import React, { type ButtonHTMLAttributes } from 'react';

interface SimNaoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tipo: 'sim' | 'nao';
  variante: 'solid' | 'outline';
}

export const SimNaoButton: React.FC<SimNaoButtonProps> = ({
  tipo,
  variante,
  className = '',
  ...props
}) => {
  const base =
    'py-2 px-4 rounded-xl font-bold text-center transition-all min-w-[80px] text-sm';

  const styles = {
    sim: {
      solid: 'bg-[#22c55e] text-white hover:bg-green-600 shadow-sm',
      outline:
        'bg-white text-[#22c55e] border-2 border-[#22c55e] hover:bg-green-50',
    },
    nao: {
      solid: 'bg-[#ef4444] text-white hover:bg-red-600 shadow-sm',
      outline:
        'bg-white text-[#ef4444] border-2 border-[#ef4444] hover:bg-red-50',
    },
  };

  return (
    <button
      className={`${base} ${styles[tipo][variante]} ${className}`}
      {...props}
    >
      {tipo === 'sim' ? 'Sim' : 'Não'}
    </button>
  );
};
