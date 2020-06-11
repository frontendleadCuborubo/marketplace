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
		this.createForm(this.formData);
	}

	private createForm(data) {
		this.form = this.formBuilder.group({
			username: new FormControl(data.username || 'id493280', []),
			firstname: new FormControl(data.firstname || '', []),
			lastname: new FormControl(data.lastname || '', []),
			addressRegion: new FormControl(data.addressRegion || '', []),
			gender: new FormControl(data.gender || '', []),
			about: new FormControl(data.about || '', []),
		});
	}

	handleSubmit(formData) {
		if (this.form.invalid) {
			return;
		}
		this.formSubmit.emit(formData);
	}
}
