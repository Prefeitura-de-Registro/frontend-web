import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  options,
  placeholder = 'Selecione...',
  value,
  onChange,
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Estado interno usado apenas se o componente não receber um value externo
  const [internalValue, setInternalValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Descobre se o select é controlado externamente ou gerido internamente
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  // Encontra a opção selecionada com base no valor ativo
  const selectedOption = options.find((opt) => opt.value === activeValue);

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optValue: string) => {
    if (onChange) {
      onChange(optValue); // Avisa o componente pai, se houver
    }
    if (!isControlled) {
      setInternalValue(optValue); // Atualiza internamente se não for controlado
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Pílula clara atrás (efeito de profundidade) */}
      <div className="absolute inset-x-2 bottom-0 h-1/2 bg-white rounded-full shadow-sm pointer-events-none" />

      {/* Botão principal que exibe a opção selecionada */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full flex items-center justify-center bg-primary text-white font-bold rounded-2xl px-4 py-3 shadow-md focus:outline-none transition-all ${className}`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={20}
          strokeWidth={2.5}
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Lista de opções customizada */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-primary border border-sky-600 rounded-2xl shadow-xl overflow-hidden">
          {options.map((opt) => {
            const isSelected = opt.value === activeValue;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full px-4 py-3 text-center text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-sky-600 text-white font-bold'
                    : 'text-white/90 hover:bg-sky-700/60'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Select;
