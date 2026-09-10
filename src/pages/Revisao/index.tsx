import type { ReactNode } from 'react';

import { ClipboardPenLine, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import mapaLocalizacao from '../../assets/mapa-localizacao.png';

const ocorrencia = {
  tipo: 'Buraco',
  descricao: 'Buraco grande, oferecendo riscos de queda.',
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
    <section className="overflow-hidden rounded-2xl shadow-sm">
      <div className="flex h-[34px] items-center justify-center gap-2 bg-white">
        <div className="h-5 w-5 text-primary">{icon}</div>

        <h2 className="text-base font-bold text-primary">{titulo}</h2>
      </div>

      <div className={contentClassName}>{children}</div>

      <button
        type="button"
        onClick={onEditar}
        className="h-[45px] w-full bg-primary text-sm font-bold text-white transition-colors hover:bg-primary/90"
      >
        Editar
      </button>
    </section>
  );
}

function Revisao() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-6 pt-8">
      <RevisionSection
        titulo="Ocorrência"
        icon={<ClipboardPenLine className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/ocorrencia')}
        contentClassName="bg-tertiary px-6 py-5"
      >
        <div className="space-y-4 text-sm text-black">
          <p>
            <strong className="text-primary">Tipo:</strong> {ocorrencia.tipo}
          </p>

          <div>
            <p className="mb-2">
              <strong className="text-primary">Descrição:</strong>
            </p>

            <div className="min-h-32 rounded-xl bg-white px-4 py-4">
              {ocorrencia.descricao}
            </div>
          </div>

          <div>
            <p className="mb-1">
              <strong className="text-primary">Condições:</strong>
            </p>

            <ul className="list-disc space-y-1 pl-5">
              {ocorrencia.condicoes.map((condicao) => (
                <li key={condicao}>{condicao}</li>
              ))}
            </ul>
          </div>
        </div>
      </RevisionSection>

      <RevisionSection
        titulo="Localização"
        icon={<MapPin className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/endereco')}
        contentClassName="bg-white"
      >
        <div>
          <div className="px-6 py-3 text-sm text-black">
            {localizacao.rua}, {localizacao.numero} — {localizacao.bairro}
          </div>

          <div className="relative h-72 w-full overflow-hidden">
            <img
              src={mapaLocalizacao}
              alt="Mapa da localização da ocorrência"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-12 w-12 text-primary"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              </svg>
            </div>
          </div>
        </div>
      </RevisionSection>
    </div>
  );
}

export default Revisao;
