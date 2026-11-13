# Manual Canônico: JavaScript Moderno (ES6+), jQuery & jQuery UI 📜⚡

> **Objetivo:** Estabelecer o manual técnico completo de **JavaScript Moderno (ES2024+)**, manipulação de DOM nativa, integração com componentes do **Bootstrap (v5.3 e v6.0)**, e fornecer a referência canônica para **jQuery (v3.7+)** e **jQuery UI (v1.14+)** para sistemas legados, plugins clássicos e projetos em migração.

---

## 🚀 PARTE 1: JAVASCRIPT MODERNO (ES6+ / ES2024)

O Bootstrap moderno (v5+) eliminou o jQuery como dependência, adotando **Vanilla JavaScript nativo**. Aqui está o padrão canônico para interfaces modernas.

---

### 1. Manipulação Moderna de DOM & Seletores
```javascript
// 1. Seletores rápidos e seguros
const mainContainer = document.querySelector("#main-container");
const allActionButtons = document.querySelectorAll(".btn-action");

// 2. Iteração limpa sobre NodeLists
allActionButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = button.dataset.targetId; // Acesso a data-target-id
    console.log(`Botão clicado para o ID: ${targetId}`);
  });
});

// 3. Delegação de Eventos (Event Delegation) de Alta Performance
// Em vez de colocar listeners em 1.000 linhas de tabela, coloque no elemento pai:
document.querySelector("#tabela-pedidos").addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action='remover']");
  if (!trigger) return;
  
  const rowId = trigger.closest("tr").dataset.rowId;
  removerItem(rowId);
});
```

---

### 2. Controle de Classes, Atributos e Estados Acessíveis
```javascript
const alertBox = document.querySelector("#status-alert");

// Adicionar, remover e alternar classes
alertBox.classList.add("show", "d-block");
alertBox.classList.remove("d-none");
alertBox.classList.toggle("alert-success");

// Manipulação correta de atributos de Acessibilidade (ARIA)
alertBox.setAttribute("aria-hidden", "false");
const isExpanded = alertBox.getAttribute("aria-expanded") === "true";
```

---

### 3. Comunicação Assíncrona Moderna (`fetch` & `async/await`)
```javascript
async function carregarDadosDoServidor(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    renderizarCards(data);
  } catch (error) {
    console.error("Falha na requisição:", error);
    mostrarAlertaErro("Não foi possível carregar os dados.");
  }
}
```

---

### 4. Inicialização Programática de Componentes do Bootstrap 5.3+
No Bootstrap 5/6, componentes interativos são instanciados diretamente via classes de JavaScript nativo:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar todos os Tooltips da página:
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

  // 2. Abrir um Modal programaticamente:
  const myModalElement = document.querySelector("#meuModalExemplo");
  const modalInstance = new bootstrap.Modal(myModalElement, {
    backdrop: "static",
    keyboard: false
  });
  modalInstance.show();

  // 3. Ouvir eventos nativos do Bootstrap:
  myModalElement.addEventListener("hidden.bs.modal", () => {
    console.log("O modal foi completamente fechado.");
  });

  // 4. Disparar Toast:
  const toastElement = document.querySelector("#liveToast");
  const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
  toast.show();
});
```

---

## 🧩 PARTE 2: GUIA COMPLETO DE JQUERY (v3.7+)

Muitos projetos corporativos, sistemas legados, temas do AdminLTE, WordPress e plugins consagrados (DataTables, Select2) utilizam **jQuery**.

---

### 1. Sintaxe Básica & DOM Ready
```javascript
// Garantir execução somente após o carregamento completo do DOM:
$(document).ready(function() {
  console.log("DOM pronto via jQuery!");
});

// Forma abreviada canônica:
$(function() {
  // Código aqui
});
```

---

### 2. Seletores, Manipulação de Elementos e CSS
```javascript
// Seletores ID, Classe e Atributo
$("#meu-painel").addClass("shadow-sm p-4 bg-white");
$(".item-lista:first").css("font-weight", "bold");
$("input[name='usuario']").val("Charles Corrêa");

// Manipulação de Conteúdo
$("#titulo-pagina").text("Novo Título Seguro"); // Escapa tags HTML (evita XSS)
$("#conteudo-dinamico").html("<div class='alert alert-info'>Carregado!</div>");

// Inserção e Remoção
$("#lista-usuarios").append("<li class='list-group-item'>Novo Usuário</li>");
$("#lista-usuarios").prepend("<li class='list-group-item active'>Destaque</li>");
$("#elemento-obsoleto").remove();
```

---

### 3. Gerenciamento de Eventos no jQuery
```javascript
// Clique simples
$(".btn-salvar").on("click", function(event) {
  event.preventDefault();
  const $botao = $(this);
  $botao.prop("disabled", true).html("<i class='fa-solid fa-spinner fa-spin'></i> Salvando...");
});

