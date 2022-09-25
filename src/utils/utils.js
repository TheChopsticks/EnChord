/**
 * Converts a given string to sentence case.
 * @param {string} text
 * @returns {string}
 */
export function toSentenceCase(text) {
  if (!text.length) return text;
  return text[0].toLocaleUpperCase() + text.slice(1).toLocaleLowerCase();
}
