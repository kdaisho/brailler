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
	audio;
	rows = [1];

	constructor(private winRef: WindowRef) {
		this.items = patterns.legos.first;
		this.maxCounter = this.items.length;
		this.say = new winRef.nativeWindow.SpeechSynthesisUtterance();
		this.items[0].pointer = true;
		console.log(this.maxCounter);
	}

	saveKeyCode(x) {
		if(this.map[70]) {
			this.items[x].active1 = true;
			this.items[x].dot1 = true;
			this.items[x].test = true;
			this.map[70] = false;
		}
		if(this.map[68]) {
			this.items[x].active2 = true;
			this.items[x].dot2 = true;
			this.items[x].test = true;
			this.map[68] = false;
		}
		if(this.map[83]) {
			this.items[x].active3 = true;
			this.items[x].dot3 = true;
			this.items[x].test = true;
			this.map[83] = false;
		}
		if(this.map[74]) {
			this.items[x].active4 = true;
			this.items[x].dot4 = true;
			this.items[x].test = true;
			this.map[74] = false;
		}
		if(this.map[75]) {
			this.items[x].active5 = true;
			this.items[x].dot5 = true;
			this.items[x].test = true;
			this.map[75] = false;
		}
		if(this.map[76]) {
			this.items[x].active6 = true;
			this.items[x].dot6 = true;
			this.items[x].test = true;
			this.map[76] = false;
		}
	}
	
	addCounter(x) {
		return this.counter += x;
	}

	checkCounter() {
		if(this.counter >= this.maxCounter - 1) {
			for(var i = 0, len = this.counter; i <= len; i++) {
				this.clearRow(i);
			}
			this.counter = 0;
		}
	}

	clearRow(x) {
		this.items[x].active1 = this.items[x].active2 = this.items[x].active3 = this.items[x].active4 = this.items[x].active5 = this.items[x].active6 = false;
		this.items[x].dot1 = this.items[x].dot2 = this.items[x].dot3 = this.items[x].dot4 = this.items[x].dot5 = this.items[x].dot6 = false;
		this.items[x].text = '';
	}

	playAudio(volume) {
		this.audio = new Audio();
		this.audio.src = "assets/sound/typewriter.mp3";
		this.audio.volume = volume;
		this.audio.play();
	}

	saveSound(x) {
		if(this.items[x].dot1 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'a';
			this.keyCount = 1;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'b';
			this.keyCount = 2;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'c';
			this.keyCount = 2;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 ||this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'd';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'e';
			this.keyCount = 2;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'f';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'g';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'h';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'i';
			this.keyCount = 2;
			this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'j';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && !(this.items[x].dot2 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'k';
			this.keyCount = 2;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && !(this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'l';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'm';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'n';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot4 ||  this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'o';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'p';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !this.items[x].dot6) {
			this.items[x].text = this.say.text = 'q';
			this.keyCount = 5;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot5 && !(this.items[x].dot4 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 'r';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot5 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 's';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot6)) {
			this.items[x].text = this.say.text = 't';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot4 || this.items[x].dot5)) {
			this.items[x].text = this.say.text = 'u';
			this.keyCount = 3;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot6 && !(this.items[x].dot4 || this.items[x].dot5)) {
			this.items[x].text = this.say.text = 'v';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot3)) {
			this.items[x].text = this.say.text = 'w';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot5)) {
			this.items[x].text = this.say.text = 'x';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !this.items[x].dot2) {
			this.items[x].text = this.say.text = 'y';
			this.keyCount = 5;
			this.isRightKey = true;
		}
		if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot4)) {
			this.items[x].text = this.say.text = 'z';
			this.keyCount = 4;
			this.isRightKey = true;
		}
		//Issue: when 5 keys pressed then released one of them, you can press key for dot6 and it reads 'q' when you release everything.
		//This is a patch.
		if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6) {
			this.isRightKey = false;
		}
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		this.map = [];
		this.map[event.keyCode] = event.type === 'keydown';
		this.saveKeyCode(this.counter);
	}

	@HostListener('window:keyup', ['$event'])
	keyUpBrailler(event: KeyboardEvent) {
		this.map = [];
		this.map[event.keyCode] = event.type === 'keyup';
		this.saveSound(this.counter);
		this.keyUpCount++;
		if(this.isRightKey && (this.keyUpCount === this.keyCount)) {
			if(this.winRef.nativeWindow.speechSynthesis.speaking) {
				this.winRef.nativeWindow.speechSynthesis.cancel();
			}
			this.winRef.nativeWindow.speechSynthesis.speak(this.say);
			this.keyUpCount = 0;
			this.isRightKey = false;
			this.addCounter(1);
			this.checkCounter();
			if(this.counter !== 0) {
				this.items[this.counter].pointer = true;
				this.items[this.counter - 1].pointer = false;
			}
			if(this.counter === 0) {
				this.items[this.maxCounter - 2].pointer = false;
				this.items[0].pointer = true;
			}
			this.playAudio(.15);
			return;
		}
		if(this.isRightKey === false) {
			console.log('false key pressed');
			this.keyUpCount = 0;
			this.clearRow(this.counter);
			this.checkCounter();
		}
		if(this.map[32]) {
			this.isRightKey = false;
			this.addCounter(1);
			this.checkCounter();
			this.playAudio(.3);
			if((this.counter <= this.maxCounter - 1) && (this.counter != 0)) {
				this.items[this.counter].pointer = true;
				this.items[this.counter - 1].pointer = false;
				return;
			}
			if(this.counter === 0) {
				this.items[this.maxCounter - 2].pointer = false;
				this.items[0].pointer = true;
				return;
			}
			this.keyUpCount = 0;
		}
		if(this.map[8]) {
			if(this.counter !== 0) {
				this.items[this.counter].pointer = false;
				this.items[this.counter - 1].pointer = true;
				this.counter--;
				this.clearRow(this.counter);
				this.playAudio(.3);
				this.items[this.counter].text = '';
			}
		}
	}
}