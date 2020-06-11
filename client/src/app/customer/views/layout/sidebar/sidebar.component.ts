import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from 'src/app/core/models/user.interfaces';
import { UserService } from 'src/app/core/services/user.service';

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

	constructor(private userService: UserService) {}

	ngOnInit() {
		this.currentUser$ = this.userService.currentUser$;
	}
}
