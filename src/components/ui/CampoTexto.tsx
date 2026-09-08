import type { InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CampoTextoProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  icon?: ReactNode;
}

function CampoTexto({
  label,
  labelClassName = '',
  icon,
  className = '',
  ...props
}: CampoTextoProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        className={twMerge('font-bold text-primary text-lg ', labelClassName)}
      >
        {label}:
      </label>

      <div className="relative w-fit mx-auto">
        {icon && (
          <span className="absolute left-3 top-6/9 -translate-y-1/2 w-4 h-4 text-primary">
            {/* A métrica top do icon foi realizada para alinhar corretamente ao CampoTexto da page ListaChamadosAnonimos */}
            {icon}
          </span>
        )}
        <input
          className={twMerge(
            'rounded-full border border-gray-200 px-6 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary',
            icon ? 'pl-10' : '',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export default CampoTexto;
