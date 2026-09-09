import { createBrowserRouter } from 'react-router-dom';
import { EmConstrucao } from './emConstrucao';
import TesteComponentes from '../pages/TesteComponentes';
import { HomeLayout } from '../components/layouts/HomeLayout';
import HomeSecundaria from '../pages/HomeSecundaria';
// import { FormLayout } from '../components/layouts/FormLayout';

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
        element: <div>Sua Tela Home Aqui</div>,
      },
      {
        path: 'chamados',
        element: <HomeSecundaria />,
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
    path: '*',
    element: <EmConstrucao nome="" />,
  },
  {
    path: '/teste-componentes',
    element: <TesteComponentes />,
  },
]);
