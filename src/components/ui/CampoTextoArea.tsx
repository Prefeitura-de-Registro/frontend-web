import type { TextareaHTMLAttributes } from 'react';

interface CampoTextoAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

/**
 * Campo de texto longo (ex: descrição do problema), no mesmo estilo visual
 * do CampoTexto, mas usando <textarea> em vez de <input> para permitir
 * múltiplas linhas.
 */
function CampoTextoArea({
  label,
  rows = 4,
  className = '',
  ...props
}: CampoTextoAreaProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-bold text-primary text-base">{label}:</label>
      <textarea
        rows={rows}
        className={`bg-white w-full rounded-2xl border border-gray-200 px-6 py-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary resize-none ${className}`}
        {...props}
      />
    </div>
  );
}

export default CampoTextoArea;
