/**
 * Esercizio 1 — Convertitore di temperatura
 */
export function convertTemperature(value, unit) {
  if (unit === 'C') {
    return Number((value * 9 / 5 + 32).toFixed(2));
  }

  if (unit === 'F') {
    return Number(((value - 32) * 5 / 9).toFixed(2));
  }

  return null;
}

/**
 * Esercizio 2 — Conta le vocali
 */
export function countVowels(str) {
  let count = 0;
  const normalized = str.toLowerCase();

  for (let i = 0; i < normalized.length; i++) {
    if (
      normalized[i] === 'a' ||
      normalized[i] === 'e' ||
      normalized[i] === 'i' ||
      normalized[i] === 'o' ||
      normalized[i] === 'u'
    ) {
      count++;
    }
  }

  return count;
}

/**
 * Esercizio 3 — Limita un valore (clamp)
 */
export function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

/**
 * Esercizio 4 — FizzBuzz
 */
export function fizzbuzz(n) {
  const result = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(String(i));
    }
  }

  return result;
}

/**
 * Esercizio 5 — Parola più lunga
 */
export function longestWord(sentence) {
  if (sentence === '') {
    return '';
  }

  const words = sentence.split(' ');
  let longest = words[0];

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }

  return longest;
}

/**
 * Esercizio 6 — Controllo palindromo
 */
export function isPalindrome(str) {
  const cleaned = str.replace(/\s+/g, '').toLowerCase();
  const reversed = cleaned.split('').reverse().join('');

  return cleaned === reversed;
}

/**
 * Esercizio 7 — Calcola sconto
 */
export function applyDiscount(price, discountPercent) {
  if (price <= 0) {
    return null;
  }

  if (discountPercent < 0 || discountPercent > 100) {
    return null;
  }

  const finalPrice = price * (1 - discountPercent / 100);
  return Number(finalPrice.toFixed(2));
}

/**
 * Esercizio 8 — Rimuovi duplicati
 */
export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

/**
 * Esercizio 9 — Capitalizza ogni parola
 */
export function capitalizeWords(sentence) {
  if (sentence === '') {
    return '';
  }

  return sentence
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Esercizio 10 — Valida una password
 */
export function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push('Almeno 8 caratteri');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Almeno una lettera maiuscola');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Almeno un numero');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Almeno un carattere speciale (!@#$%^&*)');
  }

  return errors;
}
