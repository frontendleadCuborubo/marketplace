import {
	Component,
	Output,
	EventEmitter,
	OnInit,
	OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface SortOptions {
	title: string;
	value: string;
}

@Component({
	selector: 'product-sorter',
	templateUrl: './sorter.component.html',
})
export class ProductSorterComponent implements OnInit, OnDestroy {
	private _activatedRouteSub: Subscription;
	selectedValue = '-updatedAt';

	@Output() onSort = new EventEmitter();

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this._activatedRouteSub = this.activatedRoute.queryParams.subscribe(
			(params) => {
				if (params['sort']) {
					this.selectedValue = params['sort'];
				}
			}
		);
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
		this._activatedRouteSub.unsubscribe();
	}
}
