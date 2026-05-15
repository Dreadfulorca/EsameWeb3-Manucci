/**
 * Esercizio 1 — Rettangolo
 */
export class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }

  isSquare() {
    return this.width === this.height;
  }

  scale(factor) {
    return new Rectangle(this.width * factor, this.height * factor);
  }
}

/**
 * Esercizio 2 — Coda (Queue)
 */
export class Queue {
  #items;

  constructor() {
    this.#items = [];
  }

  enqueue(item) {
    this.#items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Coda vuota');
    }

    return this.#items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Coda vuota');
    }

    return this.#items[0];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  get size() {
    return this.#items.length;
  }
}

/**
 * Esercizio 3 — Registro temperature
 */
export class TemperatureLogger {
  #values;

  constructor() {
    this.#values = [];
  }

  log(value) {
    this.#values.push(value);
  }

  min() {
    if (this.#values.length === 0) {
      return null;
    }

    return Math.min(...this.#values);
  }

  max() {
    if (this.#values.length === 0) {
      return null;
    }

    return Math.max(...this.#values);
  }

  average() {
    if (this.#values.length === 0) {
      return null;
    }

    const sum = this.#values.reduce((total, value) => total + value, 0);
    return Number((sum / this.#values.length).toFixed(2));
  }

  get count() {
    return this.#values.length;
  }

  clear() {
    this.#values = [];
  }
}

/**
 * Esercizio 4 — Carrello della spesa
 */
export class ShoppingCart {
  #items;

  constructor() {
    this.#items = [];
  }

  addItem({ id, name, price }) {
    const existingItem = this.#items.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
      return;
    }

    this.#items.push({ id, name, price, quantity: 1 });
  }

  removeItem(id) {
    this.#items = this.#items.filter((item) => item.id !== id);
  }

  updateQuantity(id, quantity) {
    if (quantity < 1) {
      throw new Error('Quantità non valida');
    }

    const item = this.#items.find((entry) => entry.id === id);
    if (!item) {
      return;
    }

    item.quantity = quantity;
  }

  getTotal() {
    const total = this.#items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return Number(total.toFixed(2));
  }

  getItems() {
    return this.#items.map((item) => ({ ...item }));
  }

  get itemCount() {
    return this.#items.reduce((count, item) => count + item.quantity, 0);
  }
}

/**
 * Esercizio 5 — Veicolo ed Elettrico
 */
export class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  describe() {
    return `${this.year} ${this.make} ${this.model}`;
  }

  age() {
    return 2026 - this.year;
  }
}

export class ElectricVehicle extends Vehicle {
  constructor(make, model, year, batteryCapacity) {
    super(make, model, year);
    this.batteryCapacity = batteryCapacity;
  }

  describe() {
    return `${this.year} ${this.make} ${this.model} (elettrico, ${this.batteryCapacity} kWh)`;
  }

  estimateRange(consumption) {
    return Math.round(this.batteryCapacity / consumption);
  }
}

/**
 * Esercizio 6 — Profilo utente con validazione
 */
export class UserProfile {
  #username;
  #email;
  #age;

  constructor(username, email, age) {
    this.username = username;
    this.email = email;
    this.age = age;
  }

  get username() {
    return this.#username;
  }

  set username(value) {
    if (typeof value !== 'string' || value.trim().length < 3) {
      throw new Error('Username non valido');
    }

    this.#username = value;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (typeof value !== 'string') {
      throw new Error('Email non valida');
    }

    const atIndex = value.indexOf('@');
    const dotIndex = value.lastIndexOf('.');

    if (atIndex <= 0 || dotIndex <= atIndex + 1 || dotIndex === value.length - 1) {
      throw new Error('Email non valida');
    }

    this.#email = value;
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (typeof value !== 'number' || Number.isNaN(value) || value < 0 || value > 120) {
      throw new Error('Età non valida');
    }

    this.#age = value;
  }

  toJSON() {
    return {
      username: this.#username,
      email: this.#email,
      age: this.#age,
    };
  }
}

/**
 * Esercizio 7 — Agenda eventi
 */
export class EventCalendar {
  #events;
  #nextId;

  constructor() {
    this.#events = [];
    this.#nextId = 1;
  }

