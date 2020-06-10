import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-header-droppdown-menu',
	templateUrl: './header-dropdown-menu.component.html',
})
export class AppHeaderDropdownMenuComponent {
	@Input() currentUser;
}
