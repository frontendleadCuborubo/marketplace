import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProductAddPageComponent } from './products/views/page/product-add/product-add.component';
import { LoginComponent } from './auth/views/components/login/login.component';
import { LogoutComponent } from './auth/views/components/logout/logout.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'logout',
		component: LogoutComponent,
	},
	{
		path: 'auth/login',
		component: LoginComponent,
	},
	{
		path: 'new',
		component: ProductAddPageComponent,
	},
	{
		path: ':path',
		loadChildren: () =>
			import('src/app/catalog/catalog.module').then(
				(m) => m.CatalogModule
			),
	},
	{
		path: 'my',
		loadChildren: () =>
			import('src/app/customer/customer.module').then(
				(m) => m.CustomerModule
			),
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
	},
	{
		path: '**',
		component: Error404Component,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
