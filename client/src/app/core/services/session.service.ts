import { Injectable } from '@angular/core';

import { ClientStorageProvider } from './client-storage-provider';

@Injectable({
	providedIn: 'root',
})
export class SessionService {
	private readonly prefix = 'ozzi.';
	private readonly storageProvider = new ClientStorageProvider();

	public get<T>(key: string, defaultValue = null): T {
		return this.storageProvider.getItem(this.prefix + key) || defaultValue;
	}

	public set<T>(key: string, value: T): void {
		this.storageProvider.setItem(this.prefix + key, value);
	}

	public remove(key: string): void {
		this.storageProvider.removeItem(this.prefix + key);
	}

	public has(key: string): boolean {
		return this.storageProvider.hasKey(this.prefix + key);
	}

	public removeAll(): void {
		this.storageProvider.clear();
	}
}
