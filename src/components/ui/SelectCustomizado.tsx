import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectCustomizadoProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function SelectCustomizado({
  label,
  value,
  options,
  onChange,
}: SelectCustomizadoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col gap-1 w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-bold text-[var(--color-primary)]">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-[var(--color-primary)] text-white font-bold py-2 px-4 rounded-xl shadow-md flex items-center justify-between text-sm transition-all ${
            isOpen ? 'rounded-b-none' : ''
          }`}
        >
          <span className="w-full text-center pl-5">{value}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white rounded-b-xl shadow-lg border border-t-0 border-gray-100 z-50 overflow-hidden">
            {options.map((opcao) => (
              <button
                key={opcao}
                type="button"
                onClick={() => {
                  onChange(opcao);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                  value === opcao
                    ? 'bg-[var(--color-primary)] text-white font-bold'
                    : 'text-gray-800 hover:bg-gray-100 font-medium'
                }`}
              >
                {opcao}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectCustomizado;
