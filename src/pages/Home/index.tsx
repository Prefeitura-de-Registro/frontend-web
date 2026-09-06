import { useNavigate } from 'react-router-dom';
import CardAcaoHome from '../../components/layouts/CardAcaoHome';

function Home() {
  const navigate = useNavigate();

  function abrirChamado() {
    navigate('/formulario/ocorrencia');
  }

  return (
    <CardAcaoHome
      variante="escuro"
      titulo="Abrir chamado"
      subtitulo="Registre uma nova ocorrência"
      textoBotao="Abrir"
      onAction={abrirChamado}
    />
  );
}

export default Home;
