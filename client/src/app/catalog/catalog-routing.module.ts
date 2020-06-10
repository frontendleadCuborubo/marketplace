import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogLayoutComponent } from './views/layout/catalog-layout/catalog-layout.component';
import { ProductListComponent } from './views/components/products/list/list.component';

const routes: Routes = [
	{
		path: '',
		component: CatalogLayoutComponent,
		children: [
			{
				path: '',
				component: ProductListComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CatalogRoutingModule {}
