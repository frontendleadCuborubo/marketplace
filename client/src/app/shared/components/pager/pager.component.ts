import {
	Component,
	Input,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	SimpleChanges,
	Directive,
	TemplateRef,
	OnChanges,
	ContentChild,
} from '@angular/core';

import { AppPagerConfig } from './pager-config';
import { isNumber, getValueInRange } from '../util/util';

/**
 * link templates.
 */
export interface AppPagerLinkContext {
	/**
	 * The currently selected page number
	 */
	currentPage: number;

	/**
	 * If `true`, the current link is disabled
	 */
	disabled: boolean;
}

/**
 * A context for the `AppPagerNumber`.
 *
 * Extends `AppPagerLinkContext`.
 */
export interface AppPagerNumberContext extends AppPagerLinkContext {
	/**
	 * The page number, displayed by the current page link.
	 */
	$implicit: number;
}

/**
 * A directive to match the 'next' link template
 */
@Directive({ selector: 'ng-template[appPagerNext]' })
export class AppPagerNext {
	constructor(public templateRef: TemplateRef<AppPagerLinkContext>) {}
}

/**
 * A directive to match the page 'number' link template
 */
@Directive({ selector: 'ng-template[appPagerNumber]' })
export class AppPagerNumber {
	constructor(public templateRef: TemplateRef<AppPagerLinkContext>) {}
}

/**
 * A directive to match the 'previous' link template
 */
@Directive({ selector: 'ng-template[appPagePrevious]' })
export class AppPagerPrevious {
	constructor(public templateRef: TemplateRef<AppPagerLinkContext>) {}
}

@Component({
	selector: 'app-pager',
	templateUrl: './pager.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPager implements OnChanges {
	pageCount = 0;
	pages: number[] = [];

	@ContentChild(AppPagerNext, { static: false })
	tplNext: AppPagerNext;
	@ContentChild(AppPagerNumber, { static: false })
	tplNumber: AppPagerNumber;
	@ContentChild(AppPagerPrevious, { static: false })
	tplPrevious: AppPagerPrevious;

	/**
	 * If `true`, pagination links will be disabled.
	 */
	@Input() disabled: boolean;

	/**
	 * If `true`, the "First" and "Last" page links are shown.
	 */
	@Input() boundaryLinks: boolean;

	/**
	 * If `true`, the "Next" and "Previous" page links are shown.
	 */
	@Input() directionLinks: boolean;

	/**
	 * If `true`, the ellipsis symbols and first/last page numbers will be shown when `maxSize` > number of pages.
	 */
	@Input() ellipses: boolean;

	/**
	 *  The number of items in your paginated collection.
	 *
	 *  Note, that this is not the number of pages. Page numbers are calculated dynamically based on
	 *  `collectionSize` and `pageSize`. Ex. if you have 100 items in your collection and displaying 20 items per page,
	 *  you'll end up with 5 pages.
	 */
	@Input() collectionSize: number;

	/**
	 *  The maximum number of pages to display.
	 */
	@Input() maxSize: number;

	/**
	 *  The current page.
	 */
	@Input() page = 1;

	/**
	 *  The number of items per page.
	 */
	@Input() pageSize: number;

	/**
	 *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
	 *
	 *  Event payload is the number of the newly selected page.
	 *
	 *  Page numbers start with `1`.
	 */
	@Output() pageChange = new EventEmitter<number>(true);

	constructor(config: AppPagerConfig) {
		this.disabled = config.disabled;
		this.boundaryLinks = config.boundaryLinks;
		this.directionLinks = config.directionLinks;
		this.ellipses = config.ellipses;
		this.maxSize = config.maxSize;
		this.pageSize = config.pageSize;
	}

	hasPrevious(): boolean {
		return this.page > 1;
	}

	hasNext(): boolean {
		return this.page < this.pageCount;
	}

	nextDisabled(): boolean {
		return !this.hasNext() || this.disabled;
	}

	previousDisabled(): boolean {
		return !this.hasPrevious() || this.disabled;
	}

	selectPage(pageNumber: number): void {
		this._updatePages(pageNumber);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['page']) {
			this._updatePages(this.page);
		}
	}

	isEllipsis(pageNumber): boolean {
		return pageNumber === -1;
	}

	/**
	 * Appends ellipses and first/last page number to the displayed pages
	 */
	private _applyEllipses(start: number, end: number) {
		if (this.ellipses) {
			if (start > 0) {
				// The first page will always be included. If the displayed range
				// starts after the third page, then add ellipsis. But if the range
				// starts on the third page, then add the second page instead of
				// an ellipsis, because the ellipsis would only hide a single page.
				if (start > 2) {
					this.pages.unshift(-1);
				} else if (start === 2) {
					this.pages.unshift(2);
				}
				this.pages.unshift(1);
			}
			if (end < this.pageCount) {
				// The last page will always be included. If the displayed range
				// ends before the third-last page, then add ellipsis. But if the range
				// ends on third-last page, then add the second-last page instead of
				// an ellipsis, because the ellipsis would only hide a single page.
				if (end < this.pageCount - 2) {
					this.pages.push(-1);
				} else if (end === this.pageCount - 2) {
					this.pages.push(this.pageCount - 1);
				}
				this.pages.push(this.pageCount);
			}
		}
	}

	/**
	 * Rotates page numbers based on maxSize items visible.
	 * Currently selected page stays in the middle:
	 *
	 * Ex. for selected page = 6:
	 * [5,*6*,7] for maxSize = 3
	 * [4,5,*6*,7] for maxSize = 4
	 */
	private _applyRotation(): [number, number] {
		let start = 0;
		let end = this.pageCount;
		let leftOffset = Math.floor(this.maxSize / 2);
		let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;

		if (this.page <= leftOffset) {
			// very beginning, no rotation -> [0..maxSize]
			end = this.maxSize;
		} else if (this.pageCount - this.page < leftOffset) {
			// very end, no rotation -> [len-maxSize..len]
			start = this.pageCount - this.maxSize;
		} else {
			// rotate
			start = this.page - leftOffset - 1;
			end = this.page + rightOffset;
		}

		return [start, end];
	}

	/**
	 * Paginates page numbers based on maxSize items per page.
	 */
	private _applyPagination(): [number, number] {
		let page = Math.ceil(this.page / this.maxSize) - 1;
		let start = page * this.maxSize;
		let end = start + this.maxSize;

		return [start, end];
	}

	private _setPageInRange(newPageNo) {
		const prevPageNo = this.page;
		this.page = getValueInRange(newPageNo, this.pageCount, 1);

		if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
			this.pageChange.emit(this.page);
		}
	}

	private _updatePages(newPage: number) {
		this.pageCount = Math.ceil(this.collectionSize / this.pageSize);

		if (!isNumber(this.pageCount)) {
			this.pageCount = 0;
		}

		// fill-in model needed to render pages
		this.pages.length = 0;
		for (let i = 1; i <= this.pageCount; i++) {
			this.pages.push(i);
		}

		// set page within 1..max range
		this._setPageInRange(newPage);

		// apply maxSize if necessary
		if (this.maxSize > 0 && this.pageCount > this.maxSize) {
			let start = 0;
			let end = this.pageCount;

			[start, end] = this._applyPagination();

			this.pages = this.pages.slice(start, end);

			// adding ellipses
			this._applyEllipses(start, end);
		}
	}
}
