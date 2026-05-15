/**
 * Esercizio 1 — Normalizza prodotti
 */
export function normalizeProducts(rawProducts) {
  return rawProducts.map((product) => ({
    name: product.product_name.trim(),
    price: Number(Number(product.selling_price).toFixed(2)),
    available: Boolean(product.in_stock),
    categoryId: parseInt(product.category_id, 10),
  }));
}

/**
 * Esercizio 2 — Catalogo filtrato e classificato
 */
export function filterAndRank(products, minPrice, maxPrice, topN) {
  return products
    .filter((product) => product.available)
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)
    .slice()
    .sort((a, b) => a.price - b.price)
    .slice(0, topN);
}

/**
 * Esercizio 3 — groupBy (higher-order function)
 */
export function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    const existingGroup = groups[key] ?? [];

    return {
      ...groups,
      [key]: [...existingGroup, item],
    };
  }, {});
}

/**
 * Esercizio 4 — Applicazione parziale
 */
export function partial(fn, ...fixedArgs) {
  return (...restArgs) => fn(...fixedArgs, ...restArgs);
}

/**
 * Esercizio 5 — once (closure)
 */
export function once(fn) {
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }

    return result;
  };
}

/**
 * Esercizio 6 — memoize (closure + cache)
 */
export function memoize(fn) {
  const cache = {};

  const memoized = (arg) => {
    const key = String(arg);

    if (!(key in cache)) {
      cache[key] = fn(arg);
    }

    return cache[key];
  };

  memoized.cacheSize = () => Object.keys(cache).length;

  return memoized;
}

/**
 * Esercizio 7 — Registro transazioni
 */
export function computeBalance(transactions) {
  const balance = transactions.reduce((total, transaction) => {
    if (transaction.type === 'credit') {
      return total + transaction.amount;
    }

    if (transaction.type === 'debit') {
      return total - transaction.amount;
    }

    return total;
  }, 0);

  return Number(balance.toFixed(2));
}

export function getCredits(transactions) {
  return transactions
    .filter((transaction) => transaction.type === 'credit')
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function getDebits(transactions) {
  return transactions
    .filter((transaction) => transaction.type === 'debit')
    .reduce((total, transaction) => total + transaction.amount, 0);
}

/**
 * Esercizio 8 — Appiattisci righe d'ordine
 */
export function flattenLineItems(orders) {
  return orders.flatMap((order) =>
    order.items.map((item) => ({
      orderId: order.id,
      customerId: order.customerId,
      product: item.product,
      qty: item.qty,
      price: item.price,
      total: Number((item.qty * item.price).toFixed(2)),
    }))
  );
}

/**
 * Esercizio 9 — Helper immutabili per array
 */
export function updateAt(arr, index, value) {
  return [...arr.slice(0, index), value, ...arr.slice(index + 1)];
}

export function removeAt(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function insertAt(arr, index, value) {
  return [...arr.slice(0, index), value, ...arr.slice(index)];
}

/**
 * Esercizio 10 — Pipeline dati con pipe
 */
export const pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);

export const normalizeUsers = (users) =>
  users.map((user) => ({
    name: `${user.first_name.trim()} ${user.last_name.trim()}`.trim(),
    email: user.email,
    age: parseInt(user.age, 10),
  }));

export const filterAdults = (users) => users.filter((user) => user.age >= 18);

export const sortByName = (users) =>
  users.slice().sort((a, b) => a.name.localeCompare(b.name));

export const toReport = (users) => users.map((user) => `${user.name} (${user.age})`);

export const processUserReport = pipe(
  normalizeUsers,
  filterAdults,
  sortByName,
  toReport,
);
