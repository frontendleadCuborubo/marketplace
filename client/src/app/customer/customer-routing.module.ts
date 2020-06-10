import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerLayoutComponent } from './views/layout/customer-layout/customer-layout.component';
import { CustomerContentComponent } from './views/layout/content/customer-content.component';

import { CustomerReviewsComponent } from './views/components/reviews/reviews.component';
import { CustomerFavouritesComponent } from './views/components/favourites/favourites.component';
import { CustomerSettingsComponent } from './views/components/settings/customer-settings/customer-settings.component';
import { CustomerContactInfoComponent } from './views/components/settings/contact-info/contact-info.component';
import { CustomerOrdersComponent } from './views/components/orders/orders.component';
import { CustomerProductsComponent } from './views/components/products/products.component';

const routes: Routes = [
	{
		path: '',
		component: CustomerLayoutComponent,
		children: [
			{
				path: 'products',
				component: CustomerContentComponent,
				data: {
					title: 'Мои объявления',
					menu: [
						{ path: '/my/products', title: 'Активные' },
						{ path: '/my/products', title: 'Модерация' },
						{ path: '/my/products', title: 'Деактивированные' },
						{ path: '/my/products', title: 'Проданные' },
					],
				},
				children: [
					{
						path: '',
						component: CustomerProductsComponent,
					},
				],
			},
			{
				path: 'orders',
				component: CustomerContentComponent,
				data: {
					title: 'Заказы',
					menu: [
						{ path: '/my/orders', title: 'Продаю' },
						{ path: '/my/orders', title: 'Покупаю' },
					],
				},
				children: [
					{
						path: '',
						component: CustomerOrdersComponent,
					},
				],
			},
			{
				path: 'reviews',
				component: CustomerReviewsComponent,
			},
			{
				path: 'favourites',
				component: CustomerContentComponent,
				data: {
					title: 'Избранное',
					menu: [{ path: '/my/favourites', title: 'Объявления' }],
				},
				children: [
					{
						path: '',
						component: CustomerFavouritesComponent,
					},
				],
			},
			{
				path: 'settings',
				component: CustomerContentComponent,
				data: {
					title: 'Настройки профиля',
					menu: [
						{ path: '/my/settings', title: 'Основная инфррмация' },
						{
							path: '/my/settings/contact-info',
							title: 'Контактная инфррмация',
						},
					],
				},
				children: [
					{
						path: '',
						component: CustomerSettingsComponent,
					},
					{
						path: 'contact-info',
						component: CustomerContactInfoComponent,
					},
				],
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CustomerRoutingModule {}
