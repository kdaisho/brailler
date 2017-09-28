import { Component, Input} from '@angular/core';
import { HostListener } from '@angular/core';
// import { AppComponent } from './app.component';
import { SoundComponent } from './sound.component';
import * as patterns from './lego-mock';

@Component({
	selector: 'free-typing',
	templateUrl: './free-typing.component.html',
	styleUrls: ['./free-typing.component.css']
})

export class FreeTypingComponent {

	title = 'Free Typing';
	items;
	map;
	keydown: boolean = false;
	stroke: number = 0;

	constructor(private sound: SoundComponent) {

		this.sound.keyLock = false;
		this.items = patterns.legos;
		this.items[0].pointer = true;

		//Clear all when user comes from Exercise page
		this.sound.clearAll();
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		this.keydown = true;
		this.stroke = 0;
		if(!event.repeat) {
			this.map = [];
			this.map[event.keyCode] = event.type === 'keydown';
			this.stroke++;
			return;
		}
	}

	@HostListener('window:keyup', ['$event'])
	keyUpBrailler(event: KeyboardEvent) {
		this.stroke--;
		if(this.keydown === true && this.stroke === 0) {
			if(this.map[13]) {
				this.sound.clearAll();
			}
		}
	}
}