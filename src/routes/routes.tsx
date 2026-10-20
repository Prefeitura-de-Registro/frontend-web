import { createBrowserRouter } from 'react-router-dom';
import { EmConstrucao } from './emConstrucao';
import LoginMunicipe from '../pages/LoginMunicipe';
import TesteComponentes from '../pages/TesteComponentes';
import { FormularioLocalizacao } from '../pages/FormularioLocalizacao';
import { DetalhesChamado } from '../pages/Detalhes';
import FormularioOcorrencia from '../pages/FormularioOcorrencia';
import { FormularioFotos } from '../pages/FormularioFotos';
import { FormLayout } from '../components/layouts/FormLayout';
import Conclusao from '../pages/Conclusao';
import { HomeLayout } from '../components/layouts/HomeLayout';
import HomeSecundaria from '../pages/HomeSecundaria';
import Home from '../pages/Home';
import HomeAnonimo from '../pages/HomeAnonimo';
import ListaChamadosAnonimo from '../pages/ListaChamadosAnonimo';
import Revisao from '../pages/Revisao';
import Respostas from '../pages/Respostas';
import { Notificacoes } from '../pages/Notificacoes';
import Splash from '../pages/Splash';
import Cadastro from '../pages/Cadastro';
import SignIn from '../pages/SignIn';
import PesquisarChamado from '../pages/PesquisaChamado';
import StandardLayout from '../components/layouts/StandardLayout';
import HomeChamados from '../pages/HomeChamados';

// Imports da Área do Servidor
import { ServidorLayout } from '../components/layouts/ServidorLayout';
import { ServidorDashboard } from '../pages/ServidorDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    element: <StandardLayout />,
    children: [
      {
        path: '/login',
        element: <LoginMunicipe />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/conclusao',
        element: <Conclusao />,
      },
    ],
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/chamados-id',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <HomeSecundaria />,
      },
    ],
  },
  {
    path: '/notificacoes',
    element: <Notificacoes />,
  },
  {
    path: '/anonimo',
    element: <HomeAnonimo />,
  },
  {
    path: '/chamados',
    element: <ListaChamadosAnonimo />,
  },
  {
    path: '/home-chamados',
    element: <HomeChamados />,
  },
  {
    path: '/buscar-chamados',
    element: <PesquisarChamado />,
  },
  {
    path: '/formulario',
    element: <FormLayout />,
    children: [
      {
        path: '',
        element: <EmConstrucao nome="Formulário" />,
      },
      {
        path: 'ocorrencia',
        element: <FormularioOcorrencia />,
      },
      {
        path: 'endereco',
        element: <FormularioLocalizacao />,
      },
      {
        path: 'fotos',
        element: <FormularioFotos />,
      },
      {
        path: 'confirmacao',
        element: <EmConstrucao nome="Confirmação" />,
      },
      {
        path: 'revisao',
        element: <Revisao />,
      },
    ],
  },
  {
    path: '/detalhes',
    element: <DetalhesChamado />,
  },
  {
    path: '/respostas',
    element: <Respostas />,
  },
  {
    path: '/teste-componentes',
    element: <TesteComponentes />,
  },

  /* =========================================================
   * ROTAS SEPARADAS DA ÁREA DO SERVIDOR (PAINEL ADMINISTRATIVO)
   * ========================================================= */
  {
    path: '/servidor',
    element: <ServidorLayout />,
    children: [
      {
        path: '',
        element: <ServidorDashboard />,
      },
    ],
  },

  {
    path: '*',
    element: <EmConstrucao nome="Página Não Encontrada" />,
  },
]);
