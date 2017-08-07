import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { WindowRef } from './windowRef';
import * as patterns from './lego-mock';

@Component({
	selector: 'sound',
	template: '<h2>Sound</h2>'
})

export class SoundComponent {

	// title = 'Brailler 2.0';
	items;
	counter = 0;
	maxCounter;
	map;
	say;

	keyCount = 0;
	isRightKey = false;
	audio;

	//Experimental: audio
	audioCtx;
	oscillator;
	volume;

	constructor(private winRef: WindowRef) {
		this.items = patterns.legos.first;
		this.maxCounter = this.items.length;
		this.say = new winRef.nativeWindow.SpeechSynthesisUtterance();
		this.audioCtx = new (winRef.nativeWindow.AudioContext || winRef.nativeWindow.webkitAudioContext)();
		this.items[0].pointer = true;
		console.log(this.maxCounter);
	}

	saveKeyCode(x) {
		if(this.map[70]) {
			this.items[x].dot1 = true;
			this.items[x].test = true;
			this.map[70] = false;
		}
		if(this.map[68]) {
			this.items[x].dot2 = true;
			this.items[x].test = true;
			this.map[68] = false;
		}
		if(this.map[83]) {
			this.items[x].dot3 = true;
			this.items[x].test = true;
			this.map[83] = false;
		}
		if(this.map[74]) {
			this.items[x].dot4 = true;
			this.items[x].test = true;
			this.map[74] = false;
		}
		if(this.map[75]) {
			this.items[x].dot5 = true;
			this.items[x].test = true;
			this.map[75] = false;
		}
		if(this.map[76]) {
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
				this.clearBlock(i);
			}
			this.counter = 0;
			this.isNum = false;
			// this.numSignCount = 0;
		}
	}

	clearBlock(x) {
		this.items[x].dot1 = this.items[x].dot2 = this.items[x].dot3 = this.items[x].dot4 = this.items[x].dot5 = this.items[x].dot6 = false;
		this.items[x].text = '';
	}

	playAudio(freq, vol, duration) {
		//create the volume node;
		this.volume = this.audioCtx.createGain();
		this.volume.connect(this.audioCtx.destination);
		this.volume.gain.value = vol;

		//connect the oscillator to the nodes
		this.oscillator = this.audioCtx.createOscillator();
		this.oscillator.type = 'sawtooth';
		this.oscillator.frequency.value = freq;

		this.oscillator.connect(this.volume);
		this.oscillator.start();
		this.oscillator.stop(this.audioCtx.currentTime + duration);
	}

	isNum: boolean = false;
	// isLetter: boolean = true;
	numSignCount: number = 0;
	numCancelCount: number = 0;

	saveNumber(x) {
		//Num initiator
		if(!this.isNum) {
			if(this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot2)) {
				this.items[x].text = '#';
				this.say.text = 'numbers';
				this.isRightKey = true;
				this.isNum = true;
			}
		}
		//Num canceller
		if(this.isNum) {
			if(this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4)) {
				this.items[x].text = 'alphabet';
				this.isRightKey = true;
				this.isNum = false;
			}
		}

		if(this.isNum) {
			if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '0';
			}
			if(this.items[x].dot1 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '1';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '2';
			}
			if(this.items[x].dot1 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '3';
			}
			if(this.items[x].dot1 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 ||this.items[x].dot6)) {
				this.items[x].text = this.say.text = '4';
			}
			if(this.items[x].dot1 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '5';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '6';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '7';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '8';
			}
			if(this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '9';
			}
		}
	}

	saveSound(x) {
			if(this.items[x].dot1 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'a';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'b';
			}
			if(this.items[x].dot1 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'c';
			}
			if(this.items[x].dot1 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 ||this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'd';
			}
			if(this.items[x].dot1 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'e';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'f';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'g';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'h';
			}
			if(this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'i';
			}
			if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'j';
			}
			if(this.items[x].dot1 && this.items[x].dot3 && !(this.items[x].dot2 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'k';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && !(this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'l';
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'm';
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'n';
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot4 ||  this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'o';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'p';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !this.items[x].dot6) {
				this.items[x].text = this.say.text = 'q';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot5 && !(this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'r';
			}
			if(this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 's';
			}
			if(this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 't';
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot4 || this.items[x].dot5)) {
				this.items[x].text = this.say.text = 'u';
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot6 && !(this.items[x].dot4 || this.items[x].dot5)) {
				this.items[x].text = this.say.text = 'v';
			}
			if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot3)) {
				this.items[x].text = this.say.text = 'w';
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot5)) {
				this.items[x].text = this.say.text = 'x';
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !this.items[x].dot2) {
				this.items[x].text = this.say.text = 'y';
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot4)) {
				this.items[x].text = this.say.text = 'z';
			}
		this.isRightKey = true;
		if(this.say.text == '') {
			this.isRightKey = false;
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
		this.saveNumber(this.counter);
		if(this.isRightKey) {
			if(this.winRef.nativeWindow.speechSynthesis.speaking) {
				this.winRef.nativeWindow.speechSynthesis.cancel();
			}
			this.winRef.nativeWindow.speechSynthesis.speak(this.say);
			this.say.text = '';
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
			return;
		}
		if(this.isRightKey === false) {
			console.log('Falsy key pressed');
			this.clearBlock(this.counter);
			this.checkCounter();
		}
		//Space key
		if(this.map[32]) {
			this.playAudio(600, .15, .06);
			this.items[this.counter].text = ' ';
			this.addCounter(1);
			this.checkCounter();
			
			if(this.isNum) {
				this.items[this.counter].wasNum = true;
				this.isNum = false;
			}
			else if(!this.isNum){
				this.items[this.counter].wasNum = false;
			}

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
			
		}
		//Delete key
		if(this.map[8]) {

			if(this.counter !== 0) {
				let self = this.counter - 1;

				//When numSign is erased
				if(this.items[self].text === '#') {
					this.isNum = false;
				}

				//When numCanceller is erased
				if(this.items[self].text === 'alphabet') {
					this.isNum = true;
				}

				//When space is erased
				if(this.items[self].text === ' ') {
					this.isNum = false;
					if(this.items[this.counter].wasNum) {
						this.isNum = true;
					}
				}

				this.items[this.counter].pointer = false;
				this.items[this.counter - 1].pointer = true;
				this.counter--;
				this.clearBlock(this.counter);
				this.playAudio(300, .15, .06);
				this.items[this.counter].text = '';
			}
		}
	}
}