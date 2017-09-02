import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeTypingComponent } from './free-typing.component';
import { ExerciseComponent } from './exercise.component';

export const routing = RouterModule.forRoot([
	{ path: 'freetyping', component: FreeTypingComponent },
	{ path: 'exercise', component: ExerciseComponent }
]);

// const routes: Routes = [
// 	{ path: 'freetyping', component: FreeTypingComponent },
// 	{ path: 'exercise', component: ExerciseComponent }
// ];
// export const routing = RouterModule.forRoot([
// 	{ path: '', component: HybaComponent },
// ], { useHash: true });
