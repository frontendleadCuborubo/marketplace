import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root',
})
export class JwtService {
	private readonly jwtHelper: JwtHelperService = new JwtHelperService();

	isTokenExpired(token): boolean {
		return this.jwtHelper.isTokenExpired(token);
	}
}
