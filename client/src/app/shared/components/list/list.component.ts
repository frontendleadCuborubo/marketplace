import {
	Component,
	ChangeDetectionStrategy,
	Input,
	AfterContentChecked,
	OnDestroy,
} from '@angular/core';
import { Subject, Subscription, of, isObservable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'async-list',
	template: '',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ListComponent implements AfterContentChecked, OnDestroy {
	public listData;
	private _onDestroy = new Subject<void>();
	private _renderChangeSubscription: Subscription | null;

	@Input()
	get collection() {
		return this._dataSource;
	}
	set collection(source) {
		if (this._dataSource !== source) {
			this._setDataSource(source);
		}
	}
	private _dataSource;

	trackById(index) {
		return index;
	}

	ngAfterContentChecked() {
		if (this.collection && !this._renderChangeSubscription) {
			this._observeRenderChanges();
		}
	}

	ngOnDestroy() {
		this._onDestroy.next();
		this._onDestroy.complete();

		this.listData = [];
	}

	private _setDataSource(source) {
		if (this._renderChangeSubscription) {
			this._renderChangeSubscription.unsubscribe();
			this._renderChangeSubscription = null;
		}

		this._dataSource = source;
	}

	private _observeRenderChanges() {
		if (!this.collection) {
			this.listData = [];
			return;
		}

		let dataStream;
		if (isObservable(this.collection)) {
			dataStream = this.collection;
		} else if (Array.isArray(this.collection)) {
			dataStream = of(this.collection);
		}

		this._renderChangeSubscription = dataStream
			.pipe(takeUntil(this._onDestroy))
			.subscribe((data: any) => (this.listData = [...(data || [])]));
	}
}
