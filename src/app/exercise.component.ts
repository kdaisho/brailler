import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { AppComponent } from './app.component';
import * as patterns from './lego-mock';


@Component({
	selector: 'exercise',
	templateUrl: './exercise.component.html',
	styleUrls: ['./exercise.component.css']
})

export class ExerciseComponent {

	// @Input() exec;
	title = 'Exercise';
	items;
	result: string = '';
	counter: number = 0;
	map;
	say;
	audioCtx;

	levels = [
		{num: 0, isSelected: true},
		{num: 1, isSelected: false},
		{num: 2, isSelected: false}
	];
	currentLevel;

	questions = [
		[
			'aaa',
			'bbb'
		],
		[
			'lll',
			'abb'
		],
		[
			'ccc',
			'acc'
		]
	];

	question: string;

	keyInputs = [];

	myAnswer;

	msg;

	points;

	isPopup: boolean;


	constructor(private sound: AppComponent) {
		this.question = this.questions[0][this.counter];
		this.items = patterns.legos.first;
		this.items[0].pointer = true;
		this.counter = 0;
		this.msg = "Type below";
		// this.question = this.questions[0];

		this.currentLevel = this.levels[0].num + 1;
		console.log('> ' + this.currentLevel);

		this.points = 0;

		this.sound.keyLock = false;
		this.sound.clearAll();

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
			// this.checkAnswer(this.levels[this.currentLevel].num);
			this.checkAnswer(this.currentLevel);
		}
	}

	selectLevel(level) {
		this.resetCounterPoints();
		this.currentLevel = this.levels[level].num + 1;

		this.styleLevelSelect(level);
		this.question = this.questions[level][0];
	}

	styleLevelSelect(x) {
		for(let i = 0, len = this.levels.length; i < len; i++) {
			this.levels[i].isSelected = false;
		}
		this.levels[x].isSelected = true;
	}

	checkAnswer(currentLevel) {
		let index = currentLevel - 1;
		this.myAnswer = this.concateText();
		console.log("MY ANSWER: " + this.myAnswer);

		if(this.questions[index][this.counter] == this.myAnswer) {
			this.displayMsg('Correct');
			this.addPoints(1);
			if(this.points < 3) {
				this.getQuestion(index);
			}
			this.addCounter(1, 3);
		}
		else {
			this.displayMsg('Wrong');
		}

		if(this.points >= 2) {
			console.log('current ' + this.currentLevel);
			this.displayMsg("Level up!");
			// this.endGame();
			this.resetCounterPoints();
			if(this.currentLevel <= this.questions.length - 1) {
				this.getNextLevel();	
			}
			else {
				this.endGame();
				return;
			}
			// this.getNextLevel();
			this.continueGame();
		}

		this.sound.clearAll();
		this.clearText();
		// this.addCounter(1);
	}

	concateText() {
		this.result = '';
		console.log("LENGTH " + this.items.length);
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

	addCounter(x, max) {
		while(this.counter < max - 1) {
			this.counter += x;
			return;
		}
		this.counter = 0;
	}

	addPoints(x) {
		this.points += x;
	}

	resetCounterPoints() {
		this.counter = this.points = 0;
	}

	getQuestion(currentLevel) {
		let newCounter = this.counter + 1;
		this.question = this.questions[currentLevel][newCounter];
	}

	displayMsg(myMessage) {
		this.msg = myMessage;
	}

	endGame() {
		this.displayMsg("End of game");
		this.resetCounterPoints();
		this.sound.clearAll();
		this.clearText();
		this.sound.keyLock = true;
		this.displayPopup();
	}

	getNextLevel() {
		this.currentLevel += 1;
		// if(this.currentLevel >= this.questions.length) {
		// 	this.displayMsg("END!");
		// 	this.endGame();
		// 	this.resetCounterPoints();
		// }
		// this.displayMsg("You've completed all levels");
	}

	continueGame() {
		console.log("CUU " + this.currentLevel);
		let index = this.currentLevel - 1;
		this.question = this.questions[index][0];
	}

	displayPopup() {
		this.isPopup = true;
	}
}