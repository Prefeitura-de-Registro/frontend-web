# 🖥️ Manual do Desenvolvedor: Frontend Web

Bem-vindo ao repositório do **Frontend Web**.

Este documento é o guia para configurar o ambiente local, garantir a qualidade do código com as ferramentas da nossa esteira de **CI/CD** e seguir o fluxo de trabalho (**GitFlow**) estabelecido pela equipe.

---

## 🛠️ 1. Pré-requisitos

Antes de começar, garanta que você possui as seguintes ferramentas instaladas na sua máquina:

* [Node.js](https://nodejs.org/) — Versão 20 ou superior
* Git
* Docker
* Docker Desktop — necessário para testes locais em ambiente de produção

---

## 🚀 2. Configuração do Ambiente Local

Este é o modo padrão para desenvolver novas telas, funcionalidades e componentes na sua máquina.

### 2.1 Clone o repositório

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd frontend-web
npm install
```

> Ao executar `npm install`, os gatilhos de segurança locais do **Husky** serão configurados automaticamente.

### 2.2 Inicie o ambiente de desenvolvimento

Para programar e visualizar as alterações em tempo real no navegador, utilize:

```bash
npm run dev
```

O terminal exibirá um endereço semelhante a:

```text
http://localhost:5173
```

Acesse esse endereço no navegador para visualizar a aplicação.

---

## 🧪 3. Qualidade de Código, Testes e Docker

Nossa esteira de **CI/CD (GitHub Actions)** bloqueia automaticamente Pull Requests que:

* Não passarem nos testes;
* Não conseguirem realizar o build;
* Apresentarem problemas de qualidade ou formatação;
* Não atenderem às validações configuradas no projeto.

Por isso, **sempre valide o código localmente antes de enviar suas alterações para o GitHub**.

---

### 🧪 3.1 Testes e Cobertura — Vitest

Utilizamos o **Vitest** para execução dos testes automatizados.

#### Painel interativo no navegador

Para abrir a interface visual dos testes:

```bash
npm run test:local
```

#### Executar testes pelo terminal

Esse é o formato utilizado pela CI:

```bash
npm run test
```

#### Verificar cobertura de testes

Para visualizar a porcentagem do código coberta pelos testes:

```bash
npm run test:coverage
```

---

### 🧹 3.2 Formatação de Código — ESLint e Prettier

O **Husky** executará as validações configuradas automaticamente durante o processo de commit.

Caso seja necessário formatar ou validar o projeto manualmente, utilize:

```bash
npm run format
```

---

### 🐳 3.3 Testando como em Produção — Docker

O projeto utiliza um servidor **NGINX** otimizado para aplicações **Single Page Application (SPA)**.

Isso permite testar localmente o comportamento da aplicação em um ambiente semelhante ao de produção, incluindo o funcionamento das rotas.

#### 1. Gerar a imagem Docker

```bash
docker build -t frontend-web-local .
```

#### 2. Executar o container

```bash
docker run -d -p 8080:80 --name front-app frontend-web-local
```

Após iniciar o container, acesse:

```text
http://localhost:8080
```

#### 3. Encerrar e remover o container

```bash
docker rm -f front-app
```

---

# 🔄 4. Fluxo de Trabalho do Desenvolvedor

Este é o roteiro padrão que todo desenvolvedor deve seguir desde o momento em que o **PO (Product Owner)** disponibiliza a tarefa.

### Cenário de exemplo

O PO criou a **Issue #12**, criou a branch:

```text
feat/12-botao-entrar
```

diretamente no GitHub e atribuiu a tarefa a você.

---

## 📥 4.1 Atualizar o computador

Antes de começar a desenvolver, atualize as referências do Git local para garantir que ele reconheça as branches criadas no servidor.

Execute:

```bash
git fetch --all
```

---

## 🌿 4.2 Entrar na branch da tarefa

Como o PO já criou a branch no GitHub, você **não precisa criar uma nova branch**.

Apenas faça o checkout da branch existente:

```bash
git checkout feat/12-botao-entrar
```

---

## 🔄 4.3 Atualizar a branch com a base

Antes de começar a codificar, traga as últimas alterações da infraestrutura ou da branch principal da sua tarefa para evitar conflitos futuros.

Por exemplo:

```bash
git merge origin/develop
```

Ou, caso a tarefa pertença a uma branch Épica:

```bash
git merge origin/epic/nome-da-sua-epic
```

> A branch utilizada como base deve seguir a orientação definida pelo PO para aquela tarefa.

---

## 💻 4.4 Desenvolver e realizar commits

Agora você pode trabalhar normalmente no código.

Durante o desenvolvimento, execute os testes necessários para garantir que as alterações estão funcionando corretamente.

Após finalizar uma alteração:

```bash
git add .
```

Depois, realize o commit seguindo o padrão definido pela equipe:

```bash
git commit -m "feat: cria o botao de login na tela inicial"
```

O **Husky** executará as validações configuradas durante o processo de commit.

Se alguma validação falhar, corrija os problemas antes de realizar o commit novamente.

---

## 📤 4.5 Enviar as alterações para o GitHub

Depois de finalizar o desenvolvimento, envie as alterações para a mesma branch criada pelo PO:

```bash
git push origin feat/12-botao-entrar
```

---

## 🔀 4.6 Abrir o Pull Request

Após realizar o `push`, acesse o repositório no GitHub.

1. Clique em **Compare & pull request**.
2. Confirme se a branch de destino (**base**) está correta.
3. Confirme se a branch da sua tarefa (**compare**) está correta.

Exemplo:

```text
base: epic/login
compare: feat/12-botao-entrar
```

Na descrição do Pull Request, informe:

```text
Closes #12
```

Isso fará com que a **Issue #12 seja fechada automaticamente após o merge do Pull Request**, conforme a configuração do GitHub.

Depois, crie o Pull Request para revisão.

---

# 🧹 5. Limpeza Pós-Entrega

Após o PO aprovar o Pull Request e realizar o merge, a branch `feat/` será excluída do GitHub.

Para manter o repositório local organizado, também devemos remover a referência dessa branch da máquina.

### 5.1 Voltar para a branch base

Por exemplo:

```bash
git checkout epic/login
```

---

### 5.2 Atualizar a branch base

Puxe as alterações que foram incorporadas:

```bash
git pull origin epic/login
```

---

### 5.3 Remover referências de branches excluídas

Execute:

```bash
git fetch --prune
```

Esse comando remove do repositório local as referências para branches remotas que já foram excluídas no GitHub.

---

### 5.4 Excluir a branch local da tarefa

Por fim, remova a branch localmente:

```bash
git branch -D feat/12-botao-entrar
```

---

# 📌 Resumo do Fluxo

O fluxo completo de uma tarefa pode ser resumido da seguinte forma:

```text
PO cria Issue
      ↓
PO cria branch feat/
      ↓
git fetch --all
      ↓
git checkout feat/...
      ↓
git merge origin/develop
      ↓
Desenvolvimento
      ↓
Testes + Validações
      ↓
git add .
      ↓
git commit
      ↓
git push
      ↓
Pull Request
      ↓
Code Review
      ↓
CI/CD
      ↓
Merge
      ↓
Branch remota é excluída
      ↓
git checkout branch-base
      ↓
git pull
      ↓
git fetch --prune
      ↓
git branch -D feat/...
```

---

## ✅ Checklist antes do Pull Request

Antes de abrir o PR, confirme:

* [ ] Código implementado
* [ ] Testes executados
* [ ] Coverage verificado quando necessário
* [ ] Formatação validada
* [ ] Build executado com sucesso
* [ ] Docker validado quando necessário
* [ ] Commit seguindo o padrão da equipe
* [ ] Alterações enviadas para a branch correta
* [ ] Pull Request apontando para a branch correta
* [ ] Issue vinculada utilizando `Closes #<número>`
