import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit,
	ChangeDetectionStrategy,
} from '@angular/core';
// @ts-ignore
import stateList from 'src/config/locations.json';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { GENDERS_OPTIONS, GenderOptions } from 'src/app/core/constants/gender';
import { SettingsForm } from './settings-form-value.types';

@Component({
	selector: 'customer-settings-form',
	templateUrl: './settings-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSettingsFormComponent implements OnInit {
	form: FormGroup;
	readonly genderOptions: GenderOptions[] = GENDERS_OPTIONS;
	readonly addressOptions = stateList;
	@Input() formData: SettingsForm;
	@Output() formSubmit = new EventEmitter();

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.createForm();
		this.form.patchValue(this.toFormValue(this.formData));
	}

	private createForm() {
		this.form = this.formBuilder.group({
			username: new FormControl('', []),
			firstname: new FormControl('', []),
			lastname: new FormControl('', []),
			addressRegion: new FormControl('', []),
			gender: new FormControl('', []),
			about: new FormControl('', []),
		});
	}

	private toFormValue(data): SettingsForm {
		return {
			username: data.username || 'id493280',
			firstname: data.firstname || '',
			lastname: data.lastname || '',
			addressRegion: data.addressRegion || '',
			gender: data.gender || '',
			about: data.about || '',
		};
	}

	handleSubmit(formData) {
		if (this.form.invalid) {
			return;
		}
		this.formSubmit.emit(formData);
	}
}
