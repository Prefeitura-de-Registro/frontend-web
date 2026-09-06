import type { InputHTMLAttributes } from 'react';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Radio button padrão do projeto.
 * Specs do diagrama: área de toque ~45x45, cor #0073A9.
 */
function RadioButton({ label, className = '', ...props }: RadioButtonProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none p-2.5">
      <span className="relative w-8 h-8 flex items-center justify-center">
        <input type="radio" className="peer sr-only" {...props} />
        <span
          className={`w-6 h-6 rounded-full border-2 border-primary transition-colors
            peer-checked:bg-primary peer-checked:ring-2 peer-checked:ring-white peer-checked:ring-inset ${className}`}
        />
      </span>
      {label && <span className="text-sm text-slate-700">{label}</span>}
    </label>
  );
}

export default RadioButton;
