import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from 'src/app/core/models/user.interfaces';
import { AppViewService } from 'src/app/core/services/app-view.service';

@Component({
	selector: 'customer-sidebar',
	templateUrl: './sidebar.component.html',
	host: {
		class:
			'ke-box ke-box_margin-tb_xxl ke-box_margin-right_xl ke-box_padding-top_s',
	},
})
export class CustomerSidebarComponent {
	currentUser$: Observable<IUser>;

	constructor(private appViewService: AppViewService) {}

	ngOnInit() {
		this.currentUser$ = this.appViewService.getCurrentUser();
	}
}
