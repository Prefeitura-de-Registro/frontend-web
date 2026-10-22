import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface CampoCadastroProps {
  label: string;
  placeholder: string;
  valor: string;
  onChange: (valor: string) => void;
  tipo?: 'text' | 'email' | 'password';
  icon: ReactNode;
}

function CampoCadastro({
  label,
  placeholder,
  valor,
  onChange,
  tipo = 'text',
  icon,
}: CampoCadastroProps) {
  return (
    <div className="w-full">
      <label className="mb-1 block text-[17px] font-medium text-primary">
        {label}
      </label>

      <div className="relative flex h-[45px] w-full items-center border-b-[1.5px] border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="ml-2 text-primary">{icon}</div>

        <input
          type={tipo}
          value={valor}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-full flex-1 bg-transparent px-3 text-[15px] text-black outline-none placeholder:text-[#AAB1BC]"
        />

        {valor && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={`Limpar campo ${label}`}
            className="mr-2 text-[#4A5565]"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        )}
      </div>
    </div>
  );
}

export default CampoCadastro;
