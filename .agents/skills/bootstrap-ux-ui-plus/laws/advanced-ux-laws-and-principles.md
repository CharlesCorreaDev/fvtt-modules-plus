# Compêndio Avançado de Leis, Efeitos Cognitivos e Princípios de UI/UX 🧠📐

> **Objetivo:** Complementar o compêndio canônico das 18 Leis de Jon Yablonski, trazendo os modelos mentais e leis de usabilidade avançadas formuladas por mestres como **Don Norman**, **Ben Shneiderman**, **Bruce Tognazzini (Tog)**, **Luke Wroblewski** e a psicologia comportamental moderna, traduzidos para a arquitetura do **Bootstrap 5.3+ e 6.0**.

---

## 🏛️ PARTE 1: AS 8 REGRAS DE OURO DE BEN SHNEIDERMAN (Golden Rules of Interface Design)

Formuladas pelo renomado cientista da computação **Ben Shneiderman**, estas regras são a base da engenharia de usabilidade para sistemas interativos:

### 1. Esforce-se por Consistência (Strive for Consistency)
- **No Bootstrap:** Use rigorosamente os mesmos tokens de botões (`.btn-primary` para ações afirmativas, `.btn-outline-secondary` para cancelamentos), a mesma paleta oficial (`#90271`) e a mesma tipografia (`Google Sans`). Não altere o raio de borda de cards aleatoriamente (mantenha `.rounded-3` uniforme).

### 2. Atenda à Usabilidade Universal (Enable Frequent Users to Use Shortcuts)
- **No Bootstrap:** Permita navegação rápida por teclado via `accesskey` e atalhos globais (ex: `Ctrl + K` para foco na busca). Disponibilize tabelas com paginação e ordenação ágil.

### 3. Ofereça Feedback Informativo (Offer Informative Feedback)
- **No Bootstrap:** Para cada ação, exiba uma reação em menos de 400ms (Limiar de Doherty). Ao salvar, dispare um `.toast` ou altere o botão para estado de loading com `<i class="fa-solid fa-spinner fa-spin"></i>`.

### 4. Desenhe Diálogos para Concluir Tarefas (Design Dialogs to Yield Closure)
- **No Bootstrap:** Ao concluir um cadastro ou checkout, nunca deixe o usuário em uma página vazia. Apresente um card de confirmação com ícone de sucesso e próximos passos sugeridos.

### 5. Prevenção Simples de Erros (Prevent Errors)
- **No Bootstrap:** Desabilite botões de envio até que os campos obrigatórios estejam válidos. Use máscaras de input para CPF/CNPJ/Telefone e validações nativas `.needs-validation`.

### 6. Permita Reversão Fácil de Ações (Permit Easy Reversal of Actions - "Undo")
- **No Bootstrap:** Em vez de modais intrusivos a cada exclusão banal, utilize exclusão suave com toast contendo botão de desfazer (*Undo*):
  ```html
  <div class="toast align-items-center text-bg-dark border-0" role="alert">
    <div class="d-flex">
      <div class="toast-body">Item movido para a lixeira.</div>
      <button type="button" class="btn btn-sm btn-outline-light ms-auto me-2" onclick="desfazerExclusao()">Desfazer</button>
    </div>
  </div>
  ```

### 7. Apoie o Locus Interno de Controle (Keep Users in Control)
- **No Bootstrap:** O usuário deve sentir que comanda o sistema. Não dispare popups agressivos inesperados, não toque áudios automáticos e permita fechar modais com a tecla `Esc` ou clicando no backdrop.

### 8. Reduza a Carga de Memória de Curto Prazo (Reduce Short-Term Memory Load)
- **No Bootstrap:** Mostre informações resumidas de contexto em telas secundárias (ex: resumo do pedido visível durante o preenchimento de endereço de entrega).

---

## 🚪 PARTE 2: PRINCÍPIOS FUNDAMENTAIS DE DON NORMAN (Design of Everyday Things)

Criados por **Don Norman** (pai do termo UX), essenciais para criar interfaces que não exigem manuais de instruções:

