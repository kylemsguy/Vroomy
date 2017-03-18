import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var navigator : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    currentAccelArray : Array<any> = []

    timestamp : number = NaN;

    constructor(public navCtrl: NavController) {
        if(navigator.accelerometer){
            navigator.accelerometer.watchAcceleration(
                (acceleration) => {
                    this.updateRunningAverage(acceleration);
                    this.timestamp = acceleration.timestamp;
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

    updateRunningAverage = (accel) => {
        if(this.currentAccelArray.length >= 10){
            this.currentAccelArray.shift();
        }
        this.currentAccelArray.push(accel);
    }

    getAccelRunningAvgX = () => {
        if(this.currentAccelArray.length == 0){
            return NaN;
        }
        return this.currentAccelArray.reduce((acc, val) => {
            return acc + val.x;
        }, 0) / this.currentAccelArray.length;
    }

    getAccelRunningAvgY = () => {
        if(this.currentAccelArray.length == 0){
            return NaN;
        }
        return this.currentAccelArray.reduce((acc, val) => {
            return acc + val.y;
        }, 0) / this.currentAccelArray.length;
    }

    getAccelRunningAvgZ = () => {
        if(this.currentAccelArray.length == 0){
            return NaN;
        }
        return this.currentAccelArray.reduce((acc, val) => {
            return acc + val.z;
        }, 0) / this.currentAccelArray.length;
    }

    debugGetStringifiedArray = () => {
        return JSON.stringify(this.currentAccelArray)
    }

}
