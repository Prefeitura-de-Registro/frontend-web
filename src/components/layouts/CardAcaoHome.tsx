import decorativoAbrir from '../../assets/decorativo-abrir-chamado.png';
import decorativoPesquisar from '../../assets/decorativo-pesquisar.png';

interface CardAcaoHomeProps {
  variante: 'escuro' | 'claro';
  titulo: string;
  subtitulo: string;
  textoBotao: string;
  onAction?: () => void;
}

/**
 * Card de ação da Home (ex: "Abrir chamado", "Pesquisar chamado").
 * Mesma estrutura visual nos dois casos, só muda a paleta, o conteúdo e a
 * ilustração — como só existem essas duas variantes, as imagens já ficam
 * embutidas aqui dentro, sem precisar passar por prop.
 */
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
      className={`relative w-full max-w-md overflow-hidden rounded-[32px] px-8 py-9 ${estilos.fundo}`}
    >
      <img
        src={estilos.imagem}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-6 top-3/4 -translate-y-1/2 w-40 h-40 object-contain opacity-95"
      />

      <div className="relative z-10 flex flex-col gap-1 max-w-[65%]">
        <h2
          className={`font-extrabold text-3xl leading-tight ${estilos.titulo}`}
        >
          {titulo}
        </h2>
        <p className={`text-lg ${estilos.subtitulo}`}>{subtitulo}</p>
      </div>

      <button
        onClick={onAction}
        className={`relative z-10 mt-7 font-semibold text-lg px-10 py-3 rounded-full shadow-sm transition-colors ${estilos.botao}`}
      >
        {textoBotao}
      </button>
    </div>
  );
}

export default CardAcaoHome;
