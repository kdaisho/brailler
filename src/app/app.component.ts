import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { WindowRef } from './windowRef';
import * as patterns from './lego-mock';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	title = 'Brailler 2.0';
	items;
	counter = 0;
	maxCounter;
	map;
	say;

	keyUpCount = 0;
	keyCount = 0;
	isRightKey = false;

	rows = [1];

	constructor(private winRef: WindowRef) {
		this.items = patterns.legos.first;
		this.maxCounter = this.items.length;
		console.log(this.maxCounter);
		this.say = new winRef.nativeWindow.SpeechSynthesisUtterance();
		this.items[0].pointer = true;
	}

	allFalse(x) {
		console.log("all false fired " + x);
		this.items[x].dot1 = this.items[x].dot2 = this.items[x].dot3 = this.items[x].dot4 = this.items[x].dot5 = this.items[x].dot6 = false;
	}

	saveKeyCode(x) {
		if(this.map[70]) {
			this.items[x].active1 = true;
			this.items[x].dot1 = true;
			this.items[x].test = true;
			this.map[70] = false;
			// this.map[70] = this.map[68] = this.map[83] = this.map[74] = this.map[75] = this.map[76] = false;
		}
		if(this.map[68]) {
			this.items[x].active2 = true;
			this.items[x].dot2 = true;
			this.items[x].test = true;
			this.map[68] = false;
			// this.map[70] = this.map[68] = this.map[83] = this.map[74] = this.map[75] = this.map[76] = false;
		}
		if(this.map[83]) {
			this.items[x].active3 = true;
			this.items[x].dot3 = true;
			this.items[x].test = true;
			this.map[83] = false;
			// this.map[70] = this.map[68] = this.map[83] = this.map[74] = this.map[75] = this.map[76] = false;
		}
		if(this.map[74]) {
			this.items[x].active4 = true;
			this.items[x].dot4 = true;
			this.items[x].test = true;
			this.map[74] = false;
			// this.map[70] = this.map[68] = this.map[83] = this.map[74] = this.map[75] = this.map[76] = false;
		}
		if(this.map[75]) {
			this.items[x].active5 = true;
			this.items[x].dot5 = true;
			this.items[x].test = true;
			this.map[75] = false;
			// this.map[70] = this.map[68] = this.map[83] = this.map[74] = this.map[75] = this.map[76] = false;
		}
		if(this.map[76]) {
			this.items[x].active6 = true;
			this.items[x].dot6 = true;
			this.items[x].test = true;
			this.map[76] = false;
			// this.map[70] = this.map[68] = this.map[83] = this.map[74] = this.map[75] = this.map[76] = false;
		}
		if(!(this.map[70] || this.map[68] || this.map[83] || this.map[74] || this.map[75] || this.map[76])) {
			console.log("nothing should work");
			this.map[70] = this.map[68] = this.map[83] = this.map[74] = this.map[75] = this.map[76] = false;
			// this.items[x].dot1 = this.items[x].dot2 = this.items[x].dot3 = this.items[x].dot4 = this.items[x].dot5 = this.items[x].dot6 = false;
		}
	}
	
	addCounter(x) {
		return this.counter += x;
	}

	checkCounter() {
		if(this.counter >= this.maxCounter - 1) {
			for(var i = 0, len = this.counter; i <= len; i++) {
				this.clearDots(i);
			}
			this.counter = 0;
		}
	}

	clearDots(x) {
		console.log("clearDots fired");
		this.items[x].active1 = this.items[x].active2 = this.items[x].active3 = this.items[x].active4 = this.items[x].active5 = this.items[x].active6 = false;
		this.items[x].dot1 = this.items[x].dot2 = this.items[x].dot3 = this.items[x].dot4 = this.items[x].dot5 = this.items[x].dot6 = false;
	}

	saveSound(x) {
		if(!(this.items[x].dot1 || this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			console.log("everything down");
			return false;
		}

		if(this.items[x].dot1 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'a';
			// this.winRef.nativeWindow.speechSynthesis.speak(this.say);
			this.keyCount = 1;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'b';
			this.keyCount = 2;
			return this.isRightKey = true;
			// this.items[x].dot1 = this.items[x].dot2 = this.items[x].dot3 = this.items[x].dot4 = this.items[x].dot5 = this.items[x].dot6 = false;
			// this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'c';
			this.keyCount = 2;
			return this.isRightKey = true;
			// this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 ||this.items[x].dot6)) {
			this.say.text = 'd';
			// this.winRef.nativeWindow.speechSynthesis.speak(this.say);
			this.keyCount = 3;
			return this.isRightKey = true;
			// this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
			this.say.text = 'e';
			this.keyCount = 2;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'f';
			this.keyCount = 3;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot6)) {
			this.say.text = 'g';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
			this.say.text = 'h';
			this.keyCount = 3;
			return this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'i';
			this.keyCount = 2;
			return this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot6)) {
			this.say.text = 'j';
			this.keyCount = 3;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && !(this.items[x].dot2 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'k';
			this.keyCount = 2;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && !(this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'l';
			this.keyCount = 3;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'm';
			this.keyCount = 3;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot6)) {
			this.say.text = 'n';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot4 ||  this.items[x].dot6)) {
			this.say.text = 'o';
			this.keyCount = 3;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 'p';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !this.items[x].dot6) {
			this.say.text = 'q';
			this.keyCount = 5;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot5 && !(this.items[x].dot4 || this.items[x].dot6)) {
			this.say.text = 'r';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot5 || this.items[x].dot6)) {
			this.say.text = 's';
			this.keyCount = 3;
			return this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot6)) {
			this.say.text = 't';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot4 || this.items[x].dot5)) {
			this.say.text = 'u';
			this.keyCount = 3;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot6 && !(this.items[x].dot4 || this.items[x].dot5)) {
			this.say.text = 'v';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot3)) {
			this.say.text = 'w';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot5)) {
			this.say.text = 'x';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !this.items[x].dot2) {
			this.say.text = 'y';
			this.keyCount = 5;
			return this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot4)) {
			this.say.text = 'z';
			this.keyCount = 4;
			return this.isRightKey = true;
		}
		this.items[x].dot1 = this.items[x].dot2 = this.items[x].dot3 = this.items[x].dot4 = this.items[x].dot5 = this.items[x].dot6 = false;
		// if(!(this.items[x].dot1 || this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
		// 	this.isRightKey = false;
		// 	console.log("everything down");
		// }
		// this.keyCount = 0;
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		this.map = [];
		this.map[event.keyCode] = event.type == 'keydown';
		this.saveKeyCode(this.counter);
	}

	@HostListener('window:keyup', ['$event'])
	keyUpBrailler(event: KeyboardEvent) {
		this.map = [];
		this.map[event.keyCode] = event.type == 'keyup';
		this.saveSound(this.counter);
		this.keyUpCount++;
		if(this.isRightKey && (this.keyUpCount == this.keyCount)) {
			console.log("keyup happening");
			// this.winRef.nativeWindow.speechSynthesis.speak(this.say);
			// delete this.say.text;
			this.keyUpCount = 0;
			this.isRightKey = false;
			this.addCounter(1);
			this.allFalse(this.counter);
			this.checkCounter();
			// if((this.counter <= this.maxCounter - 1) && (this.counter != 0)) {
			if(this.counter != 0) {
				console.log("nonono");
				this.winRef.nativeWindow.speechSynthesis.speak(this.say);
				this.items[this.counter].pointer = true;
				this.items[this.counter - 1].pointer = false;
			}
			if(this.counter == 0) {
				console.log("hahaha");
				this.items[this.maxCounter - 2].pointer = false;
				this.items[0].pointer = true;
			}
			return;
		}
		if(this.isRightKey == false) {
			console.log('false key pressed');
			this.keyUpCount = 0;
			this.clearDots(this.counter);
			this.allFalse(this.counter);
			this.checkCounter();
		}
		if(this.map[32]) {
			this.isRightKey = false;
			this.addCounter(1);
			this.allFalse(this.counter);
			this.checkCounter();
			if((this.counter <= this.maxCounter - 1) && (this.counter != 0)) {
				this.items[this.counter].pointer = true;
				this.items[this.counter - 1].pointer = false;
				return;
			}
			if(this.counter == 0) {
				console.log("hahaha");
				this.items[this.maxCounter - 2].pointer = false;
				this.items[0].pointer = true;
				return;
			}
			this.keyUpCount = 0;
		}
		this.isRightKey = false;
		if(this.map[13]) {
		}
	}
}