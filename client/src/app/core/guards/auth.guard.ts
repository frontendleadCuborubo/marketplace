import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.checkLogin(state);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate(route, state);
	}

	checkLogin(state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.authService.isLoggedIn$.pipe(
			map((isLoggedIn) => {
				if (isLoggedIn) {
					return true;
				}

				this.authService
					.logout()
					.then(() => this.router.navigate(['auth/login']));
				return false;
			})
		);
	}
}
