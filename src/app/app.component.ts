import { Component } from '@angular/core';
import { SoundComponent } from './sound.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	title = 'My Brailler';
	isFreeTyping: boolean = false;
	isExercise: boolean = false;

	constructor() {
	}
	selectMode(type) {
		if(type === 'freeTyping') {
			this.isFreeTyping = true;
			this.isExercise = false;
		}
		else if(type === 'exercise') {
			this.isExercise = true;
			this.isFreeTyping = false;
		}
	}
}