import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'auth-logout',
	template: '',
})
export class LogoutComponent {
	constructor(private router: Router, private authService: AuthService) {
		this.authService.logout().then(() => this.router.navigate(['/']));
	}
}
