import { Component, OnInit } from '@angular/core';
import { WindowRef } from './windowRef';
import { HostListener } from '@angular/core';
import { AppComponent } from './app.component';
import * as patterns from './lego-mock';


@Component({
	selector: 'exercise',
	templateUrl: './exercise.component.html',
	styleUrls: ['./exercise.component.css']
})

export class ExerciseComponent implements OnInit {

	title = 'Exercise';
	items;
	result: string = '';
	counter: number;
	lev: number;
	map;
	say;
	audioCtx;

	levels = [
		{num: 1, isSelected: false},
		{num: 2, isSelected: false},
		{num: 3, isSelected: false}
	];

	questions = [
		[
			'aaa',
			'bbb',
			'ccc',
			'ddd'
		],
		[
			'lll',
			'abb',
			'add',
			'lbb'
		],
		[
			'ace',
			'add',
			'bad',
			'cab'
		]
	];

	question: string;
	myAnswer: string;
	msg: string;
	max: number;
	isPopup: boolean;
	questionForSpeak: any;

	constructor(private sound: AppComponent, private winRef: WindowRef) {
		this.items = patterns.legos.first;
		this.items[0].pointer = true;
		this.counter = 0;
		this.lev = 0;
		this.max = this.questions[0].length;

		this.sound.clearAll();
	}

	ngOnInit() {
		this.formatQuestions(this.lev, this.counter);
	}

	selectLevel(x) {
		this.sound.keyLock = false;
		this.resetLevelandCounter();
		this.lev = x;
		let index = x - 1;

		//Get the first question
		this.question = this.questions[index][0];

		this.styleLevelSelect(index);

		if(this.winRef.nativeWindow.speechSynthesis.speaking) {
			this.winRef.nativeWindow.speechSynthesis.cancel();
		}

		this.sayNextQuestion(index, this.counter);
	}

	formatQuestions(x, y) {
		let beginnerLevel = 2;
		if(x < beginnerLevel) {
			//Pronunce letter one by one instead of whole word
			this.questionForSpeak = this.questions[x][y].split('');
			return this.questionForSpeak;
		}
		else {
			//Pronunce word
			this.questionForSpeak = this.questions[x][y].toString();
			return this.questionForSpeak;
		}
	}

	styleLevelSelect(x) {
		for(let i = 0, len = this.levels.length; i < len; i++) {
			this.levels[i].isSelected = false;
		}
		this.levels[x].isSelected = true;
	}

	sayNextQuestion(x, y) {
		this.formatQuestions(x, y);
		this.sound.say.text = "Type, " + this.questionForSpeak;
		this.winRef.nativeWindow.speechSynthesis.speak(this.sound.say);
	}

	beep(freq, vol) {
		this.sound.playAudio(freq, vol, .1)
	}

	checkAnswer(x, y) {
		let index = x - 1;
		this.myAnswer = this.concateText();

		if(this.questions[index][y] == this.myAnswer) {
			this.displayMsg('Correct!');
			this.beep(2200, .15);

			if(y < this.max - 1) {
				this.getNextQuestion(index, this.counter);
				this.addCounter(this.counter);
			}
			else {
				this.endGame(index);
				return;
			}
			this.sayNextQuestion(index, this.counter);
		}
		else {
			this.displayMsg('Again!');
			this.beep(100, .35);
			//Repeat the same question
			this.sayNextQuestion(index, this.counter);
		}

		this.sound.clearAll();
		this.clearText();
	}

	concateText() {
		this.result = '';
		for(let i = 0, len = this.items.length; i < len; i++) {
			this.result += this.items[i].text;
		}
		return this.result;
	}

	clearText() {
		for(let i = 0, len = this.items.length; i < len; i++) {
			this.items[i].text = '';
		}
	}

	addCounter(x) {
		if(x < this.max) {
			this.counter += 1;
		}
	}

	resetLevelandCounter() {
		this.counter = this.lev = 0;
	}

	getNextQuestion(x, y) {
		let next = y + 1;
		this.question = this.questions[x][next];
	}

	displayMsg(myMessage) {
		this.msg = myMessage;
	}

	endGame(level) {
		this.displayMsg('');
		this.resetLevelandCounter();
		this.sound.clearAll();
		this.clearText();
		this.question = '';
		this.sound.keyLock = true;
		this.displayPopup();
		this.levels[level].isSelected = false;
	}

	displayPopup() {
		this.isPopup = true;
	}

	cleanPage() {
		this.isPopup = false;
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		if(!event.repeat) {
			this.map = [];
			this.map[event.keyCode] = event.type === 'keydown';
			return;
		}
	}

	@HostListener('window:keyup', ['$event'])
	keyUpBrailler(event: KeyboardEvent) {
		if(this.map[13]) {
			this.checkAnswer(this.lev, this.counter);
		}
	}
}