import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class FormErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl,
		form: FormGroupDirective | NgForm
	): boolean {
		// const isSubmitted = form && form.submitted;
		return !!(
			(control && control.invalid && control.dirty) //  && (control.dirty || control.touched) || isSubmitted
		);
	}
}
