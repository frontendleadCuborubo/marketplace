import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerLayoutComponent } from './views/layout/customer-layout/customer-layout.component';
import { CustomerContentComponent } from './views/layout/content/customer-content.component';
import { CustomerSidebarComponent } from './views/layout/sidebar/sidebar.component';

import { CustomerFavouritesComponent } from './views/components/favourites/favourites.component';
import { CustomerOrdersComponent } from './views/components/orders/orders.component';
import { CustomerProductsComponent } from './views/components/products/products.component';
import { CustomerReviewsComponent } from './views/components/reviews/reviews.component';
import { CustomerSettingsComponent } from './views/components/settings/customer-settings/customer-settings.component';
import { CustomerContactInfoComponent } from './views/components/settings/contact-info/contact-info.component';
import { CustomerSettingsFormComponent } from './views/components/settings/components/settings-form/settings-form.component';

@NgModule({
	declarations: [
		CustomerLayoutComponent,
		CustomerContentComponent,
		CustomerSidebarComponent,
		CustomerFavouritesComponent,
		CustomerOrdersComponent,
		CustomerProductsComponent,
		CustomerReviewsComponent,
		CustomerSettingsComponent,
		CustomerContactInfoComponent,
		CustomerSettingsFormComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		CustomerRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatSnackBarModule,
	],
	exports: [],
	providers: [],
})
export class CustomerModule {}
