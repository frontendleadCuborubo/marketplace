import { Component } from '@angular/core';

@Component({
	selector: 'product-list-toolbar',
	template: '<ng-content></ng-content>',
	host: {
		class: 'ke-box ke-box_margin-top_xl',
	},
})
export class ProductListToolbarComponent {}
