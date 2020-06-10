import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/models/category.interfaces';

@Component({
	selector: 'home-page',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
	itemsList$: Observable<ICategory[]>;

	constructor(private categoryService: CategoryService) {}

	ngOnInit() {
		this.itemsList$ = this.categoryService.getRootCategories();
	}
}
