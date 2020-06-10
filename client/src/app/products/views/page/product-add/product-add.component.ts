import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'product-add-page',
	templateUrl: './product-add.component.html',
})
export class ProductAddPageComponent {
	form: FormGroup;
	isLoggedIn$: Observable<boolean>;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
		this.createForm();
	}

	private createForm() {
		this.form = this.formBuilder.group({
			title: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required]),
			price: new FormControl('', [Validators.required]),
			userName: new FormControl('', [Validators.required]),
			userPhone: new FormControl('', [Validators.required]),
			userLocation: new FormControl('', [Validators.required]),
		});
	}

	handleSubmit(formValues) {
		console.log(formValues);
	}
}
