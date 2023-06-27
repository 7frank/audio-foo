import { writable } from 'svelte/store';

interface Constructable<T> {
	new (...args: any): T;
}

export function reactive<T>(): any {
	return function (constructor: Constructable<T>) {
		// Initial value is set to null because we don't yet have an instance
		const store = writable(null);

		return function (...args) {
			const instance = new (constructor as Constructable<T>)(...args) as T;
			console.log('Foo', instance, constructor);
			// Set the store value as soon as we have an instance
			store.set(instance as any);

			// We hijack the original methods so that we can notify the store
			Object.getOwnPropertyNames(constructor.prototype).forEach((method) => {
				const originalFn: Function = constructor.prototype[method];
				constructor.prototype[method] = function (...args) {
					store.set(instance as any);
					return originalFn.call(instance, ...args);
				};
			});

			// clone the store methods to get the store contract
			Object.keys(store).forEach((method) => (constructor.prototype[method] = store[method]));

			return instance;
		};
	};
}
