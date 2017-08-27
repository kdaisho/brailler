import { Component } from '@angular/core';
import * as patterns from './lego-mock';
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
	isAlphabet: boolean = true;

	constructor() {
		this.chars = chars.letters.slice(1);
		this.numbers = chars.letters.slice(0, 10);
		this.specials = specials.characters;
	}

	selectSheet(type) {
		this.isAlphabet = type === 'alpha' ? true : false;
	}
}