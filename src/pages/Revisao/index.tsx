import type { ReactNode } from 'react';
import { ClipboardPenLine, MapPin, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import mapaLocalizacao from '../../assets/mapa-localizacao.png';

const ocorrencia = {
  tipo: 'Buraco',
  descricao: 'Buraco grande, oferecendo riscos de quedas.',
  condicoes: ['Mais de 1m', 'Calçada / Passeio público', 'Ciclovia'],
};

const localizacao = {
  bairro: 'Jardim das Flores',
  rua: 'Rua Paulistano',
  numero: '132',
};

interface RevisionSectionProps {
  titulo: string;
  icon: ReactNode;
  children: ReactNode;
  onEditar: () => void;
  contentClassName?: string;
}

function RevisionSection({
  titulo,
  icon,
  children,
  onEditar,
  contentClassName = '',
}: RevisionSectionProps) {
  return (
    <section className="overflow-hidden rounded-3xl shadow-sm border border-slate-200 bg-white">
      {/* Cabeçalho da seção */}
      <div className="flex h-11 items-center justify-center gap-2 bg-white border-b border-slate-100">
        <div className="h-5 w-5 text-primary flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-base font-bold text-primary">{titulo}</h2>
      </div>

      <div className={contentClassName}>{children}</div>

      {/* Botão de Editar */}
      <button
        type="button"
        onClick={onEditar}
        className="h-11 w-full bg-sky-700 text-sm font-bold text-white transition-colors hover:bg-sky-800 flex items-center justify-center gap-2"
      >
        <ClipboardPenLine size={16} />
        Editar
      </button>
    </section>
  );
}

function Revisao() {
  const navigate = useNavigate();

  const handleConfirmar = () => {
    // Lógica para enviar os dados do formulário para o backend
    navigate('/conclusao');
  };

  return (
    <div className="w-full space-y-6 pb-6">
      {/* 1. Seção de Ocorrência */}
      <RevisionSection
        titulo="Ocorrência"
        icon={<ClipboardPenLine className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/ocorrencia')}
        contentClassName="bg-slate-50/70 px-6 py-5"
      >
        <div className="space-y-4 text-sm text-slate-800">
          <p>
            <strong className="text-sky-900 font-semibold">Tipo:</strong>{' '}
            {ocorrencia.tipo}
          </p>

          <div>
            <p className="mb-1.5">
              <strong className="text-sky-900 font-semibold">Descrição:</strong>
            </p>
            <div className="min-h-24 rounded-2xl bg-white border border-slate-200 px-4 py-3 text-slate-700 shadow-sm">
              {ocorrencia.descricao}
            </div>
          </div>

          <div>
            <p className="mb-1.5">
              <strong className="text-sky-900 font-semibold">Condições:</strong>
            </p>
            <ul className="list-disc space-y-1 pl-5 text-slate-700">
              {ocorrencia.condicoes.map((condicao) => (
                <li key={condicao}>{condicao}</li>
              ))}
            </ul>
          </div>
        </div>
      </RevisionSection>

      {/* 2. Seção de Localização */}
      <RevisionSection
        titulo="Localização"
        icon={<MapPin className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/endereco')}
        contentClassName="bg-white"
      >
        <div>
          <div className="px-6 py-3.5 text-sm font-medium text-slate-800 border-b border-slate-100">
            {localizacao.rua}, {localizacao.numero} — {localizacao.bairro}
          </div>

          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={mapaLocalizacao}
              alt="Mapa da localização da ocorrência"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                <MapPin className="h-8 w-8 text-red-600 drop-shadow" />
              </div>
            </div>
          </div>
        </div>
      </RevisionSection>

      {/* 3. Seção de Fotos / Vídeos (Que estava faltando) */}
      <RevisionSection
        titulo="Fotos / Vídeos"
        icon={<Camera className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/fotos')}
        contentClassName="bg-slate-50/70 p-5"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-300 shadow-sm bg-white">
            <img
              src={mapaLocalizacao}
              alt="Foto da ocorrência"
              className="w-full h-full object-cover"
            />
            {/* Botão de excluir foto (X vermelho) */}
            <button
              type="button"
              className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow hover:bg-red-700 transition"
              title="Remover foto"
            >
              <X size={12} strokeWidth={3} />
            </button>
          </div>
        </div>
      </RevisionSection>

      {/* Botões Finais de Confirmação e Cancelamento */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={handleConfirmar}
          className="w-full bg-sky-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:bg-sky-800 transition text-center"
        >
          Confirmar
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full bg-slate-100 border border-slate-300 text-sky-700 font-bold py-3.5 px-6 rounded-2xl shadow-sm hover:bg-slate-200 transition text-center"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Revisao;
