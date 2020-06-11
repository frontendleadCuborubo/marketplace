import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';

import {
	AuthService,
	SimpleLoginInput,
} from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';

@Component({
	selector: 'auth-login',
	templateUrl: './login.component.html',
})
export class LoginComponent extends FormComponent implements OnDestroy {
	private _destroy$ = new Subject<void>(); // TODO: Add autounsubcribe

	constructor(
		protected formBuilder: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private userServie: UserService
	) {
		super(formBuilder);
		this.form = this.formBuilder.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		});
	}

	handleSubmit(formData: SimpleLoginInput) {
		if (!this.form.valid) {
			this.markAllAsDirty();
			return;
		}

		this.authService
			.login(formData)
			.pipe(
				switchMap(() =>
					this.userServie
						.getUser()
						.pipe(tap(() => this.router.navigate(['my/settings'])))
				),
				takeUntil(this._destroy$)
			)
			.subscribe({
				error: ({ error }) => {
					const { errors } = error;
					this.formGeneralErrors = errors;
				},
			});
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
