import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'base-form',
	template: '',
})
export class FormComponent {
	form: FormGroup;
	formGeneralErrors: ArrayLike<[]> = [];
	private formSubmitAttempt: boolean;

	constructor(protected formBuilder: FormBuilder) {}

	hasError(field: string, error: string) {
		const control = this.form.get(field);
		return control.dirty && control.hasError(error);
	}

	isFieldInvalid(field: string) {
		return (
			(!this.form.get(field).valid && this.form.get(field).touched) ||
			(this.form.get(field).untouched && this.formSubmitAttempt)
		);
	}

	markAllAsDirty() {
		for (const control of Object.keys(this.form.controls)) {
			this.form.controls[control].markAsDirty();
		}
	}
}
