import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import {
	AuthService,
	SimpleLoginInput,
} from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';

@Component({
	selector: 'auth-slogin',
	templateUrl: './login.component.html',
})
export class LoginComponent extends FormComponent implements OnInit, OnDestroy {
	authServiceSub: Subscription;

	constructor(
		protected formBuilder: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private userServie: UserService
	) {
		super(formBuilder);
	}

	ngOnInit() {
		this.createForm();
	}

	ngOnDestroy() {
		if (this.authServiceSub) {
			this.authServiceSub.unsubscribe();
		}
	}

	private createForm() {
		this.form = this.formBuilder.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		});
	}

	submit(formData: SimpleLoginInput) {
		if (!this.form.valid) {
			this.markAllAsDirty();
			return;
		}

		this.authServiceSub = this.authService
			.login(formData)
			.pipe(
				switchMap(() =>
					this.userServie
						.getUser()
						.pipe(tap(() => this.router.navigate(['my/settings'])))
				)
			)
			.subscribe({
				error: ({ error }) => {
					const { errors } = error;
					this.formGeneralErrors = errors;
				},
			});
	}
}
