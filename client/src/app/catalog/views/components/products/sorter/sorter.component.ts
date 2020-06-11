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

interface SortOptions {
	title: string;
	value: string;
}

@Component({
	selector: 'product-sorter',
	templateUrl: './sorter.component.html',
})
export class ProductSorterComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject<void>(); // TODO: Add autounsubcribe
	selectedValue = '-updatedAt';

	@Output() onSort = new EventEmitter();

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this.activatedRoute.queryParams
			.pipe(takeUntil(this._destroy$))
			.subscribe((params) => {
				if (params[SORT_QUERY_PARAM_NAME]) {
					this.selectedValue = params[SORT_QUERY_PARAM_NAME];
				}
			});
	}

	getSortOptions(): SortOptions[] {
		return [
			{
				title: 'По дате',
				value: '-updatedAt',
			},
			{
				title: 'Дешевые',
				value: 'price',
			},
			{
				title: 'Дорогие',
				value: '-price',
			},
		];
	}

	handleSort(sortValue) {
		this.selectedValue = sortValue;
		this.onSort.emit(sortValue);
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
