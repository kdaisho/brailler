import { Component, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import * as patterns from './lego-mock';
import * as chars from './letters-mock';
import * as specials from './special-char-mock';

@Component({
	selector: 'cheatsheet',
	templateUrl: './cheatsheet.component.html',
	styleUrls: ['./cheatsheet.component.css'],
})

export class CheatsheetComponent {
	@Input() help;

	title = 'Cheatsheet';
	chars: any[];
	numbers: any[];
	specials: any[];
	isHelp: boolean = false;
	isAlphabet: boolean = true;

	constructor() {
		console.log('is help ' + this.help);
		this.chars = chars.letters.slice(1);
		this.numbers = chars.letters.slice(0, 10);
		this.specials = specials.characters;
	}

	selectSheet(type) {
		this.isAlphabet = type === 'alpha' ? true : false;
	}

	@HostListener('window:keydown', ['$event'])
	toggleHelp(event: KeyboardEvent) {
		if(this.help) {
			if(!this.isHelp && event.keyCode === 18) {
				this.isHelp = true;
			}
			else if(this.isHelp && event.keyCode === 18) {
				this.isHelp = false;
			}
		}
	}
}