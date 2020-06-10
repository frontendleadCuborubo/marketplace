import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/services/user.service';
import { AppViewService } from 'src/app/core/services/app-view.service';
import { IUser } from 'src/app/core/models/user.interfaces';

@Component({
	selector: 'customer-settings',
	templateUrl: './customer-settings.component.html',
})
export class CustomerSettingsComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject<void>(); // TODO: Add autounsubcribe
	currentUser$: Observable<IUser>;

	constructor(
		private _snackBar: MatSnackBar,
		private appViewService: AppViewService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.currentUser$ = this.appViewService.getCurrentUser();
	}

	onSubmit(formData: IUser) {
		this.userService
			.updateUser(formData)
			.pipe(takeUntil(this._destroy$))
			.subscribe((user: IUser) => {
				this._snackBar.open('Данные успешно изменены', null, {
					duration: 2000,
					verticalPosition: 'top',
				});
			});
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
