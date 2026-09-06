# Setup e Testes Locais

Este guia contém as instruções necessárias para configurar o ambiente do Front-end na sua máquina, rodar a aplicação e executar os testes locais antes de enviar seu código.

## Pré-requisitos
* [Node.js](https://nodejs.org/) (Versão 20 ou superior)
* Git instalado

## Passo 1: Instalação
Clone o repositório e instale as dependências. Ao rodar a instalação, os gatilhos locais (Husky) serão ativados automaticamente na sua máquina.

```bash
git clone <url-do-repositorio>
cd frontend-web
npm install
```

## OBS:
Recomendamos a leitura do manual Fluxo do Desenvolvedor(fluxo-desenvolvedor.md) para entender o passo a passo de como puxar, acessar e manipular a branch da sua tarefa."

## Passo 2: Rodando o Servidor de Desenvolvimento
Para programar e ver as alterações em tempo real no navegador:

```bash
npm run dev
```
O terminal mostrará um link (geralmente `http://localhost:5173`). Clique nele para abrir a aplicação.

## Passo 3: Testes e Cobertura (Vitest)
Nós utilizamos o Vitest para testes. Antes de enviar seu código, garanta que suas funções estão funcionando corretamente.

* **Para testar visualmente (Recomendado):** Abre um painel interativo no navegador.
  ```bash
  npm run test:local
  ```
* **Para rodar testes no terminal:**
  ```bash
  npm run test
  ```
* **Para ver a porcentagem de código testado (Coverage):**
  ```bash
  npm run test:coverage
  ```

## Passo 4: Formatação de Código
Você não precisa se preocupar em formatar o código manualmente antes do commit, pois o Husky fará isso por você de forma automática. No entanto, se quiser forçar a formatação do projeto inteiro a qualquer momento, rode:

```bash
npm run format
```