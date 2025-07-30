## Funcionalidades Atuais (Front-end em Desenvolvimento)

O editor foi totalmente refatorado para uma **arquitetura baseada em camadas (Layers)**, inspirada em softwares de design profissionais. Esta abordagem oferece máxima flexibilidade e escalabilidade.

*   **Sistema de Camadas:**
    *   O cartão é construído como uma pilha de camadas que podem ser reordenadas via Drag & Drop (`Fundo`, `Conteúdo`, `Sobreposição`, etc.).
    *   Cada camada pode ser ligada ou desligada individualmente.
    *   É possível adicionar novas camadas de sobreposição de cor/gradiente dinamicamente.
*   **Painel de Propriedades Dinâmico:**
    *   Uma interface de "Dashboard" com um menu lateral permite focar na edição de uma área de cada vez.
    *   Ao selecionar uma camada na lista (`LayerPanel`), um painel de propriedades contextuais (`PropertyPanel`) aparece, mostrando apenas os controles relevantes para aquela camada.
*   **Editor de Grid e Widgets:**
    *   A camada de "Conteúdo" contém um grid totalmente customizável, com adição/remoção e dimensionamento de colunas e linhas.
    *   Elementos (widgets) como `Texto` e `Imagem` podem ser adicionados dinamicamente ao projeto.
    *   Cada elemento gera um painel de controle para customizar seu conteúdo e estilos avançados (fonte, cor, tamanho, negrito, itálico, alinhamento).
    *   Funcionalidade de Drag & Drop para posicionar, mover e remover widgets do canvas.
*   **Pré-visualização 100% Reativa:**
    *   O componente `Card` renderiza a pilha de camadas em tempo real.
    *   Qualquer alteração no painel de camadas ou no painel de propriedades é refletida instantaneamente na pré-visualização.
*   **Tipagem com TypeScript:** Garante a segurança e a consistência dos dados em toda a aplicação.

## Próximos Passos (Roadmap)

- [ ] **Finalizar o Editor de Design:**
    - [ ] Implementar a funcionalidade de salvar/carregar o estado completo do editor (incluindo as camadas).
    - [ ] Criar a lógica para gerar o cartão final a partir da estrutura de camadas.
- [ ] **Implementar o Back-end e Banco de Dados.**
- [ ] **Criar um sistema de contas de usuário.**