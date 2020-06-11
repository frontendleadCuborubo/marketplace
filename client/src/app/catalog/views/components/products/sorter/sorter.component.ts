import {
	Component,
	Output,
	EventEmitter,
	OnInit,
	OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SORT_QUERY_PARAM_NAME } from '../../../../catalog-query-params';
import {
	getDefaultSortValue,
	getAvailableOrders,
	SortOrdersOptions,
} from '../../../../helper/product/product-list';

@Component({
	selector: 'product-sorter',
	templateUrl: './sorter.component.html',
})
export class ProductSorterComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject<void>(); // TODO: Add autounsubcribe
	sortValue: string = getDefaultSortValue();
	availableOrders: SortOrdersOptions[] = getAvailableOrders();

	@Output() onSort = new EventEmitter();

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this.activatedRoute.queryParams
			.pipe(takeUntil(this._destroy$))
			.subscribe((params) => {
				if (params[SORT_QUERY_PARAM_NAME]) {
					this.sortValue = params[SORT_QUERY_PARAM_NAME];
				}
			});
	}

	handleSort(value) {
		this.sortValue = value;
		this.onSort.emit(value);
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
