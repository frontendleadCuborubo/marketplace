import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private router: Router) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap(
				() => {},
				(err: any) => {
					// if (err instanceof HttpErrorResponse) {
					// 	if (err.status !== 401) {
					// 		return;
					// 	}
					// 	this.router.navigate(['auth/login']);
					// }
				}
			)
		);
	}
}
