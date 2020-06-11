import {
	TestBed,
	ComponentFixture,
	async,
	fakeAsync,
} from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

const apiSuccessResponse = {
	success: true,
	data: {},
};

const user = {
	_id: '5ed261e8e2b6745bc90f1be8',
	email: 'b@q.com',
	about: 'Пишу о себе',
	addressRegion: '194003000',
	firstname: 'Vach',
	gender: 'M',
	lastname: 'Андреев',
	phone: '+380970000000',
};

const loginFormValidInput = {
	email: 'b@q.com',
	password: '123456',
};

const loginFormInvalidInput = {
	email: '',
	password: '',
};

let userService: UserService;
class UserServiceStub {
	getUser() {
		return of();
	}
}

let authService: AuthService;
class AuthServiceStub {
	login(formData) {
		return of(apiSuccessResponse);
	}
}

describe('LoginComponent', () => {
	let component: LoginComponent;
	let router: Router;
	let fixture: ComponentFixture<LoginComponent>;
	let el: DebugElement;
	let submitBtn: ElementRef;

	const updateForm = (email, password) => {
		component.form.controls['email'].setValue(email);
		component.form.controls['password'].setValue(password);
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule,
				BrowserAnimationsModule,
				AuthModule,
			],
			providers: [
				{ provide: Router, useValue: routerSpy },
				{ provide: AuthService, useClass: AuthServiceStub },
				{ provide: UserService, useClass: UserServiceStub },
			],
		})
			.compileComponents()
			.then(() => {
				router = TestBed.get(Router);
				fixture = TestBed.createComponent(LoginComponent);
				component = fixture.componentInstance;
				el = fixture.debugElement;
				submitBtn = el.query(By.css('button[type="submit"]'));

				authService = TestBed.get(AuthService);
				userService = TestBed.get(UserService);

				fixture.detectChanges();
			});
	}));

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should form initial state', () => {
		expect(component.form).toBeDefined();
		expect(component.form.invalid).toBeTruthy();
		expect(component.formGeneralErrors).toEqual([]);
	});

	it('form value should update from when u change the input', () => {
		updateForm(loginFormValidInput.email, loginFormValidInput.password);
		expect(component.form.value).toEqual(loginFormValidInput);
	});

	it('form invalid should be true when form is invalid', () => {
		updateForm(loginFormInvalidInput.email, loginFormInvalidInput.password);
		expect(component.form.invalid).toBeTruthy();
	});

	it('created a form with email, password input and login button', () => {
		const compiled = el.nativeElement;
		const emailField = compiled.querySelector('.field-email');
		const passwordField = compiled.querySelector('.field-password');

		expect(submitBtn).toBeTruthy();
		expect(emailField).toBeTruthy();
		expect(passwordField).toBeTruthy();
	});

	it('Display Email Error Msg when Email is blank', () => {
		fillFormAndClickSubmit(loginFormInvalidInput);

		const emailErrorMsg = el.nativeElement.querySelector(
			'.field-email .mat-error'
		);
		expect(emailErrorMsg).toBeDefined();
		expect(emailErrorMsg.innerHTML).toContain('Это обязательное поле');
	});

	it('Display Password Error Msg when Password is blank', () => {
		fillFormAndClickSubmit(loginFormInvalidInput);

		const passwordErrorMsg = el.nativeElement.querySelector(
			'.field-password .mat-error'
		);
		expect(passwordErrorMsg).toBeDefined();
		expect(passwordErrorMsg.innerHTML).toContain('Это обязательное поле');
	});

	it('Display Both Email & Password Error Msg when both field is blank', () => {
		fillFormAndClickSubmit(loginFormInvalidInput);

		const emailErrorMsg = el.nativeElement.querySelector(
			'.field-email .mat-error'
		);
		const passwordErrorMsg = el.nativeElement.querySelector(
			'.field-password .mat-error'
		);

		expect(emailErrorMsg).toBeDefined();
		expect(emailErrorMsg.innerHTML).toContain('Это обязательное поле');

		expect(passwordErrorMsg).toBeDefined();
		expect(passwordErrorMsg.innerHTML).toContain('Это обязательное поле');
	});

	it('should called AuthService login()', fakeAsync(() => {
		fillFormAndClickSubmit(loginFormValidInput);
		advance(fixture);

		spyOn(authService, 'login').and.callThrough();

		component.handleSubmit(loginFormValidInput);
		advance(fixture);

		expect(authService.login).toHaveBeenCalled();
	}));

	it('should called UserService getUser() if AuthService login() return success', fakeAsync(() => {
		fillFormAndClickSubmit(loginFormValidInput);
		advance(fixture);

		spyOn(authService, 'login').and.returnValue(of(apiSuccessResponse));
		spyOn(userService, 'getUser').and.callThrough();

		component.handleSubmit(loginFormValidInput);
		advance(fixture);

		expect(authService.login).toHaveBeenCalled();
		expect(userService.getUser).toHaveBeenCalled();
	}));

	it('should navigate to user settings if login and getUser successfully', fakeAsync(() => {
		fillFormAndClickSubmit(loginFormValidInput);
		advance(fixture);

		spyOn(authService, 'login').and.returnValue(of(apiSuccessResponse));
		spyOn(userService, 'getUser').and.returnValue(of(user));

		component.handleSubmit(loginFormValidInput);
		advance(fixture);

		expect(authService.login).toHaveBeenCalled();
		expect(userService.getUser).toHaveBeenCalled();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['my/settings']);
		const navArgs = routerSpy.navigate.calls.first().args[0];
		expect(navArgs).toEqual(['my/settings'], 'should nav to User settings');
	}));

	function fillFormAndClickSubmit(data) {
		updateForm(data.email, data.password);
		fixture.detectChanges();
		submitBtn.nativeElement.click();
		fixture.detectChanges();
	}

	function advance(f: ComponentFixture<any>) {
		// tick();
		f.detectChanges();
	}
});
