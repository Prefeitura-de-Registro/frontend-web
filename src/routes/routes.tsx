import { createBrowserRouter } from 'react-router-dom';
import { EmConstrucao } from './emConstrucao';
import LoginMunicipe from '../pages/LoginMunicipe';
import TesteComponentes from '../pages/TesteComponentes';
import { FormularioLocalizacao } from '../pages/FormularioLocalizacao';
import { DetalhesChamado } from '../pages/Detalhes';
import FormularioOcorrencia from '../pages/form-ocorrencia';
import { FormularioFotos } from '../pages/FormularioFotos';
import { FormLayout } from '../components/layouts/FormLayout';
import Conclusao from '../pages/Conclusao';
import { HomeLayout } from '../components/layouts/HomeLayout';
import HomeSecundaria from '../pages/HomeSecundaria';
import { DetalhesChamado } from '../pages/Detalhes';
import Home from '../pages/Home';
import HomeAnonimo from '../pages/HomeAnonimo';
import ListaChamadosAnonimo from '../pages/ListaChamadosAnonimo';
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
        path: 'chamados-id',
        element: <HomeSecundaria />,
      },
    ],
  },
  {
    path: 'anonimo',
    element: <HomeAnonimo />,
  },
  {
    path: 'chamados',
    element: <ListaChamadosAnonimo />,
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
