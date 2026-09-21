import { ChevronLeft } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonBackProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

function ButtonBack({ icon, className = '', ...props }: ButtonBackProps) {
  const base =
    'flex items-center justify-center h-10 w-10 rounded-full bg-primary';

  return (
    <button className={twMerge(base, className)} {...props}>
      <span className="w-8 h-8 flex items-center justify-center">
        {icon ?? (
          <ChevronLeft className="w-full h-full text-white" strokeWidth={3} />
        )}
      </span>
    </button>
  );
}

export default ButtonBack;
