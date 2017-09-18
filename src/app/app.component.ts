import { Component } from '@angular/core';
import { WindowRef } from './windowRef';
import { Router, NavigationEnd } from '@angular/router';

import { HomeComponent } from './home.component';
import { HostListener } from '@angular/core';

import * as patterns from './lego-mock';
import * as p from './letters-mock';
import * as sp from './special-char-mock';

declare let ga: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	title = 'My Brailler';
	keyLock: boolean = true;
	items;
	counter = 0;
	maxCounter;
	map;
	say;

	keyCount = 0;
	isRightKey = false;
	audio;

	audioCtx:any = false;
	oscillator;
	volume;

	keyId = [];
	id: string;
	p;
	sp;
	lastBlock: boolean;
	exceedBlock: boolean;

	isNum: boolean = false;
	numSignCount: number = 0;
	numCancelCount: number = 0;
	isSpecial: boolean = false;
	speId: string;
	pathName;
	myWindow;
	speak;
	keydown: boolean = false;
	stroke: number = 0;

	constructor(private winRef: WindowRef, public router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				ga('set', 'page', event.urlAfterRedirects);
				ga('send', 'pageview');
			}
		});
		this.pathName = window.location.pathname;
		this.items = patterns.legos;
		this.p = p.letters;
		this.sp = sp.characters;
		this.maxCounter = this.items.length;
		this.say = new winRef.nativeWindow.SpeechSynthesisUtterance();
		this.audioCtx = new (winRef.nativeWindow.AudioContext || winRef.nativeWindow.webkitAudioContext)();
		this.items[0].pointer = true;
	}

	clearAll() {
		for(let i = 0, len = this.items.length; i < len; i++) {
			this.clearBlock(i);
			this.items[i].pointer = false;
		}
		this.counter = 0;
		this.isNum = false;
		this.numSignCount = 0;
		this.items[0].pointer = true;
		this.exceedBlock = this.lastBlock = false;
		this.isSpecial = false;
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

	saveKeyCode(x) {
		if(this.map[70]) {
			this.items[x].dot1 = true;
			if(this.keyId.indexOf('1') < 0) {
				this.keyId.push('1');
			}
		}
		if(this.map[68]) {
			this.items[x].dot2 = true;
			if(this.keyId.indexOf('2') < 0) {
				this.keyId.push('2');
			}
		}
		if(this.map[83]) {
			this.items[x].dot3 = true;
			if(this.keyId.indexOf('3') < 0) {
				this.keyId.push('3');
			}
		}
		if(this.map[74]) {
			this.items[x].dot4 = true;
			if(this.keyId.indexOf('4') < 0) {
				this.keyId.push('4');
			}
		}
		if(this.map[75]) {
			this.items[x].dot5 = true;
			if(this.keyId.indexOf('5') < 0) {
				this.keyId.push('5');
			}
		}
		if(this.map[76]) {
			this.items[x].dot6 = true;
			if(this.keyId.indexOf('6') < 0) {
				this.keyId.push('6');
			}
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

	saveSpecialCharacter(x) {
		for(let i = 0, len = this.sp.length; i < len; i++) {

			//Special character initiator
			if(this.id === this.sp[i].id && this.sp[i].id === '45' && this.isSpecial === false) {
				this.isSpecial = true;
				this.speId = this.id;
			}

			if(this.id === this.sp[i].id) {
				this.isRightKey = true;
				this.items[x].text = this.sp[i].value;
				this.say.text = this.sp[i].pronounce;

				if(this.id !== '45') {
					this.isSpecial = false;
				}
				return;
			}

			if(this.id === '23645' || this.id === '35645' ) {
				this.isSpecial = false;
			}
		}
	}

	saveNumber(x) {
		if(this.isNum) {
			for(let i = 0, len = this.p.length; i < len; i++) {
				if(this.id === this.p[i].id && this.p[i].num !== '') {
					this.isRightKey = true;
					this.items[x].text = this.say.text = this.p[i].num;
					return;
				}
			}
			this.isRightKey = false;
		}
	}

	saveSound(x, max) {
		if(!this.isNum) {
			for(let i = 0, len = this.p.length; i < len; i++) {
				if(this.id === this.p[i].id) {
					this.isRightKey = true;
					this.isSpecial = false;
					return this.items[x].text = this.say.text = this.p[i].value;
				}
			}
			//Num initiator
			if(this.id === '3456') {
				this.items[x].text = '#';
				this.say.text = 'numbers';
				this.isRightKey = true;
				this.isNum = true;
				return;
			}
			this.isRightKey = false;
		}
		else if(this.isNum && (this.id === '56')) {
			this.items[x].text = 'alphabet';
			this.isRightKey = true;
			this.isNum = false;
		}
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		//Prevent scroll or browser back
		if (event.keyCode === 32 || event.keyCode === 8) {
			event.preventDefault();
		}
		this.keydown = true;
		this.stroke = 0;
		if(this.keyLock === false) {
			if(!event.repeat) {
				this.map = [];
				this.map[event.keyCode] = event.type === 'keydown';
				if(!this.exceedBlock) {
					this.saveKeyCode(this.counter);
				}
				this.stroke++;
				return;
			}
		}
	}

	@HostListener('window:keyup', ['$event'])
	keyUpBrailler(event: KeyboardEvent) {
		if(this.keyLock === false) {
			this.stroke--;

			if(this.stroke === 0) {
				this.map = [];
				this.map[event.keyCode] = event.type === 'keyup';

				if(this.isSpecial && (this.id == '356' || this.id == '236')) {
					this.id += this.speId;
				}
				else {
					this.isSpecial = false;
				}

				this.saveNumber(this.counter);

				this.saveSound(this.counter, this.maxCounter);

				this.saveSpecialCharacter(this.counter);

				if(!this.exceedBlock) {
					this.keyId = [];
				}

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
				}

				if(this.exceedBlock && (this.map[70] || this.map[68] || this.map[83] || this.map[74] || this.map[75] || this.map[76])) {
					this.id = '';
					this.playAudio(140, .2, .06);
				}

				if(!this.isRightKey) {
					if(!this.exceedBlock) {
						this.clearBlock(this.counter);
						this.checkCounter();
					}
				}

				//Space key
				if(!this.lastBlock && this.keydown) {
					if(this.map[32]) {
						this.playAudio(600, .15, .06);
						this.items[this.counter].text = ' ';
						this.isSpecial = false;

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
				if(this.keydown) {
					if(this.map[8] && this.counter !== 0) {

						let max = this.maxCounter - 1;
						let prev = this.counter - 1;
						let prev2 = this.counter - 2;

						//When pointer was in last position
						if(this.lastBlock) {
							this.clearBlock(max);
							this.lastBlock = false;
							this.exceedBlock = false;
						}

						//When numSign is erased
						if(this.items[prev].text === '#') {
							this.isNum = false;
						}

						//When numCanceller is erased
						if(this.items[prev].text === 'alphabet') {
							this.isNum = true;
						}

						//When space is erased
						if(this.items[prev].text === ' ') {
							this.isNum = false;
							if(this.items[this.counter].wasNum) {
								this.isNum = true;
							}
						}

						//When 45 is erased
						if(this.items[prev].text === '') {
							this.isSpecial = false;
						}

						//When 45 is one step before
						if(this.counter >= 2 && this.items[prev2].text === '') {
							this.isSpecial = true;
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
	}
}