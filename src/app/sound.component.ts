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
			this.numSignCount = 0;
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

	isNum: boolean;
	isNumKey: boolean = false;
	numSignCount: number = 0;
	// numCancelCount: boolean;
	isNumCancel: boolean = false;
	numCancelCount: number = 0;

	saveNumber(x) {
		//Num initiator
		// if(this.numSignCount === 0 && !this.isNum) {
		if(this.numSignCount <= 0) {
			if(this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot2)) {
				this.items[x].text = '#';
				this.say.text = 'numbers';
				this.isNum = true;
				this.isNumKey = true;
				this.isRightKey = true;


				this.numSignCount++;
			}
		}

		//Num canceller
		//Prevent this to be typed in a row
		let self;
		if(x !== 0) {
			self = x - 1;
		}
		else {
			self = x;
		}
		// let re = RegExp(/^[a-zA-Z]*$/);
		// console.log(re);

		// if((this.items[self].text !== 'alphabet') || (this.items[self].text == (0 || 1 || 2 || 3|| 4||5||6||7||8||9))) {
		if((this.items[self].text !== 'alphabet') && this.isNum) {
		// if((this.items[self].text !== 'alphabet') && (this.items[self].text != re)) {
		// if(this.items[self].text !== 'alphabet') {
			if(this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4)) {
				this.items[x].text = 'alphabet';
				this.isRightKey = true;
				this.isNumCancel = true;
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
			console.log("WRONG KEY");
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
			if(this.isNum && this.isNumKey) {
				// this.numSignCount++;
				console.log("numSignCount when numKey pressed " + this.numSignCount);
				this.isNumKey = false;
			}
			console.log("numSignCount when released " + this.numSignCount);
			//NumCancel Keys released;
			let self = this.counter - 1;
			if(this.counter !== 0 && this.items[self].text === 'alphabet') {
				this.numSignCount--;
				console.log("numCancelCount: " + this.numCancelCount);
				if(this.numSignCount <= 0) {
					this.isNum = false;
					console.log("num is successfully cancelled");
				}
			}
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
			console.log('false key pressed');
			this.clearBlock(this.counter);
			this.checkCounter();
		}
		//Space key
		if(this.map[32]) {
			this.playAudio(600, .15, .06);
			this.items[this.counter].text = '!';
			this.addCounter(1);
			this.checkCounter();
			// this.items[this.counter].isSpace = true;

			// this.isNum = false;
			if(this.numSignCount >= 1) {
				this.numSignCount--;
				console.log("numSingCount subtracted by 1: " + this.numSignCount);
			}
			if(this.numSignCount <= 0) {
				console.log("Num completely cancelled by space key")
				this.isNum = false;
			}

			// this.isRightKey = false;
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
				if(this.numSignCount > 0 && this.items[self].text === '#') {
					console.log("self " + self);

					this.numSignCount--;
					console.log("Num -1");
					if(this.numSignCount === 0) {
						this.isNum = false;
						console.log("Num cancelled!");
					}

				}
				//When numCancelSign is erased
				if(this.items[self].text === 'alphabet') {
					console.log("one alphabetSign erased");
					this.numSignCount++;
					if(this.numSignCount >= 1) {
						this.isNum = true;
						console.log("Num has come back");
					}
				}

				//When space is erased
				console.log("isSpace: " + this.items[self].isSpace);
				console.log("numSingCount: " + this.numSignCount);
				if(this.items[self].text === '!') {
					let self2 = self - 1;
					if(this.items[self2].text !== 'alphabet') {
						alert("One space erased");
						this.numSignCount++;
					}
					console.log("last numSignCount: " + this.numSignCount);
					if(this.numSignCount >= 1) {
						this.isNum = true;
						console.log("Num is still on");
					}
				}

				this.items[this.counter].pointer = false;
				this.items[this.counter - 1].pointer = true;
				this.counter--;
				this.clearBlock(this.counter);
				this.playAudio(300, .15, .06);
				this.items[this.counter].text = '';
				console.log(this.counter);
				
			}
		}
	}
}