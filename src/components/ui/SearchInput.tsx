import type { InputHTMLAttributes } from 'react';

/**
 * Caixa de busca padrão do projeto.
 * Specs do Figma: 382x40, fundo #F9FAFB, cantos superiores arredondados,
 * borda inferior #E5E7EB, ícone de busca à direita na cor primary.
 */
function SearchInput({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full max-w-[382px] h-10 flex items-center gap-2 bg-gray-50 rounded-t-2xl border-b-2 border-gray-200 focus-within:border-primary px-4">
      <input
        type="text"
        placeholder="Buscar chamado"
        className={`w-full h-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none ${className}`}
        {...props}
      />

      <svg
        className="w-5 h-5 text-primary shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default SearchInput;
