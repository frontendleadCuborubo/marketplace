import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	host: {
		class: 'Header ke-box',
	},
})
export class AppHeaderComponent {
	@Input() isLoggedIn;
	@Input() currentUser;
}
