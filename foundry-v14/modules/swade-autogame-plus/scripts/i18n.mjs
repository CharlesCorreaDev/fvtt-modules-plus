/**
 * @fileoverview Utilitário central de Internacionalização (i18n) para o SWADE AutoGame Plus (SWAG+)
 * [PT-BR] Resolve chaves de tradução de lang/pt-BR.json, lang/en.json e lang/es.json via game.i18n com fallback seguro para testes Node.js.
 * [EN] Resolves translation keys from lang/pt-BR.json, lang/en.json, and lang/es.json via game.i18n with safe fallback for Node.js tests.
 */

/**
 * [PT-BR] Traduz uma chave i18n simples ou retorna o fallback caso game.i18n não esteja disponível.
 * [EN] Localizes a simple i18n key or returns fallback if game.i18n is unavailable.
 *
 * @param {string} key - Chave i18n (ex: "SWAG.Card.TargetNumberAbbr")
 * @param {string} [fallback=""] - Valor padrão caso a chave não exista
 * @returns {string}
 */
export function t(key, fallback = "") {
  const i18n = globalThis.game?.i18n;
  if (i18n && typeof i18n.localize === "function") {
    const hasKey = typeof i18n.has === "function" ? i18n.has(key) : true;
    if (hasKey) {
      const localized = i18n.localize(key);
      if (localized && localized !== key) {
        return localized;
      }
    }
  }
  return fallback || key;
}

/**
 * [PT-BR] Formata uma chave i18n com variáveis (ex: {tn}, {raises}) ou substitui no fallback.
 * [EN] Formats an i18n key with variables (e.g., {tn}, {raises}) or interpolates into fallback.
 *
 * @param {string} key - Chave i18n
 * @param {Record<string, string|number>} [data={}] - Parâmetros de interpolação
 * @param {string} [fallback=""] - Texto de fallback com placeholders {var}
 * @returns {string}
 */
export function tf(key, data = {}, fallback = "") {
  const i18n = globalThis.game?.i18n;
  if (i18n && typeof i18n.format === "function") {
    const hasKey = typeof i18n.has === "function" ? i18n.has(key) : true;
    if (hasKey) {
      const formatted = i18n.format(key, data);
      if (formatted && formatted !== key) {
        return formatted;
      }
    }
  }
  let result = fallback || key;
  for (const [k, v] of Object.entries(data)) {
    result = result.replaceAll(`{${k}}`, String(v));
  }
  return result;
}

