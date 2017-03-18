
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Accelerometer } from '../../app/accelerometer';
/*
    Generated class for the Accel page.

    See http://ionicframework.com/docs/v2/components/#navigation for more info on
    Ionic pages and navigation.
*/
@Component({
    selector: 'page-accel',
    templateUrl: 'accel.html'
})
export class AccelPage {

    accel : Accelerometer;

    constructor(public navCtrl: NavController, public navParams: NavParams) 
    {
        try {
            this.accel = new Accelerometer();
        } catch(err) {
            console.log(err);
        }
    }
>>>>>>> origin/accel

}
