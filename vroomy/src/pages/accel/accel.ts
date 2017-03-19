
import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
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
    @ViewChild('barCanvas') barCanvas;
    barChart;
    accel : Accelerometer;
    goStop:string ; 
    loaded:boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams) 
    {
     this.loaded = false;
     try {
            this.accel = Accelerometer.getInstance();
            
         } catch(err) {}    
     this.goStop = "Start";
     setInterval(() => 
     {
        if (this.barChart)
            {
            this.barChart.data.datasets[0].data = [7, 5, 6, 3];
            this.barChart.update();
            }
        }, 5000);
    }

    chartData;
    chartLastIndex;

    ionViewDidLoad()
      {
        alert("hello");
        var xLabel = [];
        for (var i = 0; i < 51; i ++)
        {
            xLabel[i] = i;
        }
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'line',
            data: {
                scaleLabel: "Acceleration",
                labels: xLabel,
                datasets: [{
                    data: [1, 2, 4, 5, 6, 7],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
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
    onStart = () =>
        {
            if (this.goStop == "Start")
            {
                this.goStop = "Stop";
                try{this.accel.startRecording();} catch (err) {}  
            }
            else 
            {
                this.goStop = "Start";
                try{this.accel.stopRecording();} catch (err) {}  
            }
        }


    
}