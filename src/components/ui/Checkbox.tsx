import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Checkbox padrão do projeto.
 * Specs do diagrama: área de toque ~49x49, ícone não selecionado 32x32,
 * ícone selecionado 38x38, cor #0073A9, check em branco.
 */
function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none p-3">
      <span className="relative w-8 h-8 flex items-center justify-center">
        <input type="checkbox" className="peer sr-only" {...props} />
        <span
          className={`w-8 h-8 rounded-md border-2 border-primary flex items-center justify-center transition-colors
            peer-checked:bg-primary peer-checked:border-primary ${className}`}
        >
          <svg
            className="w-5 h-5 text-white opacity-0 peer-checked:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      {label && <span className="text-sm text-slate-700">{label}</span>}
    </label>
  );
}

export default Checkbox;
