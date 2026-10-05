import { useNavigate } from 'react-router-dom';
import CardAcaoHome from '../../components/layouts/CardAcaoHome';
import Button from '../../components/ui/Button';
import { Footer } from '../../components/ui/Footer';
import { CircleCheck } from 'lucide-react';
import decorativoClique from '../../assets/decorativo-clique.png';

function HomeAnonimo() {
  const navigate = useNavigate();

  function criarConta() {
    navigate('/cadastro');
  }
  function abrirChamado() {
    navigate('/formulario/ocorrencia');
  }
  function pesquisarChamado() {
    navigate('/chamados');
  }

  const beneficios = [
    'Histórico completo dos chamados.',
    'Notificações em tempo real.',
    'Maior controle',
    'Agilidade nos registros',
  ];

  return (
    <div className="w-full min-h-screen mx-auto flex flex-col justify-between bg-white px-5 pt-20 pb-6 font-sans">
      <div className="relative w-full pt-1">
        <div className="max-w-[60%] flex flex-col gap-1">
          <h1 className="text-[28px] font-bold text-primary leading-tight tracking-tight">
            Olá, Bem-Vindo!
          </h1>

          <p className="text-xs font-bold text-black mt-1">
            Crie sua conta e tenha acesso a:
          </p>

          <div className="w-full h-[1.5px] bg-primary/20 my-2" />

          <div className="flex flex-col gap-2">
            {beneficios.map((texto) => (
              <div key={texto} className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 shrink-0 text-success fill-success text-white" />
                <span className="text-[11px] font-semibold text-gray-900 leading-tight">
                  {texto}
                </span>
              </div>
            ))}
          </div>

          <Button
            variant="solid"
            className="mt-4 w-36 h-10 rounded-full text-sm font-semibold shadow-xs"
            onClick={criarConta}
          >
            Criar conta
          </Button>
        </div>

        <img
          src={decorativoClique}
          className="w-36 h-auto absolute -right-2 top-2 pointer-events-none object-contain"
          alt="Ilustração telemóvel"
        />
      </div>

      <div className="flex flex-col gap-4 my-6">
        <CardAcaoHome
          variante="escuro"
          titulo="Abrir chamado"
          subtitulo="Registre uma nova ocorrência"
          textoBotao="Abrir"
          onAction={abrirChamado}
        />
        <CardAcaoHome
          variante="claro"
          titulo="Pesquisar chamado"
          subtitulo="Pesquise uma ocorrência"
          textoBotao="Pesquisar"
          onAction={pesquisarChamado}
        />
      </div>

      <div className="pt-2">
        <Footer />
      </div>
    </div>
  );
}

export default HomeAnonimo;
