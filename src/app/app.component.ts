import { Component } from '@angular/core';
import { WindowRef } from './windowRef';
import { HomeComponent } from './home.component';
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
	// pageType: boolean = false;
	pageType: string;
	// _window;

	constructor() {}
	// constructor(private winRef: WindowRef) {
	// 	this._window = winRef.nativeWindow;
	// 	console.log(this._window);
	// }

	selectMode(type) {
		// console.log('private ' + this._window);
		// this._window.location.reload();
		this.pageType = type;
		if(type === 'free') {
			this.isFreeTyping = true;
			this.isExercise = false;
		}
		else if(type === 'exer') {
			this.isExercise = true;
			this.isFreeTyping = false;
		}
		else if(type === 'home') {
			this.isExercise = this.isFreeTyping = false;
		}
	}
}