### 1. Affordance (Capacidade Percebida de Ação)
- Um elemento deve comunicar fisicamente como deve ser usado.
- **No Bootstrap:** Um botão deve parecer clicável (elevação, relevo sutil ou cor contrastante). Um link deve ter sublinhado ou cor destacada. Um campo de texto deve ter borda e fundo diferenciado.

### 2. Signifiers (Significadores Visuais)
- Sinalizações que indicam onde a ação deve ocorrer.
- **No Bootstrap:** Um ícone de seta para baixo (`fa-chevron-down`) em um `.dropdown-toggle`, ou o cursor `cursor: pointer` em elementos clicáveis.

### 3. Feedback Imediato
- O sistema precisa comunicar o resultado de uma interação sem ambiguidade.
- **No Bootstrap:** Estados `:hover`, `:focus-visible`, e spinners de carregamento em botões durante requisições assíncronas.

### 4. Mapeamento Natural (Natural Mapping)
- A relação entre os controles da interface e os objetos reais no mundo.
- **No Bootstrap:** Switches (`.form-switch`) para ligar/desligar funcionalidades, sliders (`.form-range`) para volumes e intensidade, e listas verticais para passos cronológicos.

### 5. Restrições (Constraints)
- Limitar o leque de ações para impedir que o usuário cometa erros físicos ou de dados.
- **No Bootstrap:** Usar `<input type="date">` em vez de texto livre para datas, `<input type="number">` com `min` e `max`, e listas pré-definidas com `<select>`.

---

## 🧩 PARTE 3: LEIS COMPORTAMENTAIS E PSICOLÓGICAS COMPLEMENTARES

### 1. Efeito do Estudo de Caso / Efeito de Autoria (IKEA Effect)
- **Conceito:** As pessoas valorizam desproporcionalmente produtos e interfaces em cuja criação ou personalização elas participaram.
- **No Bootstrap:** Permitir que o usuário reordene colunas de tabelas, escolha widgets do seu dashboard ou personalize a foto de perfil aumenta drasticamente a retenção no sistema.

### 2. Cegueira por Mudança (Change Blindness)
- **Conceito:** Usuários frequentemente não percebem alterações sutis na tela se sua atenção estiver focada em outra área.
- **No Bootstrap:** Ao atualizar o total de um carrinho de compras na barra lateral após clicar em "Adicionar", anime o contador com um pulso sutil (`attentionPulse`) ou exiba um badge temporário para garantir que a mudança foi registrada visualmente.

### 3. Lei de Parkinson (Parkinson's Law)
- **Conceito:** O trabalho se expande para preencher o tempo disponível para sua realização.
- **No Bootstrap:** Em fluxos com limite de tempo (ex: recuperação de senhas, reservas de ingressos ou autenticação 2FA), apresente contadores regressivos claros e visuais (`.badge` ou barra de progresso animada).

### 4. O Efeito Halo (Halo Effect)
- **Conceito:** A percepção positiva sobre um aspecto visual de uma interface (ex: beleza estética e polimento visual) contamina positivamente a percepção de segurança, confiabilidade e facilidade de uso de todo o sistema.
- **No Bootstrap:** Uma página inicial esteticamente impecável, com alinhamento rigoroso, paleta `#90271` calibrada e tipografia Google Sans gera sensação de alta confiabilidade mesmo antes do usuário testar os recursos internos.

---

## 📱 PARTE 4: PRINCÍPIOS MOBILE-FIRST DE LUKE WROBLEWSKI

### 1. Zona do Polegar de Steven Hoober (The Thumb Zone)
- Em dispositivos móveis, 75% das interações ocorrem com apenas um polegar.
- **No Bootstrap:**
  - **Zona Fácil (Verde):** Centro e rodapé da tela. Coloque os botões primários de ação (`.fixed-bottom`).
  - **Zona Difícil (Vermelha):** Topo superior esquerdo e direito. Coloque apenas menus de navegação secundários e logotipos informativos, nunca botões de confirmação crítica.

### 2. Conteúdo em Vez de Navegação (Content Over Navigation)
- Em telas pequenas, não ocupe 50% da viewport com cabeçalhos gigantes ou banners promocionais desnecessários. O conteúdo deve ser o protagonista desde o primeiro pixel visível.

