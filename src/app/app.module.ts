import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WindowRef } from './windowRef';

import { AppComponent } from './app.component';
import { SoundComponent } from './sound.component';
import { FreeTypingComponent } from './free-typing.component';
import { CheatsheetComponent } from './cheatsheet.component';

@NgModule({
	declarations: [
		AppComponent,
		SoundComponent,
		FreeTypingComponent,
		CheatsheetComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [WindowRef],
	bootstrap: [AppComponent]
})
export class AppModule { }