  addEvent(title, date) {
    const id = this.#nextId++;
    this.#events.push({ id, title, date });
    return id;
  }

  removeEvent(id) {
    this.#events = this.#events.filter((event) => event.id !== id);
  }

  getByDate(date) {
    return this.#events
      .filter((event) => event.date === date)
      .map((event) => ({ ...event }));
  }

  getUpcoming(fromDate) {
    return this.#events
      .filter((event) => event.date >= fromDate)
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((event) => ({ ...event }));
  }

  get count() {
    return this.#events.length;
  }
}

/**
 * Esercizio 8 — Inventario magazzino
 */
export class Inventory {
  #stock;

  constructor() {
    this.#stock = {};
  }

  addStock(product, quantity) {
    if (quantity <= 0) {
      throw new Error('Quantità non valida');
    }

    this.#stock[product] = (this.#stock[product] ?? 0) + quantity;
  }

  removeStock(product, quantity) {
    if (!(product in this.#stock)) {
      throw new Error('Prodotto non trovato');
    }

    if (this.#stock[product] < quantity) {
      throw new Error('Scorte insufficienti');
    }

    this.#stock[product] -= quantity;
  }

  getStock(product) {
    return this.#stock[product] ?? 0;
  }

  getLowStock(threshold) {
    return Object.entries(this.#stock)
      .filter(([, quantity]) => quantity <= threshold)
      .map(([product]) => product)
      .sort((a, b) => a.localeCompare(b));
  }

  getReport() {
    return Object.entries(this.#stock)
      .sort(([productA], [productB]) => productA.localeCompare(productB))
      .map(([product, quantity]) => `${product}: ${quantity} unità`);
  }
}

/**
 * Esercizio 9 — Utilità per stringhe (metodi statici)
 */
export class StringUtils {
  constructor() {
    throw new Error('StringUtils non può essere istanziata');
  }

  static truncate(str, maxLength, suffix = '...') {
    if (str.length <= maxLength) {
      return str;
    }

    const sliceLength = Math.max(0, maxLength - suffix.length);
    return str.slice(0, sliceLength) + suffix;
  }

  static slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static repeat(str, n, separator = '') {
    if (n <= 0) {
      return '';
    }

    return Array(n).fill(str).join(separator);
  }

  static countWords(str) {
    const trimmed = str.trim();

    if (trimmed === '') {
      return 0;
    }

    return trimmed.split(/\s+/).length;
  }
}

/**
 * Esercizio 10 — Classifica punteggi
 */
export class Scoreboard {
  #scores;

  constructor() {
    this.#scores = {};
  }

  addScore(player, score) {
    if (!this.#scores[player]) {
      this.#scores[player] = [];
    }

    this.#scores[player].push(score);
  }

  getBest(player) {
    const scores = this.#scores[player];
    if (!scores) {
      return null;
    }

    return Math.max(...scores);
  }

  getAverage(player) {
    const scores = this.#scores[player];
    if (!scores) {
      return null;
    }

    const sum = scores.reduce((total, score) => total + score, 0);
    return Number((sum / scores.length).toFixed(2));
  }

  getTopN(n) {
    return Object.keys(this.#scores)
      .map((player) => ({ player, best: this.getBest(player) }))
      .sort((a, b) => {
        if (b.best !== a.best) {
          return b.best - a.best;
        }

        return a.player.localeCompare(b.player);
      })
      .slice(0, n);
  }

  getRank(player) {
    const ranking = this.getTopN(Object.keys(this.#scores).length);
    const index = ranking.findIndex((entry) => entry.player === player);

    if (index === -1) {
      return null;
    }

    return index + 1;
  }
}




// qui sotto incollo i 3 test che sul file di test erano vuoti(da fare)

describe('Inventory', () => {
  test('addStock aggiunge scorte e getStock restituisce la quantità', () => {
    const inv = new Inventory();
    inv.addStock('Mela', 100);
    inv.addStock('Mela', 20);
    expect(inv.getStock('Mela')).toBe(120);
  });

  test('getStock restituisce 0 per prodotti assenti', () => {
    expect(new Inventory().getStock('Kiwi')).toBe(0);
  });

  test('removeStock sottrae la quantità correttamente', () => {
    const inv = new Inventory();
    inv.addStock('Mela', 100);
    inv.removeStock('Mela', 30);
    expect(inv.getStock('Mela')).toBe(70);
  });

  test('removeStock lancia errore se il prodotto non esiste', () => {
    const inv = new Inventory();
    expect(() => inv.removeStock('Mela', 1)).toThrow('Prodotto non trovato');
  });

  test('removeStock lancia errore se le scorte sono insufficienti', () => {
    const inv = new Inventory();
    inv.addStock('Kiwi', 5);
    expect(() => inv.removeStock('Kiwi', 10)).toThrow('Scorte insufficienti');
  });

  test('getLowStock restituisce i prodotti sotto soglia in ordine alfabetico', () => {
    const inv = new Inventory();
    inv.addStock('Mela', 100);
    inv.addStock('Kiwi', 5);
    inv.addStock('Avocado', 10);
    expect(inv.getLowStock(10)).toEqual(['Avocado', 'Kiwi']);
  });

  test('getReport restituisce il report ordinato alfabeticamente', () => {
    const inv = new Inventory();
    inv.addStock('Mela', 100);
    inv.addStock('Kiwi', 5);
    expect(inv.getReport()).toEqual(['Kiwi: 5 unità', 'Mela: 100 unità']);
  });
});

// ---------------------------------------------------------------------------
// Esercizio 9 — StringUtils
// ---------------------------------------------------------------------------
describe('StringUtils', () => {
  test('truncate tronca e aggiunge il suffisso di default', () => {
    expect(StringUtils.truncate('Hello World', 7)).toBe('Hell...');
  });

  test('truncate usa un suffisso personalizzato', () => {
    expect(StringUtils.truncate('Hello World', 7, '…')).toBe('Hello …');
  });

  test('truncate restituisce la stringa invariata se non serve troncare', () => {
    expect(StringUtils.truncate('Hi', 10)).toBe('Hi');
  });

  test('slugify converte in uno slug URL-friendly', () => {
    expect(StringUtils.slugify('Ciao Mondo!')).toBe('ciao-mondo');
  });

  test('repeat ripete la stringa con separatore', () => {
    expect(StringUtils.repeat('ha', 3, '-')).toBe('ha-ha-ha');
  });

  test('repeat restituisce stringa vuota se n <= 0', () => {
    expect(StringUtils.repeat('ha', 0, '-')).toBe('');
  });

  test('countWords conta correttamente le parole', () => {
    expect(StringUtils.countWords('  tre  parole qui  ')).toBe(3);
  });

  test('countWords restituisce 0 per stringa vuota o spazi', () => {
    expect(StringUtils.countWords('   ')).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Esercizio 10 — Scoreboard
// ---------------------------------------------------------------------------
describe('Scoreboard', () => {
  test('getBest restituisce il punteggio massimo del giocatore', () => {
    const sb = new Scoreboard();
    sb.addScore('Alice', 80);
    sb.addScore('Alice', 95);
    expect(sb.getBest('Alice')).toBe(95);
  });

  test('getBest restituisce null se il giocatore non esiste', () => {
    expect(new Scoreboard().getBest('Alice')).toBeNull();
  });

  test('getAverage calcola la media arrotondata a due decimali', () => {
    const sb = new Scoreboard();
    sb.addScore('Alice', 80);
    sb.addScore('Alice', 95);
    expect(sb.getAverage('Alice')).toBe(87.5);
  });

  test('getAverage restituisce null se il giocatore non esiste', () => {
    expect(new Scoreboard().getAverage('Alice')).toBeNull();
  });

  test('getTopN ordina per best decrescente e poi per nome', () => {
    const sb = new Scoreboard();
    sb.addScore('Alice', 95);
    sb.addScore('Bob', 90);
    sb.addScore('Carlo', 95);
    expect(sb.getTopN(2)).toEqual([
      { player: 'Alice', best: 95 },
      { player: 'Carlo', best: 95 },
    ]);
  });

  test('getRank restituisce la posizione del giocatore', () => {
    const sb = new Scoreboard();
    sb.addScore('Alice', 95);
    sb.addScore('Bob', 90);
    expect(sb.getRank('Bob')).toBe(2);
  });

  test('getRank restituisce null se il giocatore non esiste', () => {
    expect(new Scoreboard().getRank('Alice')).toBeNull();
  });
});