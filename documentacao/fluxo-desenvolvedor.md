# Fluxo de Trabalho do Desenvolvedor (Passo a Passo)

Este é o roteiro exato que todo desenvolvedor deve seguir desde o momento em que o PO avisa que a tarefa (Issue) e a branch `epic/**` estão prontas.

**O Cenário de Exemplo:** O PO criou a Issue `#12`, já gerou a branch `feat/12-botao-entrar` diretamente no GitHub e atribuiu a tarefa a você.

## Passo 1: Atualizar o computador
Antes de digitar qualquer linha de código, você precisa atualizar seu Git local para que ele encontre a branch nova que o PO acabou de criar no servidor.

```bash
git fetch --all
```

## Passo 2: Entrar na branch da tarefa
Como o PO já fez o trabalho de criar a branch com a nomenclatura perfeita, você **não usa** o comando de criação (`-b`). Você apenas "entra" na branch existente:

```bash
git checkout feat/12-botao-entrar
```

## Passo 3: Programar e Salvar (Commits)
Trabalhe no seu código normalmente. É recomendado consultar a documentação de testes locais(setup-testes.md) para garantir a qualidade do código. Ao terminar, salve as alterações. O Husky rodará neste momento para validar o padrão do código.

```bash
git add .
git commit -m "feat: cria o botao de login na tela inicial"
```

## Passo 4: Enviar para o GitHub e Abrir o PR
Devolva o seu código finalizado para a mesma branch que o PO criou no servidor.

```bash
git push origin feat/12-botao-entrar
```

**No site do GitHub:**
1. Clique no botão verde **Compare & pull request**.
2. Confirme se a seta está apontando para o alvo correto que o PO definiu (ex: `base: epic/login` <- `compare: feat/12-botao-entrar`).
3. Na descrição, escreva `Closes #12` para fechar a issue automaticamente após a aprovação, e clique em criar o PR.

## Passo 5: Limpeza Pós-Entrega
Após o PO aprovar o seu código e realizar o merge, a sua branch `feat/` será deletada lá no GitHub. Mantenha seu computador limpo também:

```bash
# 1. Volte para a branch base (ex: a Épica onde você estava trabalhando)
git checkout epic/login

# 2. Puxe o código consolidado com a sua entrega
git pull origin epic/login

# 3. Limpe do sistema as branches que o GitHub já apagou
git fetch --prune

# 4. Delete a branch da tarefa localmente
git branch -D feat/12-botao-entrar
```