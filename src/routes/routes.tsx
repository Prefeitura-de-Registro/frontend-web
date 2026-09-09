import { createBrowserRouter } from 'react-router-dom';
import { EmConstrucao } from './emConstrucao';
import TesteComponentes from '../pages/TesteComponentes';
import { DetalhesChamado } from '../pages/Detalhes';
import { HomeLayout } from '../components/layouts/HomeLayout';
// import { FormLayout } from '../components/layouts/FormLayout';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <EmConstrucao nome="Login" />,
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
    element: <EmConstrucao nome="formulario" />,
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
        element: <EmConstrucao nome="Revisão" />,
      },
    ],
  },
  {
    path: '/detalhes',
    element: <DetalhesChamado />,
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
