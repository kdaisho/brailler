import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WindowRef } from './windowRef';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { SoundComponent } from './sound.component';
import { FreeTypingComponent } from './free-typing.component';
import { ExerciseComponent } from './exercise.component';
import { CheatsheetComponent } from './cheatsheet.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SoundComponent,
		FreeTypingComponent,
		ExerciseComponent,
		CheatsheetComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		routing,
		HttpModule
	],
	providers: [WindowRef],
	bootstrap: [AppComponent]
})
export class AppModule { }
