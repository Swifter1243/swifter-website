export class Invokable<Args extends unknown[] = []> {
    private listeners = new Set<(...args: Args) => void>();

    subscribe(fn: (...args: Args) => void) {
        this.listeners.add(fn);
    }

    unsubscribe(fn: (...args: Args) => void) {
        this.listeners.delete(fn)
    }

    invoke(...args: Args) {
        this.listeners.forEach(fn => fn(...args));
    }
}