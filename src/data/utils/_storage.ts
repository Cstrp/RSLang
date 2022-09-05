const set = (key: string, value: string) => window.localStorage.setItem(key, JSON.stringify(value));

const get = (key: string): string => JSON.parse(window.localStorage.getItem(key) || 'null');

const remove = (key: string | string[]): void => window.localStorage.removeItem(<string>key);

const clear = (): void => window.localStorage.clear();

export {set, get, remove, clear};
