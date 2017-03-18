import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
/*
  Generated class for the Stats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
	@ViewChild('barCanvas') barCanvas;
	barChart;

  infoInputed:boolean = true;
  title = localStorage.getItem("make") + " " + localStorage.getItem("model");
	textAcceleration:string = "Acceleration Data";

  	constructor(public navCtrl: NavController) 
  	{}
  	ionViewDidLoad()
  	{
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ["Braking/Acceleration (%)", "Est. Excess Acceleration (%)"],
                datasets: [{
                    data: [25, 19],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
            	legend: {
        				display: false
    				},
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
    });
}
}

