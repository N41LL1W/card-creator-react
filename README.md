## Funcionalidades Atuais (Front-end em Desenvolvimento)

*   **Arquitetura Baseada em Componentes:** O projeto utiliza React para criar uma interface de usuário modular e reutilizável.
*   **Gerenciamento de Estado Reativo:** O editor usa o hook `useState` do React para gerenciar o estado do cartão.
*   **Editor de Cartão (`Editor.tsx`):**
    *   Interface de duas colunas com painel de controles e pré-visualização em tempo real.
    *   **Controle de Conteúdo Dinâmico:** Painéis de controle são gerados para cada elemento adicionado, permitindo a customização de seu conteúdo e estilos (cor, tamanho, negrito, etc.).
    *   **Controle de Layout (Grid):** Componente funcional para adicionar, remover e dimensionar colunas e linhas.
    *   **Controle de Fundo:** Componente funcional para customizar o fundo com cores sólidas ou gradientes.
    *   **Painel de Elementos:** Permite adicionar novos widgets ao cartão.
*   **Pré-visualização Interativa (`Card.tsx`):**
    *   Renderiza o cartão dinamicamente com base no estado do editor.
    *   **Funcionalidade de Drag and Drop:** Permite arrastar elementos do painel para o cartão e mover elementos dentro do cartão.
*   **Salvar, Carregar e Gerar:** Funcionalidades implementadas para salvar/carregar o estado completo e gerar o cartão final.
*   **Tipagem com TypeScript:** Garante a segurança e a robustez do código.

## Próximos Passos (Roadmap)

- [ ] **CORRIGIR BUG CRÍTICO:** Resolver o erro de tipo (`Type 'string' is not assignable to 'number'`) que impede a compilação correta do componente `Card.tsx` ao interagir com os controles de sobreposição.
- [ ] **Finalizar o Editor de Design:**
    - [ ] Implementar e estabilizar o componente para a camada de Sobreposição (Overlay).
    - [ ] Adicionar mais opções de customização aos widgets (fontes, etc.).
- [ ] **Implementar o Back-end e Banco de Dados:**
    - [ ] Configurar a conexão com o NeonDB.
    - [ ] Criar a API em Node.js para salvar e carregar templates e dados de cartões.
- [ ] **Criar um sistema de contas de usuário.**