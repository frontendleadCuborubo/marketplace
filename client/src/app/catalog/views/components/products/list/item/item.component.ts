import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IProduct } from 'src/app/core/models/product.interfaces';

// TODO: To utils
import { getCurrencySymbol } from 'src/app/core/constants/currencies';

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

	// TODO: To utils
	getPrice(product, price) {
		return price + ' ' + getCurrencySymbol(product.currency);
	}
}
