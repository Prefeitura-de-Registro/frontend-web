import { useState } from 'react';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import filtro from '../../assets/filtro.png';

export interface FiltrosChamado {
  prioridade: 'aberto' | 'em andamento' | 'concluído' | null;
  tipos: string[];
}

interface FiltroChamadosModalProps {
  aberto: boolean;
  onFechar: () => void;
  filtrosAtuais: FiltrosChamado;
  onAplicar: (filtros: FiltrosChamado) => void;
}

const PRIORIDADES: {
  value: FiltrosChamado['prioridade'];
  label: string;
  corAtiva: string;
  corInativa: string;
}[] = [
  {
    value: 'aberto',
    label: 'Abertos',
    corAtiva: 'bg-danger text-white border-danger',
    corInativa: 'bg-white text-danger border-danger',
  },
  {
    value: 'em andamento',
    label: 'Andamento',
    corAtiva: 'bg-primary text-white border-primary',
    corInativa: 'bg-white text-primary border-primary',
  },
  {
    value: 'concluído',
    label: 'Concluído',
    corAtiva: 'bg-success text-white border-success',
    corInativa: 'bg-white text-success border-success',
  },
];

const TIPOS = [
  { value: 'buraco', label: 'Buraco' },
  { value: 'luz', label: 'Iluminação Pública' },
  { value: 'poda', label: 'Poda de Árvore' },
  { value: 'vazamento', label: 'Vazamento' },
];

function FiltroChamadosModal({
  aberto,
  onFechar,
  filtrosAtuais,
  onAplicar,
}: FiltroChamadosModalProps) {
  const [prioridade, setPrioridade] = useState(filtrosAtuais.prioridade);
  const [tipos, setTipos] = useState<string[]>(filtrosAtuais.tipos);

  if (!aberto) return null;

  function toggleTipo(tipo: string) {
    setTipos((atual) =>
      atual.includes(tipo) ? atual.filter((t) => t !== tipo) : [...atual, tipo],
    );
  }

  function handleLimpar() {
    setPrioridade(null);
    setTipos([]);
  }

  function handleAplicar() {
    onAplicar({ prioridade, tipos });
    onFechar();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onFechar}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
            <img src={filtro} alt="" className="w-5 h-5 object-contain" />
            Filtro
          </h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar filtro"
            className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="font-bold text-gray-800 mb-2">Prioridade</p>
        <div className="flex gap-2 mb-5">
          {PRIORIDADES.map((p) => {
            const selecionado = prioridade === p.value;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => setPrioridade(selecionado ? null : p.value)}
                className={twMerge(
                  'px-4 py-2 rounded-full border-2 text-sm font-bold transition-colors',
                  selecionado ? p.corAtiva : p.corInativa,
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <p className="font-bold text-gray-800 mb-2">Tipo de ocorrência</p>
        <div className="flex flex-col gap-3 mb-6">
          {TIPOS.map((t) => (
            <label
              key={t.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={tipos.includes(t.value)}
                onChange={() => toggleTipo(t.value)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-800">{t.label}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleLimpar}
            className="flex-1 h-11 rounded-2xl border border-primary text-primary font-bold text-sm"
          >
            Limpar filtros
          </button>
          <button
            type="button"
            onClick={handleAplicar}
            className="flex-1 h-11 rounded-2xl bg-primary text-white font-bold text-sm"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}

export default FiltroChamadosModal;
