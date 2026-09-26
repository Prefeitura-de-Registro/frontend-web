import { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface OpcaoSelect {
  value: string;
  label: string;
}

interface SelectCustomizadoProps {
  label?: string;
  labelClassName?: string;
  opcoes: OpcaoSelect[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  erro?: string;
}

function SelectCustomizado({
  label,
  labelClassName = '',
  opcoes,
  value,
  onChange,
  placeholder = 'Selecione...',
  className = '',
  disabled = false,
  erro,
}: SelectCustomizadoProps) {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const opcaoSelecionada = opcoes.find((o) => o.value === value);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setAberto(false);
      }
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') setAberto(false);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setAberto((prev) => !prev);
    }
  }

  return (
    <div className="flex flex-col gap-1 w-full" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className={twMerge('font-bold text-primary text-lg', labelClassName)}
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <button
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => setAberto((prev) => !prev)}
          onKeyDown={handleKeyDown}
          className={twMerge(
            'w-full flex items-center justify-center gap-2 rounded-2xl bg-primary text-white font-bold px-6 py-3.5 shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40',
            disabled && 'opacity-50 cursor-not-allowed hover:bg-primary',
            erro && 'ring-2 ring-red-400',
            className,
          )}
        >
          <span>{opcaoSelecionada?.label ?? placeholder}</span>
          <ChevronDown
            className={twMerge(
              'w-4 h-4 transition-transform',
              aberto && 'rotate-180',
            )}
          />
        </button>

        {aberto && !disabled && (
          <ul className="absolute z-20 mt-2 w-full rounded-2xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
            {opcoes.map((opcao) => {
              const selecionada = opcao.value === value;
              return (
                <li key={opcao.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opcao.value);
                      setAberto(false);
                    }}
                    className={twMerge(
                      'w-full text-left px-6 py-3 font-medium transition-colors',
                      selecionada
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-100',
                    )}
                  >
                    {opcao.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {erro && <p className="text-red-500 text-sm">{erro}</p>}
    </div>
  );
}

export default SelectCustomizado;
