export class ClientStorageProvider {
	private readonly storage: Storage;

	constructor() {
		this.storage = window.localStorage;
	}

	public removeItem(key: string): void {
		this.storage.removeItem(key);
	}

	public hasKey(key: string): boolean {
		return !!this.storage.getItem(key);
	}

	public clear(): void {
		this.storage.clear();
	}

	public setItem<T>(key: string, value: T): void {
		this.storage.setItem(key, this.serialize(value));
	}

	public getItem<T>(key: string): T {
		return this.deserialize(this.storage.getItem(key)) as T;
	}

	private serialize(value: any): string {
		return JSON.stringify(value);
	}

	private deserialize(value: string): any {
		try {
			return JSON.parse(value);
		} catch (e) {
			return '';
		}
	}
}
