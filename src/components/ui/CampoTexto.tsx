// src/components/ui/CampoTexto.tsx
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
        className={twMerge(
          'font-bold text-primary text-sm sm:text-base',
          labelClassName,
        )}
      >
        {label}:
      </label>

      {/* Alterado de w-fit mx-auto para w-full para ocupar todo o espaço do grid e do card */}
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-3/5 -translate-y-1/2 w-4 h-4 text-primary flex items-center justify-center">
            {icon}
          </span>
        )}
        <input
          className={twMerge(
            'w-full rounded-full border border-gray-200 px-5 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary shadow-sm bg-white',
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
