# ADHD, Neurodiversity & Cognitive Ergonomics in UX/UI ⚡🧠
# TDAH, Neurodiversidade & Ergonomia Cognitiva em UX/UI ⚡🧠

> **Scientific Sources & Clinical References:**  
> - *Revista Projética (UEL - 2024):* Editorial & Interface Guidelines for ADHD.  
> - *Fast Company Brasil:* "The Secret of Good Design: Designing for ADHD".  
> - *Homem Máquina:* Cognitive Ergonomics for Neurodiversity, ADHD, and Autism.  
> - *DIO.me:* Behavioral Therapy Insights Applied to User Interface Design.  
> - *r/UXDesign:* Field Experiences from Neurodivergent Designers.

---

## 🇺🇸 English

### 1. ADHD Challenges in Digital Interfaces
People with Attention Deficit Hyperactivity Disorder (ADHD) experience:
1. **Executive Dysfunction & Task Paralysis:** Long, complex forms trigger immediate cognitive freeze.
2. **Working Memory Constraints:** Difficulty retaining information across multi-screen flows.
3. **Time Blindness:** Impaired perception of elapsed time, leading to anxiety around tasks without duration indicators.
4. **Wall-of-Text Fatigue:** Dense, unbroken paragraphs cause visual drift and immediate drop-off.

---

### 2. Core Ergonomic Patterns for ADHD
- **Atomic Progressive Disclosure:** Break multi-field forms into sequential, single-concept micro-steps.
- **Time Blindness Anchors:** Explicit time estimates on forms ("Takes ~2 min").
- **Dopamine-Driven Checklists:** Interactive checkboxes with strike-through text and subtle progress celebrations.
- **Intelligent Defaults:** Eliminate decision fatigue by pre-selecting the safest, most common option.
- **Bionic Reading Pattern:** Bold first few letters of key words to guide scanning without losing focus.
- **Zen / Focus Mode:** Provide a toggle that hides navigation sidebars and secondary metrics during high-focus tasks.

---

## 🇧🇷 Português (Brasil)

# TDAH, Neurodiversidade & Ergonomia Cognitiva em Interfaces Bootstrap 🧠⚡

> **Objetivo:** Estabelecer o manual técnico e neuropsicológico sobre como o **TDAH (Transtorno do Déficit de Atenção e Hiperatividade)**, o espectro autista e a sobrecarga executiva afetam a interação do usuário com sistemas digitais, e como traduzir esses conhecimentos em **interfaces Bootstrap 5.3+ e 6.0** livres de fricção, limpas e que combatem a paralisia de tarefa.

---

## 🔬 PARTE 1: A NEUROBIOLOGIA DO TDAH APLICADA AO DESIGN DE INTERFACES

O cérebro com TDAH opera com regulação atípica de **dopamina e noradrenalina** nos circuitos pré-frontais, resultando em 4 características cognitivas dominantes que impactam diretamente a usabilidade:

```text
┌────────────────────────────┐      ┌────────────────────────────┐
│ 1. Paralisia por Sobrecarga│      │ 2. Memória de Trabalho     │
│    (Task Paralysis)        │      │    Reduzida (Working Mem)  │
│ Muitos campos = Desistência│      │ "Saiu da tela, sumiu"      │
└─────────────┬──────────────┘      └─────────────┬──────────────┘
              │                                   │
              ▼                                   ▼
┌────────────────────────────┐      ┌────────────────────────────┐
│ 3. Cegueira Temporal       │      │ 4. Busca por Micro-        │
│    (Time Blindness)        │      │    Vitórias Dopaminérgicas │
│ Dificuldade em estimar     │      │ Recompensa rápida a cada   │
│ duração de fluxos longos   │      │ etapa concluída            │
└────────────────────────────┘      └────────────────────────────┘
```

1. **Paralisia por Sobrecarga (Task Paralysis / Executive Dysfunction):**
   - Diante de uma tela com 20 campos de formulário expostos de uma só vez, o cérebro neurodivergente entra em estado de bloqueio. O custo cognitivo percebido parece insuperável.
2. **Memória de Trabalho Reduzida (*Out of Sight, Out of Mind*):**
   - Se uma informação crítica foi mostrada no passo 1 de um wizard e não estiver visível no passo 3, o usuário a esquece. Informações precisam de **âncoras visuais permanentes**.
3. **Cegueira Temporal (Time Blindness):**
   - O usuário com TDAH tem dificuldade em estimar o tempo necessário para preencher um formulário ou concluir uma tarefa, gerando ansiedade e abandono.
4. **Dependência de Feedback Dopaminérgico:**
   - O engajamento é sustentado por **micro-vitórias rápidas** (barras de progresso animadas, checkboxes táteis e feedbacks imediatos de conclusão).

---

## 🛠️ PARTE 2: COMO O TDAH SE REFLETE EM COMPONENTES BOOTSTRAP

---

