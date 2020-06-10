import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppPager } from './components/pager/pager.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	exports: [
		CommonModule,
		RouterModule,
		AppPager,
		ListComponent,
		FormComponent,
	],
	declarations: [AppPager, ListComponent, FormComponent],
})
export class SharedModule {}
