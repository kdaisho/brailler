// import { Component, Input } from '@angular/core';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { AppComponent } from './app.component';
import * as patterns from './lego-mock';

import * as p from './letters-mock';

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

	questions = [
		'aaa',
		'bbb',
		'ccc'
	];
	question: string;

	keyInputs = [];

	myAnswer;

	p;

	constructor(private sound: AppComponent) {
		this.question = this.questions[this.counter];
		// this.items = patterns.legos.first;
		this.items = patterns.legos.first;
		this.items[0].pointer = true;
		this.soundComponent = sound;
		// console.log("FREETYPING TITLE: " + this.soundComponent.title);
		this.counter = 0;
		this.question = this.questions[0];

		this.p = p.letters;

		// this.clearText();
		this.soundComponent.clearAll();


		console.log("INIT and MY ANSWER " + this.myAnswer);
		console.log("ITEMS.TEXT " + this.items[0].text);
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
			console.log("ENTER PRESSED");
		}
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
		console.log("ANSWER LENGTH " + this.questions.length);
		// this.addCounter(1);
	}

	concateText() {
		this.result = '';
		console.log("LENGTH " + this.items.length);
		// this.items[x].text = this.say.text = this.p[i].value;
		for(let i = 0, len = this.items.length; i < len; i++) {
			this.result += this.items[i].text;
			// this.result += this.p[i].value;
			// this.result += this.say.text;
			console.log("REPEATED? " + this.items[i].text);
		}
		console.log("CONCATE: " + this.result);
		return this.result;
		// return 'aaa';
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