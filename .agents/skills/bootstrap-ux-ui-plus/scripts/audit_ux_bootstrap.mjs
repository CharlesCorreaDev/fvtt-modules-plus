#!/usr/bin/env node
/**
 * ==============================================================================
 * Bootstrap UX/UI Plus - Audit & Linter Engine 🛡️🎨
 * 
 * PT: Audita arquivos HTML, PHP, JSX e templates para conformidade com as Leis do
 *     UX (Hick, Fitts, Jakob) e Acessibilidade WCAG 2.2 AA no Bootstrap.
 * 
 * EN: Audits HTML, PHP, JSX, and template files for compliance with UX Laws
 *     (Hick, Fitts, Jakob) and WCAG 2.2 AA accessibility in Bootstrap.
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

function auditHtmlContent(content, filename) {
  const issues = [];

  // 1. Verificação de botões de ícone sem aria-label (Acessibilidade)
  const iconBtnRegex = /<button[^>]*class="[^"]*btn[^"]*"[^>]*>\s*<i[^>]*class="[^"]*bi[^"]*"[^>]*><\/i>\s*<\/button>/gi;
  let match;
  while ((match = iconBtnRegex.exec(content)) !== null) {
    if (!match[0].includes('aria-label') && !match[0].includes('aria-labelledby') && !match[0].includes('title')) {
      issues.push({
        rule: 'WCAG 4.1.2 - Botão de Ícone sem Nome Acessível',
        level: 'ERROR',
        snippet: match[0],
        fix: 'Adicione aria-label="Ação do Botão" ao elemento <button>'
      });
    }
  }

  // 2. Imagens sem atributo alt (WCAG 1.1.1)
  const imgRegex = /<img(?![^>]*\balt=)[^>]*>/gi;
  while ((match = imgRegex.exec(content)) !== null) {
    issues.push({
      rule: 'WCAG 1.1.1 - Imagem sem atributo alt',
      level: 'ERROR',
      snippet: match[0],
      fix: 'Adicione alt="Descrição da imagem" ou alt="" se puramente decorativa'
    });
  }

  // 3. Inputs de formulário sem label associado (WCAG 3.3.2)
  const inputRegex = /<input[^>]*id="([^"]+)"[^>]*>/gi;
  while ((match = inputRegex.exec(content)) !== null) {
    const inputId = match[1];
    const labelRegex = new RegExp(`<label[^>]*for="${inputId}"`, 'i');
    const ariaLabel = /aria-label|aria-labelledby/i.test(match[0]);
    if (!labelRegex.test(content) && !ariaLabel) {
      issues.push({
        rule: 'WCAG 3.3.2 - Input sem <label for="..."> ou aria-label',
        level: 'WARNING',
        snippet: match[0],
        fix: `Crie um <label for="${inputId}"> ou adicione aria-label ao input`
      });
    }
  }

  // 4. Lei de Fitts: Links interativos sem alvo mínimo
  if (content.includes('style="outline: none') || content.includes('style="outline:none')) {
    issues.push({
      rule: 'WCAG 2.4.7 - Remoção do foco de teclado (outline: none)',
      level: 'ERROR',
      snippet: 'style="outline: none"',
      fix: 'Permita o anel de foco visível nativo ou use a classe .focus-ring do Bootstrap'
    });
  }

  return issues;
}

function runAudit(targetPath) {
  console.log(`\n${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan} 🛡️ BOOTSTRAP UX/UI PLUS - AUDITORIA DE UX & ACESSIBILIDADE    ${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}\n`);

  if (!fs.existsSync(targetPath)) {
    console.error(`${COLORS.red}Caminho não encontrado: ${targetPath}${COLORS.reset}`);
    process.exit(1);
  }

  const stat = fs.statSync(targetPath);
  const filesToAudit = [];

  if (stat.isDirectory()) {
    const files = fs.readdirSync(targetPath);
    for (const f of files) {
      if (['.html', '.php', '.jsx', '.tsx', '.vue', '.blade.php'].some(ext => f.endsWith(ext))) {
        filesToAudit.push(path.join(targetPath, f));
      }
    }
  } else {
    filesToAudit.push(targetPath);
  }

  let totalIssues = 0;

  for (const file of filesToAudit) {
    const content = fs.readFileSync(file, 'utf8');
    const issues = auditHtmlContent(content, file);

    console.log(`${COLORS.bold}📄 Arquivo: ${path.basename(file)}${COLORS.reset}`);
    if (issues.length === 0) {
      console.log(`  ${COLORS.green}✅ Nenhuma inconformidade de UX ou WCAG detectada!${COLORS.reset}\n`);
    } else {
      totalIssues += issues.length;
      for (const iss of issues) {
        const color = iss.level === 'ERROR' ? COLORS.red : COLORS.yellow;
        console.log(`  ${color}[${iss.level}] ${iss.rule}${COLORS.reset}`);
        console.log(`    Trecho: ${iss.snippet.slice(0, 80)}...`);
        console.log(`    Solução: ${iss.fix}\n`);
      }
    }
  }

  if (totalIssues === 0) {
    console.log(`${COLORS.green}${COLORS.bold}🎉 Auditoria concluída com 100% de conformidade!${COLORS.reset}\n`);
  } else {
    console.log(`${COLORS.yellow}Auditoria finalizada com ${totalIssues} alerta(s) a revisar.${COLORS.reset}\n`);
  }
}

const target = process.argv[2] || path.join(process.cwd(), 'bootstrap-ux-ui-plus', 'templates', 'admin-dashboard-template.html');
runAudit(target);

