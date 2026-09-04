# Frontend Web - Laboratório de Práticas

Bem-vindo ao repositório do Front-end!

## 1. Arquitetura e Pipeline (CI/CD)

Nossa esteira de integração contínua (CI) e o empacotamento da aplicação são totalmente automatizados para proteger a branch `main`.

*   **Stack Principal:** React + Vite, Tailwind CSS.
*   **Containerização (Docker + NGINX):** O projeto utiliza um *multi-stage build*. O Node.js compila o código e um servidor web NGINX otimizado e leve (Alpine) serve os arquivos estáticos, já configurado para evitar erros 404 nas rotas do React.
*   **Qualidade de Código (Lint & Format):** Utilizamos **ESLint** para capturar erros lógicos no React e **Prettier** para garantir a padronização visual do código (espaçamentos, aspas, etc).
*   **Git Hooks (Husky + lint-staged):** A automação local está ativada. Toda vez que você tenta fazer um `git commit`, o Husky intercepta a ação, formata o código modificado e corrige erros básicos automaticamente antes de salvar.
*   **Integração Contínua (GitHub Actions):** Todo Pull Request dispara o arquivo `.github/workflows/ci.yml`. O robô realiza:
    1. Instalação limpa (`npm ci`)
    2. Verificação de sintaxe (`npm run lint`)
    3. Testes unitários com relatório de cobertura (`npm run test:coverage`)
    4. Build de produção (`npm run build`)
    *Nota: O merge só é liberado se todas as etapas passarem com sucesso.*

---

## 🚀 2. Guia do Desenvolvedor (Passo a Passo)

Siga estas instruções para configurar o ambiente na sua máquina e começar a programar.

### Pré-requisitos
*   [Node.js](https://nodejs.org/) (Versão 20 ou superior)
*   Git instalado

### Passo 1: Instalação
Clone o repositório e instale as dependências. Ao rodar a instalação, os gatilhos locais (Husky) serão ativados automaticamente na sua máquina.
```bash
git clone <url-do-repositorio>
cd frontend-web
npm install
```

### Passo 2: Rodando o servidor de desenvolvimento
Para programar e ver as alterações em tempo real no navegador
```bash
npm run dev
```
O terminal mostrará um link (geralmente http://localhost:port). Clique nele para abrir a aplicação

### Passo 3: Testes e Cobertura (Vitest)
Nos utilizamos o Vitest para testes. Antes de enviar seu código, garanta que suas funções estão funcionando. 
- Para testar visualmente (Recomendado): Abre um painel interativo no navegador.
```bash
npm run test:local
```

- Para rodar testes no terminal
```bash
npm run test
```

- Para ver a porcentagem de código testado (Coverage)
```bash
npm run test:coverage
```

### Passo 4: Formatação de código
Você não precisa se preocupar em formatar o código manualmente antes do commit, pois o Husky fará isso por você. No entanto, se quiser formatar o projeto inteiro a qualquer momento, rode:
```bash
npm run format
```

### Passo 5: Subindo suas alterações (Git Flow)

1. Nunca trabalhe direto na `main`. Crie sua branch diretamente pelo botão **Create a branch** na Issue correspondente no GitHub.
2. No seu terminal, baixe as atualizações e acesse a branch recém-criada (não utilize o `-b`):

```bash
git fetch origin
git checkout nome-da-branch-da-issue
git add .
git commit -m "feat: adiciona nova tela de login"
git push origin nome-da-branch-da-issue
```

