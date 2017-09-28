import { Component } from '@angular/core';
import { WindowRef } from './windowRef';

@Component({
    selector: 'beep',
    template: ''
})

export class AudioComponent {

    audioCtx;

    okcounter = 0;
    oklock = true;

    constructor(private winRef: WindowRef) {
        this.audioCtx = new (winRef.nativeWindow.AudioContext || winRef.nativeWindow.webkitAudioContext)();
    }
}