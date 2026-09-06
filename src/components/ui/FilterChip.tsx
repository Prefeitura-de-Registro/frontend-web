import type { ButtonHTMLAttributes } from 'react';

interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

/**
 * Chip de filtro, usado na tela de Filtros.
 * Specs do diagrama: 120x32, paddingH 12, paddingV 6, gap 6, corner-radius 12, borda 1px.
 */
function FilterChip({
  label,
  active = false,
  className = '',
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 min-w-[120px] h-8 px-3 py-1.5 rounded-xl text-sm border transition-colors
        ${active ? 'bg-primary text-white border-primary' : 'bg-white text-slate-700 border-slate-300'} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}

export default FilterChip;
