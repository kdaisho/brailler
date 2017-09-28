import { Component } from '@angular/core';
import { WindowRef } from './windowRef';
import { Router, NavigationEnd } from '@angular/router';

import { HomeComponent } from './home.component';
import { HostListener } from '@angular/core';

declare let ga: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	
	title = 'My Brailler';

	constructor(private winRef: WindowRef, public router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				ga('set', 'page', event.urlAfterRedirects);
				ga('send', 'pageview');
			}
		});
	}
}