import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './core/services/auth.service';
import { IUser } from './core/models/user.interfaces';
import { UserService } from './core/services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	currentUser$: Observable<IUser>;
	isLoggedIn$: Observable<boolean>;

	constructor(
		private authService: AuthService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
		this.currentUser$ = this.userService.currentUser$;
	}
}
