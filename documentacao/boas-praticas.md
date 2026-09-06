# Manual de Boas Práticas (GitHub)

Este manual foi desenhado para padronizar o trabalho no repositório, evitando branches duplicadas, erros de digitação e garantindo que o fluxo aprovado seja respeitado rigorosamente por todos os membros da equipe.

## Regras Gerais do Repositório
* **Bloqueio de Criação:** A criação livre de branches está bloqueada no GitHub. Apenas os POs ou Admins possuem permissão para criar ramificações (`epic/`, `fix/`, `release/` ou branches de tarefas).
* **Fluxo Fechado:** Nenhum código vai para a `main` ou `develop` sem passar por uma revisão rigorosa e aprovação (Pull Request).

## Responsabilidades do PO
* **Issues Didáticas:** A responsabilidade de detalhar o que precisa ser feito é do PO. As Issues devem ser o mais descritivas e didáticas possível. Inclua critérios de aceitação, links para o Figma e explique o resultado esperado.
* **Criação das Branches:** É obrigação do PO criar as branches de desenvolvimento. Sempre que abrir uma Issue, utilize o botão **"Create a branch"** dentro da própria Issue para gerar a ramificação com o nome correto e vinculada à tarefa.
* **Gestão de Epics e Entregas:** O PO é o único responsável por criar as branches maiores (`epic/**`), preparar os pacotes de entrega (`release/**`) e gerenciar as correções de emergência (`fix/**`).

## Diretrizes para os Desenvolvedores
* **Proibido Criar Branches:** O desenvolvedor jamais deve criar uma branch manualmente no seu terminal (usando `git checkout -b`). Você deve apenas baixar e atuar na branch que o PO já criou e vinculou à sua Issue. *(Exceções apenas com autorização prévia e alinhamento direto com o PO).*
* **O Alvo dos Pull Requests:** Todo o desenvolvimento do dia a dia deve ser enviado exclusivamente para a branch da EPIC atual (`epic/**`). Um desenvolvedor não envia PR diretamente para a `main` ou `develop`. A única exceção é se você estiver atuando em uma tarefa corretiva (`fix/`) nos preparativos para entrega, cujo PR deverá ser apontado para a `release/`.

## Padrão de Qualidade: Pull Requests e Commits
* **Mensagens de PR bem estruturadas:** Um Pull Request não é apenas um envio de código, é a documentação do projeto. A descrição do PR deve ser caprichada:
  * Explique resumidamente o que foi construído ou resolvido.
  * Lembre-se de colocar a palavra-chave mágica na descrição (ex: `Closes #15`) para que o GitHub feche a Issue automaticamente quando o código for aprovado.
* **Commits Semânticos:** Escreva mensagens de commit claras usando o padrão que a ferramenta Husky já exige (ex: `feat: cria botão de login`, `fix: resolve erro de digitação no menu`).
* **Teste antes de enviar:** O PR só deve ser aberto quando você tiver certeza de que o código roda sem erros na sua máquina. Para isso, consulte o manual de **Setup e Testes Locais**. A pipeline do GitHub Actions validará o seu código automaticamente; se ela quebrar, o PO não poderá aprovar a sua entrega. A responsabilidade de arrumar o erro é completamente do DEV.