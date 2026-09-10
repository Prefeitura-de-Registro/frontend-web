import { createBrowserRouter } from 'react-router-dom';
import { EmConstrucao } from './emConstrucao';
import LoginMunicipe from '../pages/LoginMunicipe';
import TesteComponentes from '../pages/TesteComponentes';
import { DetalhesChamado } from '../pages/Detalhes';
import Conclusao from '../pages/Conclusao';
import { HomeLayout } from '../components/layouts/HomeLayout';
import { FormLayout } from '../components/layouts/FormLayout';
import Home from '../pages/Home';
import Revisao from '../pages/Revisao';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginMunicipe />,
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'chamados',
        element: <div>Lista de Chamados</div>,
      },
    ],
  },
  {
    path: '/formulario',
    element: <FormLayout />,
    children: [
      {
        path: '',
        element: <EmConstrucao nome="" />,
      },
      {
        path: 'ocorrencia',
        element: <EmConstrucao nome="Ocorrência" />,
      },
      {
        path: 'endereco',
        element: <EmConstrucao nome="Endereço" />,
      },
      {
        path: 'fotos',
        element: <EmConstrucao nome="Fotos" />,
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
    path: '/conclusao',
    element: <Conclusao />,
  },
  {
    path: '*',
    element: <EmConstrucao nome="" />,
  },
  {
    path: '/teste-componentes',
    element: <TesteComponentes />,
  },
]);
