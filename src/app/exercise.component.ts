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
	soundComponent;
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
			'bbb',
			'ccc'
		],
		[
			'lll',
			'abb',
			'all'
		]
	];

	question: string;

	keyInputs = [];

	myAnswer;

	msg;

	points;

	life;


	constructor(private sound: AppComponent) {
		this.question = this.questions[0][this.counter];
		this.items = patterns.legos.first;
		this.items[0].pointer = true;
		this.soundComponent = sound;
		this.counter = 0;
		// this.question = this.questions[0];

		this.currentLevel = this.levels[0].num + 1;
		console.log('> ' + this.currentLevel);

		this.points = 0;

		this.soundComponent.clearAll();
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


		this.reset();
		this.currentLevel = this.levels[level].num + 1;

		this.styleLevelSelect(level);
		// if(this.currentLevel === 1) {
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
			this.getQuestion(index);
			this.addCounter(1, 3);
		}
		else {
			this.displayMsg('Wrong');
		}

		this.endGame(3);

		this.soundComponent.clearAll();
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

	reset() {
		this.counter = this.points = 0;
		this.msg = '';
	}

	getQuestion(currentLevel) {
		let newCounter = this.counter + 1;
		// if(currentLevel === 1) {
			this.question = this.questions[currentLevel][newCounter];
		// }
		// if(currentLevel === 2) {
		// 	this.question = this.questions[currentLevel][newCounter];
		// }
	}

	displayMsg(myMessage) {
		this.msg = myMessage;
	}

	endGame(x) {
		if(this.points >= x) {
			this.displayMsg("Great!");
		}
	}
}