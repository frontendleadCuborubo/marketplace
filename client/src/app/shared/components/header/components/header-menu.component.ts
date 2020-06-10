import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-header-menu',
	templateUrl: './header-menu.component.html',
})
export class AppHeaderMenuComponent {
	@Input() currentUser;
}
