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
	isMobile: boolean = false;

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

		if(this.deviceInfo.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)) {
			this.isMobile = true;
		}
	}


}