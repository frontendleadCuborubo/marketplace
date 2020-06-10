import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
	switchMap,
	shareReplay,
	withLatestFrom,
	tap,
	map,
} from 'rxjs/operators';

import { ICategory } from 'src/app/core/models/category.interfaces';
import { CategoryService } from 'src/app/core/services/category.service';
import { IProduct } from 'src/app/core/models/product.interfaces';

@Component({
	selector: 'catalog-layout',
	templateUrl: './catalog-layout.component.html',
})
export class CatalogLayoutComponent implements OnInit, OnDestroy {
	activatedRouteSub: Subscription;
	categoryId: string;
	currentPage: number;
	totalProducts: number;
	category$: Observable<ICategory>;
	subCategories$: Observable<ICategory[]>;
	productCollection$: Observable<IProduct[]>;

	// TODO: To utils
	private readonly _defaultProductCountWords = [
		'объявление',
		'объявления',
		'объявлений',
	];

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private categoryService: CategoryService
	) {}

	ngOnInit() {
		this._preparelayout();
	}

	private _preparelayout() {
		this.activatedRouteSub = this.activatedRoute.queryParams.subscribe(
			(query) => {
				this.currentPage = query.page ? parseInt(query.page) : 1;
			}
		);

		this.category$ = this.activatedRoute.params.pipe(
			switchMap((params) =>
				this.categoryService
					.getByPath(params['path'])
					.pipe(tap((category) => (this.categoryId = category._id)))
			),
			shareReplay(1)
		);

		// Prodblem: Different id
		this.loadProductCollection();

		// Prodblem: Different id
		this.subCategories$ = this.category$.pipe(
			switchMap(({ id }) =>
				this.categoryService.getChildrenCategories(id)
			)
		);
	}

	private loadProductCollection() {
		this.productCollection$ = this.category$.pipe(
			withLatestFrom(this.activatedRoute.queryParams),
			switchMap((data) =>
				this.categoryService
					.loadProductCollection(data[0]._id, data[1])
					.pipe(
						tap(
							(data: any) =>
								(this.totalProducts = data.totalProducts)
						),
						map(({ data }) => data)
					)
			)
		);
	}

	private navigate(queryParams, relativeTo = this.activatedRoute) {
		this.router.navigate([], {
			relativeTo,
			queryParams,
			queryParamsHandling: 'merge',
		});
	}

	// TODO: To utils
	getCountText(number) {
		const cases = [2, 0, 1, 1, 1, 2];
		return (
			number +
			' ' +
			this._defaultProductCountWords[
				number % 100 > 4 && number % 100 < 20
					? 2
					: cases[Math.min(number % 10, 5)]
			]
		);
	}

	onSortChange(value) {
		this.navigate({
			sort: value,
		});

		this.loadProductCollection();
	}

	onPageChange(value) {
		this.navigate({
			page: value,
		});

		this.loadProductCollection();
	}

	ngOnDestroy() {
		this.activatedRouteSub.unsubscribe();
	}
}
