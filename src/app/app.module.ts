import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WindowRef } from './windowRef';
import { routing } from './app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { AppComponent } from './app.component';
import { SoundComponent } from './sound.component';
import { AudioComponent } from './audio.component';
import { HomeComponent } from './home.component';
import { FreeTypingComponent } from './free-typing.component';
import { ExerciseComponent } from './exercise.component';
import { CheatsheetComponent } from './cheatsheet.component';

@NgModule({
	declarations: [
		AppComponent,
		SoundComponent,
		AudioComponent,
		HomeComponent,
		FreeTypingComponent,
		ExerciseComponent,
		CheatsheetComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		routing,
		HttpModule,
		Ng2DeviceDetectorModule.forRoot()
	],
	providers: [WindowRef, {provide: LocationStrategy, useClass: HashLocationStrategy}, SoundComponent, AudioComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
