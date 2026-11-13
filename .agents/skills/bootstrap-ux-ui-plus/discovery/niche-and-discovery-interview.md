# Guia de Nichos de Mercado & Questionário Socrático de Perfil de Uso 🎯📊

> **Objetivo:** Orientar o desenvolvedor e o agente de IA a identificar com precisão cirúrgica o **nicho de mercado**, o **público-alvo**, o **tom visual**, a **paleta ideal** e os **componentes Bootstrap necessários**, através de um roteiro socrático de perguntas de descoberta (*Discovery Interview*).

---

## 🏢 PARTE 1: ARQUÉTIPOS VISUAIS POR NICHO DE MERCADO

Cada nicho de mercado exige uma linguagem visual, densidade de componentes e paleta de cores específica para gerar conversão e confiança:

---

### 1. 💼 Corporativo, Finanças & Jurídico (B2B, Fintechs, Advocacia)
* **Objetivo Psicológico:** Passar solidez inquestionável, segurança de dados e formalidade.
* **Paleta Recomendada:** Azul Marinho Profundo, Cinza Neutro, Grafite e toques de Dourado/Âmbar ou Verde Sólido.
* **Tipografia:** Google Sans Flex (robusta nos títulos) e Google Sans com entrelinha de 1.6.
* **Padrões Bootstrap:**
  - Tema Claro padrão (`data-bs-theme="light"`).
  - Cards com borda sutil ou sombra leve (`border-0 shadow-sm rounded-3`).
  - Tabelas zebradas acessíveis (`.table .table-hover .table-striped`).
  - Botões formais (`.btn-primary` azul escuro e `.btn-outline-secondary`).

---

### 2. 🏥 Saúde, Medicina, Clínicas & Bem-Estar
* **Objetivo Psicológico:** Acolhimento, higiene, empatia, alívio de dor e tranquilidade mental.
* **Paleta Recomendada:** Ciano Suave, Verde Menta, Azul Celeste e Branco Puro com detalhes em Sálvia.
* **Tipografia:** Google Sans com formas arredondadas amigáveis e leitura sem esforço.
* **Padrões Bootstrap:**
  - Espaçamentos generosos (`.py-4 .py-lg-5`) para a tela respirar (evitar claustrofobia visual).
  - Alertas suaves (`.alert-info .border-0 .shadow-sm`).
  - Botões com cantos arredondados generosos (`.rounded-pill` ou `.rounded-4`).
  - Ícones médicos claros e amigáveis (coração, cruz, escudo, calendário).

---

### 3. 🛍️ E-Commerce, Varejo & Delivery de Consumo Rápido
* **Objetivo Psicológico:** Estímulo de compra, conveniência, senso de oportunidade e apetite.
* **Paleta Recomendada:** Laranja Vibrante, Vermelho Tomate, Amarelo Ouro com fundo neutro Off-White.
* **Tipografia:** Títulos impactantes com peso bold (`fw-bold` / `fw-black`) para preços e chamadas de desconto.
* **Padrões Bootstrap:**
  - Badges de desconto chamativos (`.badge .bg-danger .fs-6`).
  - Cards de produto com `.stretched-link` e efeito hover de elevação (`card-interactive`).
  - Barra de finalização de compra fixa no mobile (`.fixed-bottom`).
  - Galerias de fotos com miniaturas e contadores regressivos de oferta.

---

### 4. ⚡ Tecnologia, Startups SaaS & Inteligência Artificial
* **Objetivo Psicológico:** Inovação radical, velocidade, inteligência de ponta e elegância contemporânea.
* **Paleta Recomendada:** Roxo Elétrico, Violeta/Índigo, Azul Cobalto e detalhes sutis em Verde Neon.
* **Tipografia:** Google Sans Flex com espaçamento moderno e Google Sans Code para parâmetros e APIs.
* **Padrões Bootstrap:**
  - Componentes com cantos refinados (`.rounded-3` a `.rounded-4`).
  - Skeletons animados com brilho (`skeleton-shimmer`) para dados dinâmicos.
  - Abas e painéis de configuração fluidos sem reload de página.
  - Botões de ação rápida com transição elástica GPU.

