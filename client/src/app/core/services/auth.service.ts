import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { UserService } from './user.service';

export interface SimpleLoginInput {
	email: string;
	password: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private isLoggedInSubject = new ReplaySubject<boolean>(1);
	isLoggedIn$ = this.isLoggedInSubject.asObservable();

	constructor(private http: HttpClient, private userService: UserService) {
		this.isLoggedIn$ = this.userService.currentUser$.pipe(
			map((user) => !!user)
		);
	}

	login(formData: SimpleLoginInput) {
		return this.http.post('/api/auth/login', formData).pipe(
			tap(() => this.setAuth(true)),
			catchError(this.handleError)
		);
	}

	logout() {
		return this.http
			.post('/api/auth/logout', {})
			.pipe(tap(() => this.userService.setUser(null)))
			.toPromise();
	}

	setAuth(isLoggedIn: boolean): void {
		this.isLoggedInSubject.next(isLoggedIn);
	}

	private handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}
