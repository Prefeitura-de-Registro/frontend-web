import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface EmptyStateProps {
  ilustracao: ReactNode; // pode ser um <img> ou um ícone do lucide
  titulo: string;
  subtitulo: string;
  className?: string;
}

function EmptyState({
  ilustracao,
  titulo,
  subtitulo,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col items-center text-center gap-3 py-10 px-6',
        className,
      )}
    >
      <div className="w-32 h-32 flex items-center justify-center">
        {ilustracao}
      </div>
      <h2 className="text-lg font-bold text-gray-800">{titulo}</h2>
      <p className="text-sm text-gray-500 max-w-xs">{subtitulo}</p>
    </div>
  );
}

export default EmptyState;
