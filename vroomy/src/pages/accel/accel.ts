
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
         } catch(err) {alert(err);}    
     this.goStop = "Start";
     // setInterval(() =>
     // {
     //     this.accel.getAllDataPoints().then((data: Array<any>) =>
     //        {
     //            console.log("All data points", data[0].x);
     //            //alert(data[0].x);
     //        }
     // )}, 1000);

     //----------------------
     // Just 
     //-----------------------

     setInterval(() => 
     {
        if (this.barChart)
        {
            var now = Date.now();
            console.log('Now requesting data points...');
            // this.accel.getDataPoints(now - 5000000, now).then((data: Array<any>) =>
            // {
            //     var accelObjs = [];
            //     for (var i = 0; i < data.length; i++)
            //     {
            //         accelObjs[i] = data[i];
            //     }
            //     this.barChart.data.datasets[0].data = accelObjs;
            //     this.barChart.update();
            // });
            var accelObjs = [];
            var data = this.accel.getCached();
            for (var i = 0; i < data.length; i++)
            {
                accelObjs[i] = data[i].z;
            }
            this.barChart.data.datasets[0].data = accelObjs;
            this.barChart.update();
            }
        }, 5000);
    }

    chartData;
    chartLastIndex;

    ionViewDidLoad()
    {
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
                try{this.accel.startRecording();} catch (err) {console.log("Failed to start recording: ", err);}  
            }
            else 
            {
                this.goStop = "Start";
                try{this.accel.stopRecording();} catch (err) {console.log("Failed to stopf recording: ", err);}  
            }
        }  
    }
