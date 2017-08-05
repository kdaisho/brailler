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

	// keyUpCount = 0;
	keyCount = 0;
	isRightKey = false;
	audio;
	rows = [1];
	stroke = 0;

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
			this.items[x].active1 = true;
			this.items[x].dot1 = true;
			this.items[x].test = true;
			this.map[70] = false;
			this.stroke++;
		}
		if(this.map[68]) {
			this.items[x].active2 = true;
			this.items[x].dot2 = true;
			this.items[x].test = true;
			this.map[68] = false;
			this.stroke++;
		}
		if(this.map[83]) {
			this.items[x].active3 = true;
			this.items[x].dot3 = true;
			this.items[x].test = true;
			this.map[83] = false;
			this.stroke++;
		}
		if(this.map[74]) {
			this.items[x].active4 = true;
			this.items[x].dot4 = true;
			this.items[x].test = true;
			this.map[74] = false;
			this.stroke++;
		}
		if(this.map[75]) {
			this.items[x].active5 = true;
			this.items[x].dot5 = true;
			this.items[x].test = true;
			this.map[75] = false;
			this.stroke++;
		}
		if(this.map[76]) {
			this.items[x].active6 = true;
			this.items[x].dot6 = true;
			this.items[x].test = true;
			this.map[76] = false;
			this.stroke++;
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
	// numInit: boolean;
	numInit = 0;
	numCanceller: boolean;

	saveNumber(x) {
		if(this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot2)) {
			// this.numInit = true;
			// this.numInit++;
			// console.log("numInit for saveNumber " + this.numInit);
			// this.keyCount = 4;
			this.items[x].text = '#';
			this.say.text = 'Numbers';
			this.isNum = true;
			this.isRightKey = true;
			console.log("oioi " +this.isNum);
			// this.numInit++;
			console.log("first numInit " + this.numInit);
		}

		//Num canceller
		if(this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4)) {
			// this.keyCount = 2;
			this.isRightKey = true;
			// this.numInit = false;
			this.numInit = 0;
			this.numCanceller = true;
			this.isNum = false;
		}
		if(this.isNum) {
			if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '0';
				// this.keyCount = 3;
				// this.numInit = false;
			}
			if(this.items[x].dot1 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '1';
				// this.keyCount = 1;
				// this.numInit = false;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '2';
				// this.keyCount = 2;
				// this.numInit = false;
			}
			if(this.items[x].dot1 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '3';
				// this.keyCount = 2;
				// this.numInit = false;
			}
			if(this.items[x].dot1 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 ||this.items[x].dot6)) {
				this.items[x].text = this.say.text = '4';
				// this.keyCount = 3;
				// this.numInit = false;
			}
			if(this.items[x].dot1 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '5';
				// this.keyCount = 2;
				// this.numInit = false;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '6';
				// this.keyCount = 3;
				// this.numInit = false;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '7';
				// this.keyCount = 4;
				// this.numInit = false;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '8';
				// this.keyCount = 3;
				// this.numInit = false;
			}
			if(this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = '9';
				// this.keyCount = 2;
				// this.numInit = false;
			}
		}
	}

	saveSound(x) {
		// if(!this.isNum) {
			// this.isRightKey = false;
			

			if(this.items[x].dot1 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'a';
				// this.keyCount = 1;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'b';
				// this.keyCount = 2;
			}
			if(this.items[x].dot1 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'c';
				// this.keyCount = 2;
			}
			if(this.items[x].dot1 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 ||this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'd';
				// this.keyCount = 3;
			}
			if(this.items[x].dot1 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'e';
				// this.keyCount = 2;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'f';
				// this.keyCount = 3;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'g';
				// this.keyCount = 4;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot5 && !(this.items[x].dot3 || this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'h';
				// this.keyCount = 3;
			}
			if(this.items[x].dot2 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'i';
				// this.keyCount = 2;
			}
			if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot3 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'j';
				// this.keyCount = 3;
			}
			if(this.items[x].dot1 && this.items[x].dot3 && !(this.items[x].dot2 || this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'k';
				// this.keyCount = 2;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && !(this.items[x].dot4 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'l';
				// this.keyCount = 3;
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot2 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'm';
				// this.keyCount = 3;
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'n';
				// this.keyCount = 4;
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot5 && !(this.items[x].dot2 || this.items[x].dot4 ||  this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'o';
				// this.keyCount = 3;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'p';
				// this.keyCount = 4;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !this.items[x].dot6) {
				this.items[x].text = this.say.text = 'q';
				// this.keyCount = 5;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot5 && !(this.items[x].dot4 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 'r';
				// this.keyCount = 4;
			}
			if(this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && !(this.items[x].dot1 || this.items[x].dot5 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 's';
				// this.keyCount = 3;
			}
			if(this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && !(this.items[x].dot1 || this.items[x].dot6)) {
				this.items[x].text = this.say.text = 't';
				// this.keyCount = 4;
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot4 || this.items[x].dot5)) {
				this.items[x].text = this.say.text = 'u';
				// this.keyCount = 3;
			}
			if(this.items[x].dot1 && this.items[x].dot2 && this.items[x].dot3 && this.items[x].dot6 && !(this.items[x].dot4 || this.items[x].dot5)) {
				this.items[x].text = this.say.text = 'v';
				// this.keyCount = 4;
			}
			if(this.items[x].dot2 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot1 || this.items[x].dot3)) {
				this.items[x].text = this.say.text = 'w';
				// this.keyCount = 4;
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot5)) {
				this.items[x].text = this.say.text = 'x';
				// this.keyCount = 4;
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot4 && this.items[x].dot5 && this.items[x].dot6 && !this.items[x].dot2) {
				this.items[x].text = this.say.text = 'y';
				// this.keyCount = 5;
			}
			if(this.items[x].dot1 && this.items[x].dot3 && this.items[x].dot5 && this.items[x].dot6 && !(this.items[x].dot2 || this.items[x].dot4)) {
				this.items[x].text = this.say.text = 'z';
				// this.keyCount = 4;
			}

		// }
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
		// this.keyUpCount++;
		console.log("Stroke? " + this.stroke);
		this.stroke--;
		// if(this.stroke == 0 && this.isNum) {
		// 	console.log("Stroke is " + this.stroke);
		// 	this.numInit++;
		// 	console.log("numInit added " + this.numInit);
		// }

		// if(this.isNum && (this.keyUpCount === this.keyCount)) {
		// 	console.log("seicon");
		// 	// this.numInit++;
		// 	console.log("numInit for saveNumber " + this.numInit);
		// }
		// if(this.isRightKey && (this.keyUpCount === this.keyCount)) {
		if(this.isRightKey && this.stroke == 0) {
			if(this.winRef.nativeWindow.speechSynthesis.speaking) {
				this.winRef.nativeWindow.speechSynthesis.cancel();
			}
			// if(!this.numCanceller) {
				this.winRef.nativeWindow.speechSynthesis.speak(this.say);
				this.say.text = '';
			// }
			// this.numCanceller = false;
			// this.keyUpCount = 0;
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
			console.log('false key pressed');
			// this.keyUpCount = 0;
			this.clearRow(this.counter);
			this.checkCounter();
		}
		console.log("first active3? " + this.items[this.counter].active3);
		//Space key
		if(this.map[32]) {
			this.isNum = false;
			// this.numCanceller = true;

			this.isRightKey = false;
			this.addCounter(1);
			this.checkCounter();
			this.playAudio(600, .15, .06);
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
			// this.keyUpCount = 0;
		}
		//Delete key
		if(this.map[8]) {

			if(this.counter !== 0) {
				console.log('numInit? ' + this.numInit);
				let haha = this.counter - 1;
				console.log('text? ' + this.items[haha].text);
				if(this.numInit !== 0) {
					let self = this.counter - 1;
					console.log("self " + self);
					console.log("second active3? " + this.items[self].active3);

					// if(this.items[self].active3 && this.items[self].active4 && this.items[self].active5 && this.items[self].active6 && !(this.items[self].active1 || this.items[self].active2)) {
					if(this.items[self].text == '#') {
						console.log("Num cancelled");
						this.numInit--;
						if(this.numInit == 0) {
							this.isNum = false;
						}
					}

				}
				if(this.numCanceller) {
					console.log('numCanceller was ' + this.numCanceller);
					let self2 = this.counter - 1;
					console.log("self2 " + self2);
					console.log("second active3? " + this.items[self2].active5);

					if(this.items[self2].active5 && this.items[self2].active6 && !(this.items[self2].active1 || this.items[self2].active2 || this.items[self2].active3 || this.items[self2].active4)) {
						console.log("numCanceller cancelled => number");
						// this.numCanceller = false;
						this.isNum =true;
					}
				}

				this.items[this.counter].pointer = false;
				this.items[this.counter - 1].pointer = true;
				this.counter--;
				this.clearRow(this.counter);
				this.playAudio(300, .15, .06);
				this.items[this.counter].text = '';
				console.log(this.counter);
				
			}

			// if(this.numInit) {
			// 	console.log("num cancelled");

			// 	this.isNum = false;
			// }
		}
	}
}