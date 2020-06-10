import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SessionService } from './services/session.service';
import { AppViewService } from './services/app-view.service';

import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import { appInitializer } from './app.initialization';

@NgModule({
	declarations: [],
	imports: [HttpClientModule],
	exports: [HttpClientModule],
	providers: [
		SessionService,
		AuthGuard,
		AppViewService,
		UserService,
		CategoryService,
		ProductService,
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
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true,
		},
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
