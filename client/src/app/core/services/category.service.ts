import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICategory } from '../models/category.interfaces';

@Injectable()
export class CategoryService {
	constructor(private http: HttpClient) {}

	getRootCategories(): Observable<ICategory[]> {
		return this.http
			.get<ICategory[]>('/api/category/root')
			.pipe(map(({ data }: any) => data));
	}

	getByPath(path: string): Observable<ICategory> {
		return this.http
			.get<ICategory>(`/api/category/${path}`)
			.pipe(map(({ data }: any) => data));
	}

	/**
	 * @param id - Id of parent category
	 */
	getChildrenCategories(id): Observable<ICategory[]> {
		return this.http
			.get<ICategory[]>(`/api/category/${id}/children`)
			.pipe(map(({ data }: any) => data));
	}

	/**
	 * @param id - Id of category
	 */
	loadProductCollection(id, query = null): Observable<any[]> {
		let params = {};

		if (query) {
			params = {
				params: query,
			};
		}
		return this.http.get<any[]>(`/api/product/${id}/collection`, params);
	}
}
