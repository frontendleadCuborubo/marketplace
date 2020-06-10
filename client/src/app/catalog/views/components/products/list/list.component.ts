import { Component } from '@angular/core';
import { ListComponent } from 'src/app/shared/components/list/list.component';

@Component({
	selector: 'product-list',
	templateUrl: './list.component.html',
})
export class ProductListComponent extends ListComponent {}
