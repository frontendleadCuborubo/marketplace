import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppPagerConfig {
	disabled = false;
	boundaryLinks = false;
	directionLinks = true;
	ellipses = true;
	maxSize = 0;
	pageSize = 12;
}
