import { Component } from '@angular/core';
// import { AppComponent } from './app.component';
import { SoundComponent } from './sound.component';
import { Ng2DeviceService } from 'ng2-device-detector';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent {

	deviceInfo;
	isNotSupported: boolean = false;

	constructor(private sound: SoundComponent, private deviceService: Ng2DeviceService) {
		//Disable user input on homepage
		sound.keyLock = true;
		this.detectBrowser();
	}

	detectBrowser() {
		this.deviceInfo = this.deviceService.getDeviceInfo();
		if(this.deviceInfo.browser === "ie" || this.deviceInfo.browser === "firefox") {
			this.isNotSupported = true;
		}
	}
}