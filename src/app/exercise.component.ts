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
	level;

	questions = [
		'aaa',
		'bbb',
		'ccc'
	];
	question: string;

	keyInputs = [];

	myAnswer;


	constructor(private sound: AppComponent) {
		this.question = this.questions[this.counter];
		this.items = patterns.legos.first;
		this.items[0].pointer = true;
		this.soundComponent = sound;
		this.counter = 0;
		this.question = this.questions[0];

		this.level = this.levels[0].num + 1;

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
			this.checkAnswer();
		}
	}

	selectLevel(level) {
		this.level = this.levels[level].num + 1;
		for(let i = 0, len = this.levels.length; i < len; i++) {
			this.levels[i].isSelected = false;
		}
		this.levels[level].isSelected = true;
	}

	checkAnswer() {
		this.myAnswer = this.concateText();
		console.log("MY ANSWER: " + this.myAnswer);
		if(this.questions[this.counter] == this.myAnswer) {
			console.log("Correct!");
			this.getQuestion();
			this.addCounter(1);
		}
		else {
			console.log("Wrong");
		}
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

	addCounter(x) {
		while(this.counter < this.questions.length - 1) {
			this.counter += x;
			return;
		}
		alert("DONE");
		this.counter = 0;
	}

	getQuestion() {
		let newCounter = this.counter + 1;
		console.log("COUNTER " + newCounter);
		this.question = this.questions[newCounter];
	}
}