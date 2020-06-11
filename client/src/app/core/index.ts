import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';

import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import { appInitializer } from './app.initialization';

@NgModule({
	declarations: [],
	imports: [HttpClientModule],
	exports: [HttpClientModule],
	providers: [
		AuthGuard,
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializer,
			multi: true,
			deps: [UserService],
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpRequestInterceptor,
			multi: true,
		},
		// TODO: Define what to do with 401 error when start app and when user try to fetch if token httpOnly cookie does not exists
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: HttpErrorInterceptor,
		// 	multi: true,
		// },
	],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only'
			);
		}
	}
}
