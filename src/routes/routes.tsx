import { createBrowserRouter, Navigate } from 'react-router-dom';
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
import { ProtectedRoute } from '../components/layouts/ProtectedRoute';
import Relatorios from '../pages/Relatorios';

// Imports da Área do Servidor
import { ServidorLayout } from '../components/layouts/ServidorLayout';
import { ServidorDashboard } from '../pages/ServidorDashboard';
import Operadores from '../pages/Operadores';
import NovoOperador from '../pages/Operadores/NovoOperador';
import GestaoChamados from '../pages/GestaoChamados';

export const router = createBrowserRouter([
  /* =========================================================
   * ROTAS PÚBLICAS (Abertas para todos)
   * ========================================================= */
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
    ],
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
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
    path: '/buscar-chamados',
    element: <PesquisarChamado />,
  },
  {
    path: '/teste-componentes',
    element: <TesteComponentes />,
  },

  /* =========================================================
   * ROTAS PROTEGIDAS - APENAS MUNÍCIPES
   * ========================================================= */
  {
    element: <ProtectedRoute allowedRoles={['municipe']} />,
    children: [
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
        path: '/formulario',
        element: <FormLayout />,
        children: [
          { index: true, element: <Navigate to="ocorrencia" replace /> },
          { path: 'ocorrencia', element: <FormularioOcorrencia /> },
          { path: 'endereco', element: <FormularioLocalizacao /> },
          { path: 'fotos', element: <FormularioFotos /> },
          { path: 'confirmacao', element: <EmConstrucao nome="Confirmação" /> },
          { path: 'revisao', element: <Revisao /> },
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
      // Manter a conclusão no layout padrão protegida
      {
        element: <StandardLayout />,
        children: [
          {
            path: '/conclusao',
            element: <Conclusao />,
          },
        ],
      },
    ],
  },

  /* =========================================================
   * ROTAS PROTEGIDAS - APENAS SERVIDORES (PAINEL ADMINISTRATIVO)
   * O ServidorLayout traz a sidebar; as páginas só renderizam conteúdo.
   * ========================================================= */
  {
    element: <ProtectedRoute allowedRoles={['servidor']} />,
    children: [
      {
        path: '/servidor',
        element: <ServidorLayout />,
        children: [
          { index: true, element: <ServidorDashboard /> },
          { path: 'chamados', element: <GestaoChamados /> },
          { path: 'mapa', element: <EmConstrucao nome="Mapa de Ocorrência" /> },
          { path: 'operadores', element: <Operadores /> },
          { path: 'operadores/novo', element: <NovoOperador /> },
          { path: 'relatorios', element: <Relatorios /> },
          {
            path: 'configuracoes',
            element: <EmConstrucao nome="Configurações" />,
          },
        ],
      },
    ],
  },

  /* =========================================================
   * REDIRECTS DE URLs ANTIGAS (evitam link quebrado)
   * ========================================================= */
  {
    path: '/operadores',
    element: <Navigate to="/servidor/operadores" replace />,
  },
  {
    path: '/relatorios',
    element: <Navigate to="/servidor/relatorios" replace />,
  },
  {
    path: '/gestao-chamados',
    element: <Navigate to="/servidor/chamados" replace />,
  },

  /* =========================================================
   * FALLBACK (Erro 404)
   * ========================================================= */
  {
    path: '*',
    element: <EmConstrucao nome="Página Não Encontrada" />,
  },
]);
