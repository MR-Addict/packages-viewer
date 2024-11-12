export default class SessionState<T> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  get() {
    const value = sessionStorage.getItem(this.key);
    if (value) return JSON.parse(value) as T;
    return null;
  }

  set(value: T) {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }
}