### 1. Combate à Muralha de Texto (Bionic Reading & Atomic Chunking)
* ❌ **Anti-Pattern Proibido:** Parágrafos longos com mais de 3 linhas contínuas sem quebras visuais.
* ✅ **Padrão Acessível Bootstrap:**
  - Parágrafos curtos (`max-width: 65ch` e entrelinha `line-height: 1.7`).
  - Palavras-chave de ação destacadas em **negrito** (estilo *Bionic Reading*) para guiar a varredura visual rápida.
  - Uso de listas com marcadores visuais (`.list-group` ou listas de ícones) em vez de blocos de texto contínuo.

---

### 2. Formulários em Fatias Atômicas (Progressive Disclosure)
Em vez de um formulário longo em página única:

```html
<!-- Wizard com Barra de Progresso e Indicação Clara de Tempo Estimado -->
<div class="card border-0 shadow-sm p-4 mb-4">
  <div class="d-flex justify-content-between align-items-center mb-2">
    <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
      <i class="fa-solid fa-clock me-1"></i> Leva apenas 2 minutos
    </span>
    <small class="text-muted fw-semibold">Passo 1 de 3 (33%)</small>
  </div>
  
  <!-- Barra de Progresso com Feedback Dopaminérgico -->
  <div class="progress mb-4" style="height: 8px;" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" style="width: 33%"></div>
  </div>

  <!-- Apenas 2 ou 3 campos por etapa (Lei de Miller) -->
  <h4 class="fw-bold mb-3">1. Informações Básicas</h4>
  <div class="mb-3">
    <label for="nomeCompleto" class="form-label fw-semibold">Seu Nome Completo</label>
    <input type="text" class="form-control focus-ring" id="nomeCompleto" placeholder="Ex: Carlos Silva" autofocus>
  </div>
  
  <div class="d-flex justify-content-end mt-4">
    <button type="button" class="btn btn-primary px-4 py-2 d-flex align-items-center gap-2">
      <span>Avançar para o Passo 2</span>
      <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </button>
  </div>
</div>
```

---

### 3. Checklists com Checkboxes Táteis e Sensação de Conclusão (Efeito Zeigarnik)
O cérebro com TDAH busca fechar tarefas abertas se o progresso for visualmente recompensador:

```html
<div class="list-group shadow-sm border-0 rounded-3">
  <label class="list-group-item d-flex gap-3 align-items-center p-3 border-0 border-bottom">
    <input class="form-check-input flex-shrink-0 fs-5" type="checkbox" checked>
    <span class="pt-1 text-decoration-line-through text-muted">Configurar perfil inicial</span>
    <span class="badge bg-success-subtle text-success ms-auto"><i class="fa-solid fa-check"></i> Feito</span>
  </label>
  <label class="list-group-item d-flex gap-3 align-items-center p-3 border-0 border-bottom bg-light">
    <input class="form-check-input flex-shrink-0 fs-5" type="checkbox">
    <span class="pt-1 fw-bold text-primary">Conectar banco de dados</span>
    <span class="badge bg-warning-subtle text-dark border ms-auto">Próximo Passo</span>
  </label>
  <label class="list-group-item d-flex gap-3 align-items-center p-3 border-0">
    <input class="form-check-input flex-shrink-0 fs-5" type="checkbox" disabled>
    <span class="pt-1 text-muted">Publicar aplicação na nuvem</span>
  </label>
</div>
```

---

### 4. Blindagem Contra Fadiga de Decisão: O "Default Inteligente"
* **Problema:** Pessoas neurodivergentes travam diante de muitas opções técnicas equivalentes.
* **Solução no Bootstrap:**
  - Em telas com 3 ou 4 planos ou opções, **destaque UMA opção como o "Padrão Recomendado"** usando borda colorida (`border border-2 border-primary`), uma badge `Recomendado` e o botão principal em `.btn-primary`.
  - As demais opções utilizam botões outline neutros e bordas discretas, eliminando a paralisia de escolha (Lei de Hick).

---

### 5. Tipografia & Redução do Esforço Visual (Lexend e Atkinson)
Conforme documentado em [`visual-accessibility-colorblindness.md`](../accessibility/visual-accessibility-colorblindness.md), ative fontes como **Lexend** para interfaces destinadas a neurodivergentes:
```css
/* Ativação do Modo TDAH no Bootstrap */
[data-mode="adhd-focus"] {
  font-family: 'Lexend', sans-serif !important;
  line-height: 1.75 !important;
  letter-spacing: 0.02em !important;
}

/* Redução de Distrações Periféricas (Zen Mode) */
[data-mode="adhd-focus"] .sidebar-banner,
[data-mode="adhd-focus"] .promotional-widget {
  display: none !important;
}
```

---

## 📋 Checklist de Design para TDAH & Neurodiversidade

1. ✅ **Sem Paredes de Texto:** Todos os parágrafos têm no máximo 3 linhas?
2. ✅ **Um Objetivo Primário por Tela:** Está claro para os olhos qual é o próximo passo sem precisar ler tudo?
3. ✅ **Feedback em < 400ms:** Cada ação tem reação visual imediata (Limiar de Doherty)?
4. ✅ **Progresso Visível:** Em formulários de múltiplos passos, há barra de progresso com indicação de tempo ("Leva 2 minutos")?
5. ✅ **Salvar e Continuar Depois:** O usuário pode pausar o fluxo sem perder o que já preencheu (respeito à fadiga executiva)?

