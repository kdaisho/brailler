import { Component, OnInit } from '@angular/core';
import { WindowRef } from './windowRef';
import { HostListener } from '@angular/core';
import { AppComponent } from './app.component';
import * as patterns from './lego-mock';
import * as q from './questions-mock';


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

	courses = [
		{
			difficulty: 'A to J',
			isSelected: false
		},
		{
			difficulty: 'K to S',
			isSelected: false
		},
		{
			difficulty: 'T to Z',
			isSelected: false
		},
		{
			difficulty: 'NUMBERS',
			isSelected: false
		},
		{
			difficulty: 'SPECIAL CHARACTERS',
			isSelected: false
		}
	];

	levels = [
		{num: 1, isSelected: false},
		{num: 2, isSelected: false},
		{num: 3, isSelected: false},
		{num: 4, isSelected: false}
		// {num: 5, isSelected: false}
		// {num: 6, isSelected: false},
		// {num: 7, isSelected: false},
		// {num: 8, isSelected: false}
	];
	questions: any[] = [];
	question: string;
	myAnswer: string;
	msg: string;
	max: number;
	isPopup: boolean;
	questionForSpeak: any;

	keydown: boolean = false;
	stroke: number = 0;

	niveau: any[] = [];

	constructor(private sound: AppComponent, private winRef: WindowRef) {
		this.items = patterns.legos;
		this.items[0].pointer = true;
		this.counter = 0;
		this.lev = 0;
		this.sound.clearAll();
	}

	ngOnInit() {
		this.sound.keyLock = true;
	}

	selectCourse(courseNum) {
		for(let i = 0, len = this.courses.length; i < len; i++) {
			this.courses[i].isSelected = false;
			this.niveau[i] = false;
		}
		this.questions = q.QUESTIONS[courseNum];
		this.max = this.questions[0].length;
		console.log(this.questions);

		this.courses[courseNum].isSelected = true;
		this.niveau[courseNum] = true;
		this.formatQuestions(this.lev, this.counter);
	}

	selectLevel(selectedLevel) {
		this.sound.keyLock = false;
		// this.formatQuestions(this.lev, this.counter);

		this.resetLevelandCounter();
		// this.lev = selectedLevel + 1;
		this.lev = selectedLevel;
		console.log('1;');
		//Get the first question
		this.question = this.questions[selectedLevel][0];
		console.log(this.question);

		this.styleLevelSelect(selectedLevel);
		console.log('2;');
		if(this.winRef.nativeWindow.speechSynthesis.speaking) {
			this.winRef.nativeWindow.speechSynthesis.cancel();
		}
		console.log('3;');
		this.sayNextQuestion(selectedLevel, this.counter);
		console.log('4;');
	}

	formatQuestions(index, counter) {
		let beginnerLevel = 3;
		if(index < beginnerLevel) {
			//Pronunce letter one by one instead of whole word
			this.questionForSpeak = this.questions[index][counter].split('');
			return this.questionForSpeak;
		}
		else {
			//Pronunce word
			this.questionForSpeak = this.questions[index][counter].toString();
			return this.questionForSpeak;
		}
	}

	styleLevelSelect(x) {
		for(let i = 0, len = this.levels.length; i < len; i++) {
			this.levels[i].isSelected = false;
		}
		this.levels[x].isSelected = true;
		console.log('5;');
	}

	sayNextQuestion(index, counter) {
		this.formatQuestions(index, counter);
		this.sound.say.text = "Type, " + this.questionForSpeak;
		this.winRef.nativeWindow.speechSynthesis.speak(this.sound.say);
		console.log('6;');
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
		console.log('7;');
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
		this.keydown = true;
		this.stroke = 0;
		if(!event.repeat) {
			this.map = [];
			this.map[event.keyCode] = event.type === 'keydown';
			this.stroke++;
			return;
		}
	}

	@HostListener('window:keyup', ['$event'])
	keyUpBrailler(event: KeyboardEvent) {
		if(this.sound.keyLock === false) {
			this.stroke--;
			if(this.keydown === true && this.stroke === 0) {
				if(this.map[13]) {
					this.checkAnswer(this.lev, this.counter);
				}
			}
		}
	}
}