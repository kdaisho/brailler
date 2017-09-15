import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import * as chars from './letters-mock';
import * as specials from './special-char-mock';

@Component({
	selector: 'cheatsheet',
	templateUrl: './cheatsheet.component.html',
	styleUrls: ['./cheatsheet.component.css'],
})

export class CheatsheetComponent {

	title = 'Cheatsheet';
	chars: any[];
	numbers: any[];
	specials: any[];
	isHelp: boolean = false;
	isAlphabet: boolean = true;

	constructor() {
		this.chars = chars.letters.slice(1);
		this.numbers = chars.letters.slice(0, 11);
		this.specials = specials.characters;
	}

	selectSheet(type) {
		this.isAlphabet = type === 'alpha' ? true : false;
	}

	@HostListener('window:keydown', ['$event'])
	toggleHelp(event: KeyboardEvent) {
		if(!this.isHelp && event.keyCode === 18) {
			this.isHelp = true;
		}
		else if(this.isHelp && event.keyCode === 18) {
			this.isHelp = false;
		}
	}
}