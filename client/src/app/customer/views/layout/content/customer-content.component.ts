import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'customer-content',
	templateUrl: './customer-content.component.html',
})
export class CustomerContentComponent implements OnDestroy {
	private _destroy$ = new Subject<void>(); // TODO: Add autounsubcribe
	title: string = '';
	menu: [];

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		const activatedRoute$ = this.detectActivatedRoute();
		activatedRoute$
			.pipe(
				takeUntil(this._destroy$),
				mergeMap((route) => route.data)
			)
			.subscribe(({ title, menu }) => {
				this.title = title;
				this.menu = menu;
			});
	}

	private detectActivatedRoute() {
		const activatedRoute$: Observable<ActivatedRoute> = this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => this.activatedRoute),
			map((route) => route)
		);
		return activatedRoute$;
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
