import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';

import { CatalogLayoutComponent } from './views/layout/catalog-layout/catalog-layout.component';
import { CatalogFilterComponent } from './views/layout/navigation/filters.component';
import { ProductListComponent } from './views/components/products/list/list.component';
import { ProductItemComponent } from './views/components/products/list/item/item.component';
import { ProductSorterComponent } from './views/components/products/sorter/sorter.component';
import { ProductListToolbarComponent } from './views/components/products/toolbar/toolbar.component';

@NgModule({
	declarations: [
		CatalogLayoutComponent,
		CatalogFilterComponent,
		ProductListComponent,
		ProductItemComponent,
		ProductSorterComponent,
		ProductListToolbarComponent,
	],
	imports: [SharedModule, CatalogRoutingModule],
	exports: [],
	providers: [],
})
export class CatalogModule {}
