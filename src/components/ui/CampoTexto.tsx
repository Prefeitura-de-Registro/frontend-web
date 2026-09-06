import type { InputHTMLAttributes } from 'react';

interface CampoTextoProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * Input com label, usado nos campos do formulário de endereço (Rua, Bairro, Número, etc).
 * Specs extraídas do SVG: label em negrito na cor primária, input em formato
 * "pill" (border-radius total), borda cinza clara (#E5E7EB), placeholder cinza.
 */
function CampoTexto({ label, className = '', ...props }: CampoTextoProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-bold text-primary text-lg">{label}:</label>
      <input
        className={`w-full rounded-full border border-gray-200 px-6 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary ${className}`}
        {...props}
      />
    </div>
  );
}

export default CampoTexto;
