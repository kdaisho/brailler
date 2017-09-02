import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { FreeTypingComponent } from './free-typing.component';
import { ExerciseComponent } from './exercise.component';

export const routing = RouterModule.forRoot([
	{ path: '', component: HomeComponent },
	{ path: 'freetyping', component: FreeTypingComponent },
	{ path: 'exercise', component: ExerciseComponent }
]);