---

### 5. 🎓 Educação, Cursos Online & Treinamento (EdTech)
* **Objetivo Psicológico:** Motivação contínua, clareza pedagógica, energia jovem e sensação de conquista.
* **Paleta Recomendada:** Laranja Amigável, Azul Turquesa, Amarelo Sol e Branco.
* **Tipografia:** Altamente legível, com títulos convidativos e marcadores visuais.
* **Padrões Bootstrap:**
  - Barras de progresso motivacionais (`.progress .progress-bar-striped .progress-bar-animated`).
  - Cards de módulos expansíveis com acordeões (`.accordion`).
  - Badges de gamificação e conquistas de conclusão.

---

## ❓ PARTE 2: O QUESTIONÁRIO SOCRÁTICO DE DISCOVERY (Para o Agente de IA)

Sempre que o usuário solicitar uma nova tela, sistema ou página e **não tiver fornecido requisitos detalhados de estilo ou público**, o Agente de IA DEVE acionar este roteiro de perguntas concisas para traçar o perfil de uso:

---

### 🎯 Pergunta 1: O Nicho e o Objetivo Central
> *"Qual é o nicho de mercado ou área de atuação deste projeto (ex: Finanças, Saúde, E-commerce, SaaS/IA, Educação ou Painel Interno) e qual é a ação mais importante que o usuário deve realizar nesta tela?"*

### 👥 Pergunta 2: O Público-Alvo e o Dispositivo Predominante
> *"Quem são os usuários principais (clientes finais, equipe técnica, gestores, pessoas leigas) e por onde eles mais vão acessar: celular/mobile no dia a dia ou desktop com telas grandes no escritório?"*

### 🎨 Pergunta 3: Identidade Visual e Preferência de Cores
> *"A sua empresa já possui uma paleta de cores ou logotipo definido? Se não tiver, prefere que apliquemos a nossa paleta corporativa padrão (#90271 - tons de azul sólido de alta credibilidade) ou uma paleta alinhada ao seu nicho (ex: verde para sustentabilidade/saúde, roxo para IA/tecnologia, laranja para varejo)?"*

### 📊 Pergunta 4: Densidade de Informação Desejada
> *"Você prefere uma interface mais limpa e espaçada (estilo Landing Page moderna com respiro visual) ou uma interface de alta densidade de dados (estilo ERP/Dashboard com muitas métricas, filtros e tabelas compactas na mesma tela)?"*

---

## 🛠️ PARTE 3: MATRIZ DE DECISÃO RÁPIDA PARA A IA

Quando o usuário responder às perguntas acima, a IA deve cruzar as respostas com a seguinte tabela de decisão:

| Resposta do Usuário | Decisão de Arquitetura Bootstrap | Paleta Aplicada | Componentes Mandatórios |
| :--- | :--- | :--- | :--- |
| **"Sistema interno para equipe lançar dados o dia todo"** | Alta Densidade, foco em teclado | Azul Corporativo + Cinza | Tabelas `.table-sm`, atalhos de teclado, `.form-control` compacto, validações imediatas |
| **"Landing page para vender software SaaS/IA"** | Espaçamento generoso, elegância | Violeta/Índigo + Azul | Hero section imponente, cards de preços com destaque no plano recomendado, FAQ em `.accordion` |
| **"App médico ou de agendamento de consultas"** | Acolhedor, visual limpo e calmo | Verde Sálvia + Ciano | Datepicker amigável, botões `.rounded-pill`, feedback suave e alertas sem alarmismo |
| **"Painel analítico para diretoria"** | Visual executivo, gráficos limpos | Paleta `#90271` oficial | Cards de KPIs em destaque com badges de tendência (+/-%), gráficos integrados e exportação PDF |