// Delegação de eventos para elementos gerados dinamicamente via AJAX:
$("#tabela-dinamica").on("click", ".btn-deletar", function() {
  const id = $(this).data("id");
  $(this).closest("tr").fadeOut(300, function() {
    $(this).remove();
  });
});
```

---

### 4. Requisições AJAX com jQuery (`$.ajax`, `$.get`, `$.post`)
```javascript
$.ajax({
  url: "/api/pedidos",
  type: "POST",
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  data: JSON.stringify({ clienteId: 104, total: 250.00 }),
  beforeSend: function() {
    $("#loader").fadeIn(200);
  },
  success: function(response) {
    console.log("Sucesso:", response);
  },
  error: function(xhr, status, error) {
    console.error("Erro na chamada:", error);
  },
  complete: function() {
    $("#loader").fadeOut(200);
  }
});
```

---

## 🎨 PARTE 3: GUIA COMPLETO DE JQUERY UI (v1.14+)

O **jQuery UI** é a biblioteca oficial de interações, efeitos e widgets visuais construída sobre o jQuery.

---

### 1. Interações Fundamentais (Draggable, Droppable, Resizable, Sortable)

#### 🔹 Draggable (Arrastável) & Droppable (Área de Soltura):
```javascript
$(function() {
  // Tornar elementos arrastáveis com contenção na tela:
  $(".card-arrastavel").draggable({
    containment: "window",
    cursor: "grabbing",
    opacity: 0.75,
    revert: "invalid" // Volta se não cair em um droppable válido
  });

  // Área receptora:
  $("#lixeira-droppable").droppable({
    accept: ".card-arrastavel",
    hoverClass: "bg-danger-subtle border-danger",
    drop: function(event, ui) {
      ui.draggable.fadeOut(400, function() {
        $(this).remove();
      });
      console.log("Item descartado com sucesso!");
    }
  });
});
```

#### 🔹 Sortable (Reordenação de Listas por Drag & Drop / Estilo Kanban):
```javascript
$("#kanban-coluna-tarefas").sortable({
  placeholder: "ui-state-highlight bg-light border-dashed my-2",
  items: "> .card-tarefa",
  cursor: "move",
  update: function(event, ui) {
    const novaOrdem = $(this).sortable("toArray", { attribute: "data-id" });
    console.log("Nova ordem persistida:", novaOrdem);
  }
}).disableSelection();
```

---

### 2. Widgets Visuais Consagrados do jQuery UI

#### 🔹 Datepicker (Seletor de Datas Tradicional com Tradução PT-BR):
```javascript
$(function() {
  $("#data-nascimento").datepicker({
    dateFormat: "dd/mm/yy",
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0"
  });
});
```

#### 🔹 Autocomplete (Sugestões Dinâmicas de Busca):
```javascript
$("#busca-clientes").autocomplete({
  source: function(request, response) {
    $.getJSON("/api/busca-clientes", { termo: request.term }, function(data) {
      response($.map(data, function(item) {
        return {
          label: item.nome + " (" + item.cpf + ")",
          value: item.nome,
          id: item.id
        };
      }));
    });
  },
  minLength: 2,
  select: function(event, ui) {
    console.log("Cliente selecionado ID:", ui.item.id);
  }
});
```

#### 🔹 Accordion & Tabs (Abas e Sanfonas):
```javascript
$("#meu-accordion-ui").accordion({
  collapsible: true,
  heightStyle: "content",
  active: 0 // Primeiro aberto por padrão
});

$("#minhas-abas-ui").tabs({
  active: 0
});
```

---

## ⚖️ PARTE 4: TABELA COMPARATIVA DE MIGRAÇÃO: JQUERY ➔ VANILLA JS

Quando for refatorar código legado para o padrão moderno do Bootstrap 5.3+/6.0:

| Ação | Como fazer em jQuery | Como fazer em Vanilla JavaScript Moderno |
| :--- | :--- | :--- |
| **Selecionar 1 elemento** | `$("#id")` | `document.querySelector("#id")` |
| **Selecionar múltiplos** | `$(".itens")` | `document.querySelectorAll(".itens")` |
| **Adicionar Classe** | `$(el).addClass("ativo")` | `el.classList.add("ativo")` |
| **Remover Classe** | `$(el).removeClass("ativo")` | `el.classList.remove("ativo")` |
| **Alternar Classe** | `$(el).toggleClass("ativo")` | `el.classList.toggle("ativo")` |
| **Ouvir Evento** | `$(el).on("click", fn)` | `el.addEventListener("click", fn)` |
| **Ler / Mudar Texto** | `$(el).text("Olá")` | `el.textContent = "Olá"` |
| **Ler / Mudar HTML** | `$(el).html("<b>Olá</b>")` | `el.innerHTML = "<b>Olá</b>"` |
| **Ler Atributo** | `$(el).attr("data-id")` | `el.getAttribute("data-id")` ou `el.dataset.id` |
| **Requisição HTTP** | `$.getJSON(url, fn)` | `const res = await fetch(url); const data = await res.json();` |
| **Esconder Elemento** | `$(el).hide()` | `el.style.display = "none"` ou `el.classList.add("d-none")` |
| **Mostrar Elemento** | `$(el).show()` | `el.style.display = ""` ou `el.classList.remove("d-none")` |

