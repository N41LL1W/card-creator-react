# Criador de Cartões de Visita Digitais

Um sistema web para a criação de cartões de visita digitais interativos e personalizáveis, construído com uma stack de tecnologias modernas.

## Stack Tecnológica

*   **Front-end:** React com TypeScript
*   **Ferramenta de Build:** Vite
*   **Back-end:** Node.js (planejado)
*   **Banco de Dados:** NeonDB (PostgreSQL) (planejado)

## Funcionalidades Atuais (Front-end em Desenvolvimento)

*   **Arquitetura Baseada em Componentes:** O projeto utiliza React para criar uma interface de usuário modular e reutilizável.
*   **Editor de Cartão (`Editor.tsx`):**
    *   Interface de duas colunas com painel de controles e pré-visualização em tempo real.
    *   **Controle de Conteúdo:** Campos para inserir dinamicamente o nome e a profissão.
    *   **Controle de Layout (Grid):** Componente dedicado para adicionar, remover e dimensionar colunas e linhas do cartão.
    *   **Controle de Fundo:** Componente para customizar o fundo do cartão com cores sólidas ou gradientes de duas cores, com controle de ângulo.
*   **Componente de Pré-visualização (`Card.tsx`):**
    *   Renderiza o cartão dinamicamente com base nas propriedades (props) recebidas do editor.
    *   Aplica em tempo real as mudanças de conteúdo, layout de grid e design de fundo.
*   **Tipagem com TypeScript:** Garante a segurança e a robustez do código em todo o projeto.

## Próximos Passos (Roadmap)

- [ ] **Finalizar o Editor de Design:**
    - [ ] Implementar o sistema de Drag & Drop para posicionar widgets nas células do grid.
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