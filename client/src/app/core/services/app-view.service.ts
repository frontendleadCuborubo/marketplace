import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { IUser } from 'src/app/core/models/user.interfaces';

@Injectable({
	providedIn: 'root',
})
export class AppViewService {
	private readonly currentUser$: Observable<IUser>;

	constructor(private userService: UserService) {
		this.currentUser$ = this.userService.currentUser$;
	}

	getCurrentUser(): Observable<IUser> {
		return this.currentUser$;
	}
}
