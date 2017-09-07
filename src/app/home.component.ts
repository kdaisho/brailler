import { Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent {

	title = 'my brailler';

	constructor(private sound: AppComponent) {
		//Disable user input on homepage
		sound.keyLock = true;
	}
}