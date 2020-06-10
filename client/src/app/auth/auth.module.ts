import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ErrorStateMatcher } from '@angular/material/core';
import { FormErrorStateMatcher } from '../shared/components/form/utils/error-state.matcher';

import { LoginComponent } from './views/components/login/login.component';
import { LogoutComponent } from './views/components/logout/logout.component';

@NgModule({
	imports: [SharedModule, ReactiveFormsModule],
	declarations: [LoginComponent, LogoutComponent],
	providers: [
		{ provide: ErrorStateMatcher, useClass: FormErrorStateMatcher },
	],
})
export class AuthModule {}
