import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
	switchMap,
	shareReplay,
	withLatestFrom,
	tap,
	map,
	takeUntil,
} from 'rxjs/operators';

import { ICategory } from 'src/app/core/models/category.interfaces';
import { CategoryService } from 'src/app/core/services/category.service';
import { IProduct } from 'src/app/core/models/product.interfaces';
import { getCountText } from 'src/app/shared/components/util/catalog-utils';

@Component({
	selector: 'catalog-layout',
	templateUrl: './catalog-layout.component.html',
})
export class CatalogLayoutComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject<void>(); // TODO: Add autounsubcribe
	categoryId: string;
	categoryCount: string;
	currentPage: number;
	productCollectionSize: number;
	category$: Observable<ICategory>;
	subCategories$: Observable<ICategory[]>;
	productCollection$: Observable<IProduct[]>;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private categoryService: CategoryService
	) {}

	ngOnInit() {
		this._preparelayout();
	}

	private _preparelayout() {
		this.activatedRoute.queryParams
			.pipe(takeUntil(this._destroy$))
			.subscribe((query) => {
				this.currentPage = query.page ? parseInt(query.page) : 1;
			});

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
						tap(({ totalProducts }: any) => {
							this.productCollectionSize = totalProducts;
							this.categoryCount = getCountText(
								totalProducts || 0
							);
						}),
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
		this._destroy$.next();
		this._destroy$.complete();
	}
}
