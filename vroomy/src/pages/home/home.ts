import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var navigator : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    currentAccel : any = {
        x: NaN,
        y: NaN,
        z: NaN,
        timestamp: "Failed."
    };

    constructor(public navCtrl: NavController) {
        navigator.accelerometer.getCurrentAcceleration(
            (acceleration) => {
                this.currentAccel = acceleration;
            },
            () => {
                console.log("Failed to get current acceleration");
            },
        );

        navigator.accelerometer.watchAcceleration(
            (acceleration) => {
                this.currentAccel = acceleration;
            },
            () => {
                console.log("Failed to get current acceleration");
            },
            {
                frequency: 100
            }
        );
    }

}
