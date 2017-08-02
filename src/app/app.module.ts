import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WindowRef } from './windowRef';

import { AppComponent } from './app.component';
import { SoundComponent } from './sound.component';

@NgModule({
	declarations: [
		AppComponent,
		SoundComponent
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
