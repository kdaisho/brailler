import { Component, OnInit } from '@angular/core';
import { WindowRef } from './windowRef';
import { HostListener } from '@angular/core';
// import { AppComponent } from './app.component';
import { SoundComponent } from './sound.component';
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
			contents: 'A to J',
			isSelected: false,
			beginnerLevel: 3
		},
		{
			contents: 'K to S',
			isSelected: false,
			beginnerLevel: 3
		},
		{
			contents: 'T to Z',
			isSelected: false,
			beginnerLevel: 3
		},
		{
			contents: 'NUMBERS',
			isSelected: false,
			beginnerLevel: 2
		},
		{
			contents: 'CHARACTERS',
			isSelected: false,
			beginnerLevel: 3
		},
		{
			contents: 'EXAM',
			isSelected: false,
			beginnerLevel: 0
		}
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
	isCourseNum: boolean = false;
	beginnerLevel: number = 3;

	// childcounter = 0;
	childlock: boolean;

	constructor(private sound: SoundComponent, private winRef: WindowRef) {
		this.items = patterns.legos;
		this.items[0].pointer = true;
		this.counter = 0;
		this.lev = 0;
		this.sound.clearAll();
	}

	ngOnInit() {
		this.sound.keyLock = true;
	}

	selectCourse(courseNum, type, beginnerLevel) {
		this.beginnerLevel = beginnerLevel;

		for(let i = 0, len = this.courses.length; i < len; i++) {
			this.courses[i].isSelected = false;
			this.niveau[i] = false;
		}
		this.resetLevelandCounter();
		this.questions = q.QUESTIONS[courseNum];
		this.courses[courseNum].isSelected = true;
		this.niveau[courseNum] = true;
		this.formatQuestions(this.lev, this.counter);
		this.resetOnChangeCourse(courseNum);
	}

	selectLevel(selectedLevel, event) {
		//Prevent resetLevelStyle to be fired by click on parent element (selectCourse)
		event.stopPropagation();

		this.max = this.questions[selectedLevel].length;
		this.sound.keyLock = false;
		this.childlock = false;
		this.resetLevelandCounter();
		this.lev = selectedLevel;
		this.question = this.questions[selectedLevel][0];
		this.styleLevelSelect(selectedLevel);
		if(this.winRef.nativeWindow.speechSynthesis.speaking) {
			this.winRef.nativeWindow.speechSynthesis.cancel();
		}
		this.sayNextQuestion(selectedLevel, this.counter);
	}

	formatQuestions(index, counter) {
		if(index < this.beginnerLevel) {
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

	styleLevelSelect(levelNum) {
		for(let i = 0, len = this.questions.length; i < len; i++) {
			this.questions[i].isSelected = false;
		}
		this.questions[levelNum].isSelected = true;
	}

	resetOnChangeCourse(courseNum) {
		for(let i = 0, len = this.questions.length; i < len; i++) {
			this.questions[i].isSelected = false;
		}
		if(this.winRef.nativeWindow.speechSynthesis.speaking) {
			this.winRef.nativeWindow.speechSynthesis.cancel();
		}
		this.displayMsg('');
		this.clearText();
		this.question = '';
		this.sound.keyLock = true;
	}

	sayNextQuestion(index, counter) {
		this.formatQuestions(index, counter);
		this.sound.say.text = "Type, " + this.questionForSpeak;
		this.winRef.nativeWindow.speechSynthesis.speak(this.sound.say);
	}

	beep(freq, vol) {
		this.sound.playAudio(freq, vol, .1)
	}

	checkAnswer(x, y) {
		let index = x;
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
		console.log('Check answer fired');
		// this.childcounter = 1;
		this.sound.clearAll();
		this.clearText();
	}

	concateText() {
		this.result = '';
		for(let i = 0, len = this.items.length; i < len; i++) {
			this.result += this.items[i].text;
		}
		if(this.isCourseNum) {
			this.result = this.result.replace(/#/g, '');	
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
		this.questions[level].isSelected = false;
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
					console.log('COUNTER ON EXE: ', this.counter)
				}
			}
		}
	}
}