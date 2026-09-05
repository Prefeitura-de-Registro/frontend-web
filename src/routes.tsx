import { createBrowserRouter } from 'react-router-dom';
import { EmConstrucao } from './EmConstrucao';
// utilize o placeholder enquanto as telas ainda não existem

export const router = createBrowserRouter([
  // crie os placeholder aqui, conforme as telas forem criadas vamos substituindo os placeholder
  {
    path: '/login',
    element: <EmConstrucao nome="Login" />,
  },
  {
    path: '/',
    element: <EmConstrucao nome="" />,
  },
  {
    path: '/chamados',
    element: <EmConstrucao nome="Home com chamados listados" />,
  },
  {
    path: '/chamados/:id',
    element: <EmConstrucao nome="Detalhes do chamado" />,
  },
  {
    path: '/formulario/ocorrencia',
    element: <EmConstrucao nome="Formulário — Passo 1 (ocorrência)" />,
  },
  {
    path: '/formulario/endereco',
    element: <EmConstrucao nome="Formulário — Passo 2 (endereço/mapa)" />,
  },
  {
    path: '/formulario/fotos',
    element: <EmConstrucao nome="Formulário — Passo 3 (anexar fotos)" />,
  },
  {
    path: '/formulario/confirmacao',
    element: <EmConstrucao nome="Formulário — Passo 4 (confirmação)" />,
  },
  {
    path: '/formulario/revisao',
    element: <EmConstrucao nome="Revisão antes de enviar" />,
  },
  {
    path: '/formulario/sucesso',
    element: <EmConstrucao nome="Confirmação de chamado aberto" />,
  },

  {
    path: '*',
    element: <EmConstrucao nome="" />,
  },
]);

// /login	Login
// /	Home (vazia)
// /chamados	Home com chamados listados
// /chamados/:id	Detalhes do chamado
// /formulario/ocorrencia	Formulário — Passo 1 (ocorrência)
// /formulario/endereco	Formulário — Passo 2 (endereço/mapa)
// /formulario/fotos	Formulário — Passo 3 (anexar fotos)
// /formulario/confirmacao	Formulário — Passo 4 (confirmação)
// /formulario/revisao	Revisão antes de enviar
// /formulario/sucesso	Confirmação de chamado aberto
