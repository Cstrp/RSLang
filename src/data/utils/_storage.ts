const set = (key: string, value: string) => window.localStorage.setItem(key, JSON.stringify(value));

const get = (key: string): string => JSON.parse(window.localStorage.getItem(key) || 'null');

const remove = (key: string): void => window.localStorage.removeItem(key);

const clear = (): void => window.localStorage.clear();

export {set, get, remove, clear};
