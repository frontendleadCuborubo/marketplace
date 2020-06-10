import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
	constructor(private http: HttpClient) {}

	create(product) {
		return this.http.post('/api/product', product);
	}

	getAllProduct() {}
}
