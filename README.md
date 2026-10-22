# Release 17/09 - Squad Front-End / Desenvolvimento Web

Este repositório contém as entregas da equipe de **Desenvolvimento Web e Front-End** referentes à release do dia **17 de setembro**, desenvolvidas para a disciplina de Laboratório de Práticas do curso de Desenvolvimento de Software Multiplataforma da FATEC Registro.

## Resumo da Entrega

Nesta release, focamos na implementação prática e estrutural das interfaces web e da aplicação Progressive Web App (PWA) voltada para o registro e acompanhamento de chamados municipais, garantindo alta performance, componentização escalável e total fidelidade aos protótipos de design.

As principais entregas foram estruturadas em duas frentes principais:

### 1. Arquitetura e Tecnologias Web

A base de código foi construída utilizando um ecossistema moderno voltado para escalabilidade, tipagem segura e manutenibilidade:

* **Core Tecnológico:** Desenvolvimento em React com TypeScript, utilizando o Vite como empacotador para máxima eficiência e velocidade de build.
* **Estilização e Design System:** Aplicação de Tailwind CSS estruturado em abordagens *mobile-first*, incorporando componentes reutilizáveis e modulares.
* **Gerenciamento de Rotas e Estado:** Configuração do React Router para navegação fluida e componentizada entre as etapas do sistema.

### 2. Módulos e Telas Implementadas

Foram desenvolvidas, refatoradas e validadas as interfaces interativas que compõem a experiência do munícipe no PWA:

* **Home e Telas de Acesso Anônimo:**
* Tela inicial contendo cards de ação dinâmicos (`CardAcaoHome`) para abertura e pesquisa de ocorrências.
* Interface de acompanhamento de chamados por número de protocolo com redirecionamento direto para a tela de visualização detalhada.


* **Fluxo de Abertura de Ocorrências (Formulários Multi-etapas):**
* Componente de progresso interativo (*Stepper*) com lógica acumulativa e navegação direta por clique nos ícones das etapas (Ocorrência -> Endereço -> Fotos/Vídeos).
* Telas de preenchimento de dados da ocorrência, seletores customizados, inserção de localização e área de anexos.
* Tela de **Revisão** consolidando todas as informações em seções editáveis antes do envio final.


* **Visualização de Detalhes do Chamado:**
* Página dedicada ao acompanhamento do protocolo contendo badges de status, descrição detalhada e linha do tempo (*timeline*) visual das etapas de atendimento.
