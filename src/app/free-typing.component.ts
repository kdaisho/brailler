import { Component, Input} from '@angular/core';
import { HostListener } from '@angular/core';
// import { SoundComponent } from './sound.component';
import { AppComponent } from './app.component';
import * as patterns from './lego-mock';

@Component({
	selector: 'free-typing',
	templateUrl: './free-typing.component.html',
	styleUrls: ['./free-typing.component.css']
})

export class FreeTypingComponent {
	// @Input() free;
	title = 'Free Typing';
	items;
	map;
	soundComponent;

	constructor(private sound: AppComponent) {

		this.soundComponent = sound;
		this.items = patterns.legos.first;
		this.items[0].pointer = true;

		//Clear all when user comes from Exercise page
		this.soundComponent.clearAll();
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		if(!event.repeat) {
			this.map = [];
			this.map[event.keyCode] = event.type === 'keydown';
			return;
		}
	}

	@HostListener('window:keyup', ['$event'])
	keyUpBrailler(event: KeyboardEvent) {
		if(this.map[13]) {
			this.soundComponent.clearAll();
		}
	}
}