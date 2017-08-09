import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { WindowRef } from './windowRef';
import * as patterns from './lego-mock';
import * as p from './letters-mock';

@Component({
	selector: 'sound',
	template: '<h2>Sound</h2>'
})

export class SoundComponent {

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

	keyId = [];
	id: string;
	p;
	lastBlock: boolean;
	exceedBlock: boolean;

	constructor(private winRef: WindowRef) {
		this.items = patterns.legos.first;
		this.p = p.letters;
		this.maxCounter = this.items.length;
		this.say = new winRef.nativeWindow.SpeechSynthesisUtterance();
		this.audioCtx = new (winRef.nativeWindow.AudioContext || winRef.nativeWindow.webkitAudioContext)();
		this.items[0].pointer = true;
		console.log(this.maxCounter);
	}

	saveKeyCode(x) {
		if(this.map[70]) {
			this.items[x].dot1 = true;
			this.map[70] = false;
			this.keyId.push('a');
		}
		if(this.map[68]) {
			this.items[x].dot2 = true;
			this.map[68] = false;
			this.keyId.push('b');
		}
		if(this.map[83]) {
			this.items[x].dot3 = true;
			this.map[83] = false;
			this.keyId.push('c');
		}
		if(this.map[74]) {
			this.items[x].dot4 = true;
			this.map[74] = false;
			this.keyId.push('d');
		}
		if(this.map[75]) {
			this.items[x].dot5 = true;
			this.map[75] = false;
			this.keyId.push('e');
		}
		if(this.map[76]) {
			this.items[x].dot6 = true;
			this.map[76] = false;
			this.keyId.push('f');
		}
		this.keyId = this.keyId.sort();
		this.id = this.keyId.join('');
	}
	
	addCounter(x) {
		return this.counter += x;
	}

	checkCounter() {
		if(this.counter >= this.maxCounter - 1) {
			this.lastBlock = true;
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
	stroke: number = 0;
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

	saveSound(x, max) {
		for(let i = 0, len = this.p.length; i < len; i++) {
			if(this.id === this.p[i].id) {
				this.isRightKey = true;
				return this.items[x].text = this.say.text = this.p[i].value;
			}
		}
		console.log('Not right key');
		this.isRightKey = false;
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		this.map = [];
		this.map[event.keyCode] = event.type === 'keydown';
		if(!this.exceedBlock) {
			this.saveKeyCode(this.counter);
		}
		this.stroke++;
	}

	@HostListener('window:keyup', ['$event'])
	keyUpBrailler(event: KeyboardEvent) {
		this.stroke--;
		if(this.stroke === 0) {
			this.map = [];
			this.map[event.keyCode] = event.type === 'keyup';

			this.saveSound(this.counter, this.maxCounter);

			if(!this.exceedBlock) {
				this.id = '';
				this.keyId = [];
				console.log('id: ' + this.id);
			}

			this.saveNumber(this.counter);

			if(this.isRightKey) {
				if(this.winRef.nativeWindow.speechSynthesis.speaking) {
					this.winRef.nativeWindow.speechSynthesis.cancel();
				}
				this.winRef.nativeWindow.speechSynthesis.speak(this.say);

				this.say.text = '';

				if(!this.lastBlock) {
					this.addCounter(1);
				}
				else {
					this.exceedBlock = true;
				}

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

			else if(this.exceedBlock && (this.map[70] || this.map[68] || this.map[83] || this.map[74] || this.map[75] || this.map[76])) {
				this.playAudio(120, .15, .06);
			}

			if(this.isRightKey === false) {
				console.log('Falsy key pressed');
				if(!this.exceedBlock) {
					this.clearBlock(this.counter);
					this.checkCounter();
				}
			}

			//Enter key
			if(this.map[13]) {
				for(var i = 0, len = this.counter; i <= len; i++) {
					this.clearBlock(i);
					this.items[i].pointer = false;
				}
				this.counter = 0;
				this.isNum = false;
				this.numSignCount = 0;
				this.items[0].pointer = true;
				this.exceedBlock = this.lastBlock = false;
			}

			//Space key
			if(!this.lastBlock) {
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
			}

			//Delete key
			if(this.map[8] && this.counter !== 0) {

				let max = this.maxCounter - 1;
				let self = this.counter - 1;

				//When pointer was in last position
				if(this.lastBlock) {
					this.clearBlock(max);
					this.lastBlock = false;
					this.exceedBlock = false;
				}

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