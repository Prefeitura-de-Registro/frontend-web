import { createBrowserRouter } from 'react-router-dom';
import { EmConstrucao } from './emConstrucao';
import TesteComponentes from '../pages/TesteComponentes';
import { FormularioLocalizacao } from '../pages/FormularioLocalizacao';
import { FormLayout } from '../components/layouts/FormLayout';
import Conclusao from '../pages/Conclusao';
import { HomeLayout } from '../components/layouts/HomeLayout';
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
        element: <FormularioLocalizacao />,
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
