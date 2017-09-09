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
			'a, a, a',
			'b, b, b'
		],
		[
			'l,l,l',
			'a,b,b'
		],
		[
			'c,c,c',
			'a,c,c'
		]
	];

	question: string;
	questionText = [];


	keyInputs = [];

	myAnswer;

	msg;

	points;

	isPopup: boolean;

	sayText;
	questionsForDisplay = [];

	constructor(private sound: AppComponent, private winRef: WindowRef) {
		// constructor(private sound: AppComponent) {

		// this.question = this.questions[0][this.counter];
		this.items = patterns.legos.first;
		this.items[0].pointer = true;
		this.counter = 0;
		this.msg = "Type below";
		console.log(this.sound.say);

		this.currentLevel = this.levels[0].num + 1;
		console.log('> ' + this.currentLevel);

		this.points = 0;

		this.sound.keyLock = false;
		this.sound.clearAll();
	}

	ngOnInit() {
		this.beautifyQuestions();
		// this.question = this.questionsForDisplay[0];
	}

	beautifyQuestions() {
		//Remove comma out of questions for display purpose
		for(let i = 0, len = this.questions.length; i < len; i++) {
			for(let key in this.questions[i]) {
				this.questionsForDisplay.push(this.questions[i][key].replace(/,\s{0,1}/g, ""));
			}
		}
	}

	@HostListener('window:keydown', ['$event'])
	keyDownBrailler(event: KeyboardEvent) {
		this.sound.say.text = "no man";
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
			this.winRef.nativeWindow.speechSynthesis.speak(this.sound.say);
			this.checkAnswer(this.currentLevel);
		}
	}

	selectLevel(level) {
		this.resetCounterPoints();
		this.currentLevel = this.levels[level].num + 1;

		this.styleLevelSelect(level);
		console.log("HOW " + this.questions[level][0]);
		// this.question = this.questions[level][0];
		this.question = this.questionsForDisplay[level];

		if(this.winRef.nativeWindow.speechSynthesis.speaking) {
			this.winRef.nativeWindow.speechSynthesis.cancel();
		}
		this.sound.say.text = "You've selected level " + this.currentLevel;
		this.winRef.nativeWindow.speechSynthesis.speak(this.sound.say);
		this.sound.say.text = "Type, " + this.questions[0][0];
		this.winRef.nativeWindow.speechSynthesis.speak(this.sound.say);
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

			this.winRef.nativeWindow.speechSynthesis.speak(this.say);

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