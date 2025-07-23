## Funcionalidades Atuais (Front-end em Desenvolvimento)

*   **Arquitetura Baseada em Componentes:** O projeto utiliza React para criar uma interface de usuário modular e reutilizável.
*   **Gerenciamento de Estado Centralizado:** O editor usa o hook `useState` do React para gerenciar de forma reativa todo o estado do cartão (widgets, layout, design).
*   **Editor de Cartão (`Editor.tsx`):**
    *   Interface de duas colunas com painel de controles e pré-visualização em tempo real.
    *   **Painel de Elementos:** Uma "caixa de ferramentas" para adicionar novos componentes ao cartão.
    *   **Controles de Widget Dinâmicos:** Painéis de controle são gerados automaticamente para cada elemento adicionado ao cartão, permitindo a customização de seu conteúdo e estilos.
    *   **Controle de Layout (Grid):** Componente para adicionar, remover e dimensionar colunas e linhas do cartão.
    *   **Controle de Fundo:** Componente para customizar o fundo com cores sólidas ou gradientes.
*   **Pré-visualização Interativa (`Card.tsx`):**
    *   Renderiza o cartão dinamicamente com base no estado atual do editor.
    *   **Funcionalidade de Drag and Drop:** Permite arrastar novos elementos do painel para as células do grid e mover elementos que já estão no cartão.
*   **Salvar, Carregar e Gerar:**
    *   Funcionalidade para salvar o estado completo do cartão em um arquivo `.json`.
    *   Funcionalidade para carregar um arquivo `.json` e restaurar o estado do editor.
    *   Botão para gerar o cartão final em uma nova aba (`cartao.html`).
*   **Tipagem com TypeScript:** Garante a segurança e a robustez do código em todo o projeto.

## Próximos Passos (Roadmap)

- [ ] **Finalizar o Editor de Design:**
    - [X] Implementar o sistema de Drag & Drop para posicionar widgets nas células do grid.
    - [ ] Adicionar um componente para a camada de Sobreposição (Overlay).
    - [ ] Expandir as opções de customização dos widgets (fontes, alinhamento, etc.).
- [ ] **Implementar o Back-end e Banco de Dados:**
    - [ ] Configurar a conexão com o NeonDB.
    - [ ] Criar a API em Node.js para salvar e carregar templates e dados de cartões.
- [ ] **Criar um sistema de contas de usuário.**

## Como Executar o Projeto

1.  **Clone o repositório:** `git clone [URL_DO_SEU_REPOSITORIO]`
2.  **Navegue até a pasta:** `cd [NOME_DA_PASTA]`
3.  **Instale as dependências:** `npm install`
4.  **Inicie o servidor de desenvolvimento:** `npm run dev`
5.  Abra o endereço `http://localhost:5173` (ou o que for indicado no terminal) no seu navegador.