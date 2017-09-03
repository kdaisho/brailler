// import { Component, Input } from '@angular/core';
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

	answer = [
		'aaa',
		'bbb',
		'ccc'
	];

	myAnswer;

	constructor(private sound: AppComponent) {
		this.items = patterns.legos.first;
		this.items[0].pointer = true;
		this.soundComponent = sound;
		console.log("FREETYPING TITLE: " + this.soundComponent.title);
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		// if(this.keyLock === false) {
			//Reset stroke to prevent it won't match when a user changed window or triggered mission control
			// this.stroke = 0;

			if(!event.repeat) {
				this.map = [];
				this.map[event.keyCode] = event.type === 'keydown';
				// if(!this.exceedBlock) {
				// 	this.saveKeyCode(this.counter);
				// }
				// this.stroke++;
				return;
			}
		// }
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
		if(this.answer[this.counter] == this.myAnswer) {
			console.log("Correct!");
		}
		else {
			console.log("Wrong");
		}
		this.soundComponent.clearAll();
		this.clearText();
		console.log("ANSWER LENGTH " + this.answer.length);
		this.addCounter(1);
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
		while(this.counter < this.answer.length - 1) {
			this.counter += x;
			return;
		}
		alert("DONE");
	}
}