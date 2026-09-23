
# Web & PWA — Portal do Munícipe e Sistema de Chamados (Fala Registro!)

Aplicação Web e Progressive Web App (PWA) desenvolvida para a Prefeitura de Registro no âmbito da disciplina de Laboratório de Práticas do curso de Desenvolvimento de Software Multiplataforma da **FATEC Registro**. O sistema otimiza o fluxo de comunicação entre munícipes e a prefeitura para o registro, revisão e acompanhamento de ocorrências urbanas.

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (Ícones)

## Base

- Arquitetura front-end desenvolvida com abordagem **mobile-first**, focada em componentes atômicos reutilizáveis (`src/components/ui/`), gerenciamento de rotas desacoplado e fidelidade total ao Design System da Prefeitura de Registro.

---

## Descrição do Projeto

O **Fala Registro! (Web/PWA)** é a interface voltada principalmente para o **Munícipe**, permitindo tanto o acesso anônimo quanto autenticado. O sistema engloba o fluxo completo de abertura de ocorrências (buracos, poda, iluminação, vazamentos) por meio de formulários multi-etapas (*steppers* interativos), anexos de mídias, geolocalização, tela de revisão de dados e rastreamento de chamados via número de protocolo.

## Links

### Aplicação (Deploy / Produção)

| Branch  | URL / Status  |
| ------- | ------------- |
| main    | *[A definir]* |
| develop | *[A definir]* |

### Repositórios e Documentação

| Recurso | Link |
| ------- | ---- |
| Repositório Front-End | [GitHub Repo](link_aqui) |
| Protótipo de Alta Fidelidade | [Figma](https://www.figma.com/design/Bwr7x8qVfHV4YYScA9KeW2/LP---Prefeitura-de-Registro) |

## Guia de Contribuição

- **Fluxo de Branches:** Organizado por *Issues* e sub-branches focadas em tarefas granulares (ex: `feat/componentizacao`, `fix/forms-layout`).
- **Padrão de Commits:** Utilizar o padrão de *Conventional Commits* (`feat:`, `fix:`, `chore:`, `refactor:`, etc.).
- **Pull Request:** Todo código deve passar por validação de branch, build local e testes de interface antes de realizar o *merge* para as branches principais (`develop` / `main`).

## Setup Local

Siga os passos abaixo para rodar o projeto web em sua máquina:

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd <nome-da-pasta>

```

2. **Instale as dependências:**

```bash
npm install
# ou yarn install / pnpm install

```

3. **Configure as variáveis de ambiente:**

* Crie um arquivo `.env` na raiz do projeto baseado no `.env.example` (se aplicável), configurando a URL base da API.

4. **Execute o projeto em modo de desenvolvimento:**

```bash
npm run dev

```

* Acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Scripts

Lista dos principais comandos disponíveis no `package.json`:

* `npm run dev`: Inicia o servidor de desenvolvimento com Vite.
* `npm run build`: Compila a aplicação otimizada para produção.
* `npm run preview`: Visualiza o build de produção localmente.
* `npm run lint`: Executa a varredura de boas práticas e erros de linter.

## Estrutura de Pastas

```text
src/
├── assets/             # Imagens, brasões da prefeitura e mapas estáticos
├── components/         # Componentes reutilizáveis do Design System
│   └── ui/             # Elementos atômicos e moleculares (CampoTexto, Select, Stepper, Footer, etc.)
├── layout/             # Componentes de estrutura e molduras de tela
├── pages/              # Páginas principais e telas do PWA
│   ├── Formulario/     # Etapas do fluxo de ocorrência (Ocorrência, Endereço, Fotos, Revisão)
│   ├── Revisao/        # Tela de consolidação e edição de chamados
│   └── ListaChamadosAnonimo/ # Módulo de rastreio por protocolo
├── routes/             # Configuração de rotas e navegação via React Router
├── types/              # Tipagens e interfaces globais em TypeScript
└── App.tsx             # Componente raiz

```

## Rotas Principais

* `/`: Tela inicial (Home) com cards de ação dinâmicos.
* `/acompanhar` ou `/chamados/anonimo`: Consulta de chamados anônimos via número de protocolo.
* `/formulario/ocorrencia`: Primeira etapa do registro de ocorrências (seleção de categorias e descrição).
* `/formulario/endereco`: Segunda etapa (bairro, rua, número e mapa).
* `/formulario/fotos`: Terceira etapa (anexo de fotos e vídeos).
* `/formulario/revisao`: Tela de resumo e conferência final antes do envio.
* `/chamado/detalhes`: Visualização aprofundada do status, descrição e timeline do protocolo.
* `/notificacoes`: Central de avisos e atualizações do usuário.
* `/auth/login` & `/auth/cadastro`: Fluxos de autenticação e registro de munícipes.

## Integração com Back-end

* Arquitetura preparada para comunicação via API REST.
* Utilização de dados simulados (*mocks*) e rotinas assíncronas para validação de protocolos e simulação de atraso de rede durante o desenvolvimento das interfaces.

## Observações Gerais

* **Design System:** Evite criar estilos CSS customizados isolados nas páginas; utilize preferencialmente as classes utilitárias do Tailwind CSS e os componentes base padronizados em `src/components/ui/` para manter a consistência visual com o Figma.
* **Responsividade:** O layout foi construído prioritariamente para visualização em formato de aplicativo móvel (PWA), adaptando-se fluidamente a containers centralizados em telas maiores.
