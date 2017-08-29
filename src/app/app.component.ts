import { Component } from '@angular/core';
import { FreeTypingComponent } from './free-typing.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	
	title = 'My Brailler';
	isFreeTyping: boolean = false;
	isExercise: boolean = true;
	constructor() {
	}
}