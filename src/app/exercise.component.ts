import { Component, Input } from '@angular/core';

@Component({
	selector: 'exercise',
	templateUrl: './exercise.component.html',
	styleUrls: ['./exercise.component.css']
})

export class ExerciseComponent {
	@Input() exec;
	title = 'Exercise';
	constructor() {}
}