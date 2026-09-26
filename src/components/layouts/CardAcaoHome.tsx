import decorativoAbrir from '../../assets/decorativo-abrir-chamado.png';
import decorativoPesquisar from '../../assets/decorativo-pesquisar.png';

interface CardAcaoHomeProps {
  variante: 'escuro' | 'claro';
  titulo: string;
  subtitulo: string;
  textoBotao: string;
  onAction?: () => void;
}

function CardAcaoHome({
  variante,
  titulo,
  subtitulo,
  textoBotao,
  onAction,
}: CardAcaoHomeProps) {
  const estilos = {
    escuro: {
      fundo: 'bg-gradient-to-br from-[#0089C9] to-[#00699C]',
      titulo: 'text-white',
      subtitulo: 'text-white/90',
      botao: 'bg-slate-100 text-primary hover:bg-white',
      imagem: decorativoAbrir,
    },
    claro: {
      fundo: 'bg-gradient-to-br from-slate-100 to-blue-100',
      titulo: 'text-slate-700',
      subtitulo: 'text-slate-500',
      botao: 'bg-primary text-white border-2 border-white hover:bg-primary/90',
      imagem: decorativoPesquisar,
    },
  }[variante];

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[28px] px-6 py-6 shadow-md ${estilos.fundo}`}
    >
      <img
        src={estilos.imagem}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-2 top-3/4 -translate-y-1/2 w-24 h-24 object-contain opacity-95"
      />

      <div className="relative z-10 pr-24 flex flex-col gap-0.5">
        <h2
          className={`font-extrabold text-2xl tracking-tight leading-tight ${estilos.titulo}`}
        >
          {titulo}
        </h2>
        <p className={`text-sm ${estilos.subtitulo}`}>{subtitulo}</p>
      </div>

      <button
        onClick={onAction}
        className={`relative z-10 mt-5 font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm transition-colors ${estilos.botao}`}
      >
        {textoBotao}
      </button>
    </div>
  );
}

export default CardAcaoHome;
