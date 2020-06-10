import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { IUser } from '../models/user.interfaces';

@Injectable()
export class UserService {
	private currentUserSubject = new BehaviorSubject<IUser>(null);
	public currentUser$ = this.currentUserSubject
		.asObservable()
		.pipe(distinctUntilChanged());

	constructor(private http: HttpClient) {}

	getUser(): Observable<IUser> {
		return this.http.get('/api/user/me').pipe(
			map(({ data }: any) => {
				this.setUser(data);
				return data;
			})
		);
	}

	updateUser(user): Observable<IUser> {
		return this.http.post('/api/user/me', user).pipe(
			map(({ data }: any) => {
				this.setUser(data);
				return data;
			})
		);
	}

	setUser(user: IUser): void {
		this.currentUserSubject.next(user);
	}
}
