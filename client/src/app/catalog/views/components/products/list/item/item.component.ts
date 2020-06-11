import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IProduct } from 'src/app/core/models/product.interfaces';
import { getPrice } from 'src/app/catalog/helper/catalog-data';

@Component({
	selector: 'product-item',
	templateUrl: './item.component.html',
	host: {
		class: 'ke-grid__item b-catalog__item',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
	public get price() {
		return getPrice(this.product, this.product.price);
	}
	@Input() product: IProduct;
}
