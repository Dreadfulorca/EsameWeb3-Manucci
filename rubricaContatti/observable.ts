type Listener<Value> = (v: Value) => void;

export class Observable<T> {
  #listeners: Listener<T>[] = [];
  #value: T;

  constructor(initalValue: T) {
    this.#value = initalValue;
  }

  subscribe(fn: Listener<T>) {
    this.#listeners.push(fn);
  }

  next(value: T) {
    this.#value = value;
    for (const listener of this.#listeners) {
      listener(value);
    }
  }

  get value() {
    return this.#value;
  }
}
