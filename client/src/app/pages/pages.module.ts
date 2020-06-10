import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [HomeComponent, Error404Component],
})
export class PagesModule {}
