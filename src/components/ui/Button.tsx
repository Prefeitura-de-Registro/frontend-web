import React, { type ButtonHTMLAttributes } from 'react';
import { type LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'dark' | 'icon';
  icon?: LucideIcon;
  fullWidth?: boolean;
  hasNotification?: boolean;
  iconSize?: number;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  icon: Icon,
  fullWidth = false,
  hasNotification = false,
  className = '',
  iconSize = 20,
  ...props
}) => {
  // Estilos base comuns
  const baseStyles =
    'flex items-center justify-center font-bold transition-all rounded-full';

  const variants = {
    solid:
      'gap-2 bg-[#0073a9] text-white hover:bg-[#005a86] px-8 py-3 shadow-sm',
    outline:
      'gap-2 bg-[#f4f9fd] text-[#0073a9] border-[1.5px] border-[#0073a9] hover:bg-blue-100 px-8 py-3',
    dark: 'gap-2 bg-[#2f2f2f] text-white hover:bg-black px-8 py-3 shadow-sm',
    // Corrigido: w-12 h-12 fixos, sem espremer, mantendo o círculo perfeito e relative pro badge
    icon: 'bg-[#0073a9] text-white w-12 h-12 min-w-[3rem] min-h-[3rem] p-0 flex items-center justify-center hover:bg-[#005a86] relative shadow-sm shrink-0',
  };

  // Se for variante icon, ignoramos o fullWidth para ele nunca esticar na tela
  const widthStyle =
    variant === 'icon' ? 'w-12 h-12' : fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      className={twMerge(baseStyles, variants[variant], widthStyle, className)}
      {...props}
    >
      {Icon && <Icon size={iconSize} strokeWidth={2.5} />}
      {variant !== 'icon' && children}
      {hasNotification && variant === 'icon' && (
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#e11d48] border-2 border-white rounded-full z-10" />
      )}
    </button>
  );
};

export default Button;
