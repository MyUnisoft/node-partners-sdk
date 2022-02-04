export default class LocalVariable<T> {
  private currentValue: T | null;

  constructor(initialValue: T | null = null) {
    this.currentValue = initialValue;
  }

  get() {
    return this.currentValue as T;
  }

  set(newValue: T) {
    this.currentValue = newValue;
  }

  is(value: T): boolean {
    return this.currentValue === value;
  }
}
