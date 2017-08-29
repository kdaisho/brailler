import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { WindowRef } from './windowRef';
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
	counter = 0;
	maxCounter;
	map;
	say;

	keyUpCount = 0;
	keyCount = 0;
	isRightKey = false;
	audio;
	rows = [1];

	audioCtx;
	oscillator;
	volume;

	constructor(private winRef: WindowRef) {
		this.items = patterns.legos.first;
		this.maxCounter = this.items.length;
		this.say = new winRef.nativeWindow.SpeechSynthesisUtterance();
		this.audioCtx = new (winRef.nativeWindow.AudioContext || winRef.nativeWindow.webkitAudioContext)();
		this.items[0].pointer = true;
	}
}