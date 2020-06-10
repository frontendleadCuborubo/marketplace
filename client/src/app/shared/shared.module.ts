import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './components/material/material.module';

import { AppPager } from './components/pager/pager.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	exports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		AppPager,
		ListComponent,
		FormComponent,
	],
	declarations: [AppPager, ListComponent, FormComponent],
})
export class SharedModule {}
