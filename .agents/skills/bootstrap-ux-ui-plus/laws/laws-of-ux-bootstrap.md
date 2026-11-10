# As 18 Leis Canônicas do UX para Interfaces Bootstrap / The 18 Laws of UX for Bootstrap 🧠📐
> *Compêndio Definitivo das 18 Leis do UX (Laws of UX por Jon Yablonski & Referência Thulio Bittencourt) traduzidas cirurgicamente para componentes, utilitários e padrões do Bootstrap (v5.3 e v6.0)*

---

## 🎯 Índice dos 4 Grupos Cognitivos das 18 Leis do UX:

| Grupo Cognitivo | Leis Inclusas | Foco Humano |
|---|---|---|
| **1. Decisão & Interação** | Lei de Hick, Lei de Fitts, Lei de Jakob | Velocidade de escolha, tamanho e distância dos botões, padrões já conhecidos |
| **2. Percepção Visual (Gestalt)** | Lei da Proximidade, Lei da Semelhança, Lei da Região Comum, Lei da Conectividade Uniforme | Como os olhos agrupam campos de formulários, cards e blocos |
| **3. Carga Cognitiva & Desempenho** | Lei de Miller, Limiar de Doherty | Capacidade de memória de trabalho (7±2) e resposta em menos de 400ms |
| **4. Memória, Retenção & Simplicidade** | Von Restorff, Posição Serial, Pico-Fim, Zeigarnik, Prägnanz, Tesler, Postel, Parkinson, Occam, Pareto | O que o cérebro lembra e como simplificar fluxos e interfaces |

---

## 📌 Grupo 1: Decisão & Interação Rápida

### 1. Lei de Hick (Hick's Law) ⏳
> *Menos opções geram decisões mais rápidas: $T = b \cdot \log_2(n + 1)$.*  
> *The time it takes to make a decision increases with the number and complexity of choices.*

- **No Bootstrap:**
  - Em telas de ação, destaque apenas **uma ação primária** usando `.btn-primary`.
  - Ações secundárias devem usar `.btn-outline-secondary` ou `.btn-link`.
  - Formulários com muitos campos devem ser particionados com **Progressive Disclosure** (acordeões `.accordion`, abas `.nav-tabs` ou wizards passo-a-passo).
  - Limite menus suspensos (`.dropdown-menu`) a no máximo 5 a 7 opções visíveis.

### 2. Lei de Fitts (Fitts's Law) 🎯
> *Botão importante deve ser grande e estar perto do alcance.*  
> *The time to acquire a target is a function of the distance to and size of the target.*

- **No Bootstrap:**
  - **Alvos de toque mínimos:** 44x44px ou 48x48px para mobile (`.btn-lg`, padding `.py-2` ou `.py-3`).
  - **Área de clique expandida:** Use a classe `.stretched-link` em cards inteiros (`.card .position-relative`) para que qualquer ponto do card seja clicável.
  - **Posicionamento ergonômico:** Em mobile, fixe ações de conversão principais no rodapé da viewport com `.fixed-bottom .p-3 .bg-body`.

### 3. Lei de Jakob (Jakob's Law) 🔄
> *Seu sistema deve funcionar como os outros sites que o usuário já conhece.*  
> *Users spend most of their time on other sites. They expect your site to work the same way.*

- **No Bootstrap:**
  - Logotipo sempre no canto superior esquerdo (`.navbar-brand`) levando para a página inicial.
  - Barra de busca centralizada ou no topo com atalho `Ctrl+K`.
  - Avatar de perfil, configurações e botão de sair alinhados na extremidade direita do cabeçalho (`.ms-auto`).
  - Ícones convencionais: lupa para pesquisar (`bi bi-search`), sino para notificações (`bi bi-bell`), engrenagem para ajustes (`bi bi-gear`), lixeira para excluir (`bi bi-trash`).
  - Não invente seletores exóticos: use `.form-select`, `.breadcrumb` e `.pagination`.

---

## 📌 Grupo 2: Percepção Visual & Agrupamento (Gestalt)

### 4. Lei da Proximidade (Law of Proximity) 🧲
> *Objetos que estão visualmente próximos tendem a ser percebidos como um único grupo.*

- **No Bootstrap:**
  - Mantenha o `<label>` colado ao `<input>` (`.form-label .mb-1`).
  - Separe campos diferentes com espaçamento maior (`.mb-3` ou `.mb-4`).
  - Agrupe botões inter-relacionados usando `.btn-group` ou flexbox `.d-flex .gap-2`.

### 5. Lei da Semelhança (Law of Similarity) 👥
> *Elementos que compartilham características visuais (mesma cor, tamanho, formato ou estilo) são percebidos como tendo a mesma função.*

- **No Bootstrap:**
  - Mantenha consistência rigorosa nos botões: todos os botões de ação destrutiva devem ser `.btn-danger` ou `.btn-outline-danger`.
  - Links de navegação secundária devem compartilhar a mesma tipografia e cor (`.nav-link`).

### 6. Lei da Região Comum (Law of Common Region) 📦
> *Elementos são percebidos como agrupados se compartilham uma área com um limite claramente definido.*

- **No Bootstrap:**
  - Utilize `.card .border-0 .shadow-sm .rounded-3` para isolar seções contextuais distintas (ex: card "Dados do Pagador" separado do card "Endereço de Cobrança").
  - Use fundos sutis de contraste como `.bg-body-tertiary` ou `.bg-light` para agrupar filtros de listagem.

### 7. Lei da Conectividade Uniforme (Law of Uniform Connectedness) 🔗
> *Elementos que estão visualmente conectados (por linhas, setas ou barras) são percebidos como mais fortemente relacionados.*

