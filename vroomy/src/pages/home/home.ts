import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var navigator : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

	currentAccel: number;

    constructor(public navCtrl: NavController) {
    	navigator.accelerometer.getCurrentAcceleration(
    		(acceleration) => {
    			this.currentAccel = acceleration;
    		},
    		() => {
    			this.currentAccel = NaN;
    		},
    	);
    }

}
