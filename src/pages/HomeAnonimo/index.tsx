import { useNavigate } from 'react-router-dom';
import { GradientHeader } from '../../components/ui/GradientHeader';
import CardAcaoHome from '../../components/layouts/CardAcaoHome';
import Button from '../../components/ui/Button';
import { Footer } from '../../components/ui/Footer';
import { CircleCheck } from 'lucide-react';
import decorativoPesquisar from '../../assets/decorativo-pesquisar.png';

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
    <div className="w-90 h-200 mx-auto overflow-y-auto flex flex-col bg-white relative">
      <GradientHeader />

      <div className="flex flex-col px-4 pt-5 gap-2 mt-12">
        <span className="text-2xl font-bold text-primary">Olá, Bem-Vindo!</span>
        <span className="text-sm font-bold">
          Crie sua conta e tenha acesso a:
        </span>

        <div className="h-0.5 w-full bg-linear-to-r from-primary/0 via-primary to-primary/0 my-1" />

        <div className="flex flex-col gap-2">
          {beneficios.map((texto) => (
            <div key={texto} className="flex items-center gap-2">
              <CircleCheck className="w-5 h-5 shrink-0 stroke-green-500" />
              <span className="text-xs">{texto}</span>
            </div>
          ))}
        </div>

        <img
          src={decorativoPesquisar}
          className="w-30 h-30 self-end -mt-30"
          alt="Ilustração de celular com aprovação"
        />

        <Button
          variant="solid"
          className="mt-2 w-45 h-10 rounded-3xl! text-xl font-light"
          onClick={criarConta}
        >
          Criar Conta
        </Button>
      </div>

      <div className="flex flex-col gap-4 px-4 mt-6">
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

      <Footer />
    </div>
  );
}

export default HomeAnonimo;