- **No Bootstrap:**
  - Trilhas de navegação com `.breadcrumb` conectadas por barras ou divisores.
  - Formulários tipo Wizard com indicadores de etapas numeradas conectadas por linhas de progresso.

---

## 📌 Grupo 3: Carga Cognitiva & Desempenho

### 8. Lei de Miller (Miller's Law) 🔢
> *A pessoa média só consegue reter por volta de 7 (mais ou menos 2) itens na memória de trabalho. Divida sempre em blocos (chunking).*

- **No Bootstrap:**
  - Em painéis e dashboards, apresente no máximo de 3 a 5 cards de métricas em destaque (`.row .g-3 > .col-md-3`).
  - Formatação visual com máscaras: divida números de cartões de crédito em blocos de 4 dígitos, CPF em `000.000.000-00` e telefones com DDD.

### 9. Limiar de Doherty (Doherty Threshold) ⚡
> *A produtividade humana dispara quando o computador e o usuário interagem em um ritmo inferior a 400 milissegundos (<400ms).*

- **No Bootstrap:**
  - **Feedback visual imediato:** No momento do clique em um botão de ação, desative-o e adicione o spinner instantâneo (`.spinner-border .spinner-border-sm`).
  - **Skeletons de carregamento:** Em vez de telas brancas, exiba placeholders animados com `.placeholder-glow` e `.placeholder col-6` enquanto as requisições API são processadas.

---

## 📌 Grupo 4: Memória, Retenção & Simplicidade

### 10. Efeito Von Restorff / Isolamento (Isolation Effect) 🌟
> *O elemento visual que se destaca e difere do restante é o que as pessoas mais lembram.*

- **No Bootstrap:**
  - Em tabelas de planos (`pricing tables`), o plano mais vantajoso/recomendado deve ter elevação `.shadow`, borda contrastante `.border-primary .border-2` e badge "Mais Vendido".
  - O Call to Action (CTA) principal de conversão deve ser a cor com maior saturação da tela.

### 11. Efeito da Posição Serial (Serial Position Effect) 📑
> *As pessoas se lembram melhor do primeiro (primazia) e do último (recência) item de uma lista.*

- **No Bootstrap:**
  - Posicione o item mais estratégico no início da barra de navegação e o botão de ação/conversão principal na extremidade final (à direita).
  - Em listagens de recursos ou diferenciais de produto, coloque o maior atrativo em primeiro e a garantia final no último item.

### 12. Regra do Pico-Fim (Peak-End Rule) 🏔️🏁
> *A experiência é avaliada pelo momento mais intenso (pico) e pelo desfecho (fim).*

- **No Bootstrap:**
  - Telas de conclusão (pedido finalizado, formulário enviado) devem ter feedback positivo marcante com alertas elegantes `.alert-success`, ícones grandes e mensagens de boas-vindas.
  - Telas de erro (404/500) devem oferecer botões claros para "Voltar ao Início" ou "Falar com Suporte" sem jargões frios.

### 13. Efeito Zeigarnik (Zeigarnik Effect) ⏳
> *As pessoas se lembram com mais intensidade de tarefas incompletas ou interrompidas.*

- **No Bootstrap:**
  - Use barras de progresso `.progress` com percentual visível (ex: "Perfil 65% completo").
  - Em cadastros, instigue a conclusão mostrando tarefas pendentes com badges sutis (`.badge bg-warning-subtle text-warning-emphasis`).

### 14. Lei de Prägnanz / Simplicidade (Gestalt) 🔷
> *O cérebro interpreta figuras complexas na sua forma geométrica mais simples e ordenada.*

- **No Bootstrap:**
  - Utilize o grid de 12 colunas de forma simétrica (`.col-12 .col-md-6 .col-lg-4`).
  - Equalize a altura de cards de uma mesma linha aplicando a classe utilitária `.h-100`.

### 15. Lei de Tesler / Conservação da Complexidade ⚖️
> *Existe uma complexidade inerente em todo processo que não pode ser eliminada; ela deve ser absorvida pela interface/sistema ou pelo usuário.*

- **No Bootstrap:**
  - Ao digitar o CEP, o sistema preenche rua, bairro e cidade automaticamente.
  - Use inputs com busca assistida (autocompletes) em vez de obrigar o usuário a preencher códigos manuais e IDs internos do banco.

### 16. Lei de Postel / Princípio da Robustez 🛡️
> *Seja liberal no que você aceita e rigoroso no que você entrega.*

- **No Bootstrap:**
  - Formulários tolerantes que aceitam telefones com ou sem código do país, máscaras com espaços ou traços, e realizam higienização automática.
  - Mensagens de erro construtivas com `.invalid-feedback` explicando como corrigir o dado.

### 17. Lei de Parkinson ⏰
> *Qualquer tarefa se expandirá para preencher todo o tempo alocado para a sua conclusão.*

- **No Bootstrap:**
  - Em fluxos de checkout e preenchimento de formulários, utilize formulários de uma única página (Single Page Checkout) ou cronômetros visíveis com badges de expiração para incentivar a tomada de decisão ágil.

### 18. Navalha de Occam & Princípio de Pareto (Occam's Razor & Pareto 80/20) ✂️📊
> *A melhor solução é aquela com o menor número de pressupostos. 80% do valor vem de 20% das funções.*

- **No Bootstrap:**
  - Remova enfeites desnecessários, modais intrusivos e botões duplicados.
  - Destaque em posição de honra no Dashboard as 3 a 5 ações que cobrem 80% do uso diário do cliente (como visto na arquitetura Mazer e AdminKit).
