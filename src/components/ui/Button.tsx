import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: 'solid' | 'outline' | 'dark';
  children: ReactNode;
}

/**
 * Botão padrão do projeto.
 * Specs do diagrama: paddingH 16 / paddingV 10, border-radius 12,
 * gap 6 (entre ícone e texto), ícone 16x16, font-size 14 bold, cor #0073A9.
 */
function Button({
  icon,
  variant = 'solid',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    solid: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    dark: 'bg-[#2B2B2B] text-white border-2 border-white hover:bg-[#2B2B2B]/90',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {icon && (
        <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
      )}
      {children}
    </button>
  );
}

export default Button;
