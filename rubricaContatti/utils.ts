export function querySelectorOrThrow(selector: string) {
  const elementOrNull = document.querySelector(selector);
  if (elementOrNull === null)
    throw new Error('Elemento non ho trovato nel dom. Ricontrolla il selector');
  return elementOrNull;
}
