import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IProduct } from 'src/app/core/models/product.interfaces';
import { getPrice } from 'src/app/shared/components/util/catalog-utils';

@Component({
	selector: 'product-item',
	templateUrl: './item.component.html',
	host: {
		class: 'ke-grid__item b-catalog__item',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
	@Input() product: IProduct;

	getPrice(product, price) {
		return getPrice(product, price);
	}
}
