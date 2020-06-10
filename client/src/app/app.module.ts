import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CoreModule } from './core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './shared/components/header/header.component';
import { AppHeaderDropdownMenuComponent } from './shared/components/header/components/header-dropdown-menu.component';
import { AppFooterComponent } from './shared/components/footer/footer.component';

import { ProductAddPageComponent } from './products/views/page/product-add/product-add.component';

@NgModule({
	declarations: [
		AppComponent,
		AppHeaderComponent,
		AppHeaderDropdownMenuComponent,
		AppFooterComponent,
		ProductAddPageComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormsModule,
		CoreModule,
		SharedModule,
		AppRoutingModule,
		PagesModule,
		AuthModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
