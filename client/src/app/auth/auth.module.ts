import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyyErrorStateMatcher } from '../shared/components/form/utils/error-state.matcher';

import { LoginComponent } from './views/components/login/login.component';
import { LogoutComponent } from './views/components/logout/logout.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
	],
	declarations: [LoginComponent, LogoutComponent],
	providers: [{ provide: ErrorStateMatcher, useClass: MyyErrorStateMatcher }],
})
export class AuthModule {}
