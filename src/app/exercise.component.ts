// import { Component, Input } from '@angular/core';
import { Component } from '@angular/core';
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

	constructor() {
		this.items = patterns.legos.first;
		this.items[0].pointer = true;
	}
}