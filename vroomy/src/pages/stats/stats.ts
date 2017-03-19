import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Accelerometer } from '../../app/accelerometer'

function segmentRuns(indata: any[]) : Array<any>[] {
    let out = [];
    let slicestart = 0;
    for (var i = 1; i < indata.length; i++) {
        if (indata[i].timestamp - indata[i-1].timestamp >= 15000) { // 15 seconds gap
            out.push(indata.slice(slicestart, i));
            slicestart = i;
        }
    }
    out.push(indata.slice(slicestart, i));
    return out;
}
const kMinAccel = 2;
const kMinDecel = -2;
function countEvents(indata) {
    var hardaccel = [];
    var cumulativeAccel = 0;
    var cumulativeDecel = 0;
    for (var i = 0; i < indata.length; i++) {
        var accels = indata[i];
        if (accels.z > 8 && (i == 0 || (accels.timestamp - indata[i-1].timestamp) > 2000)) {
            hardaccel.push(accels);
        }
        // crappiest discrete integration ever.
        if (i != 0 && accels.z > kMinAccel) {
            cumulativeAccel += (accels.z + indata[i-1].z)*0.5*(accels.timestamp - indata[i-1].timestamp);
        }
        if (i != 0 && accels.z < kMinDecel) {
            cumulativeDecel -= (accels.z + indata[i-1].z)*0.5*(accels.timestamp - indata[i-1].timestamp);
        }
    }
    return {hardaccel: hardaccel, cumulativeAccel: cumulativeAccel, cumulativeDecel: cumulativeDecel};
}

function eventsToChart(events) {
    return events.map(a=>{return {x: a.timestamp, y: a.z}});
}

/*
  Generated class for the Stats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-stats',
    templateUrl: 'stats.html',
})
export class StatsPage {
    accelChartDataSets = [{label: "wat", data: [{x: -1, y: 1}, {x:0, y: 5}]}];
    runs: any[] = null;

    infoInputed:boolean = true;
    title = localStorage.getItem("make") + " " + localStorage.getItem("model");
    textAcceleration:string = "Acceleration Data";
    selectedRunIndex = 0;
    selectedRun = null;
    constructor(public navCtrl: NavController, public navParams: NavParams) {}
    eventCount = {cumulativeAccel: 0, cumulativeDecel: 0, hardaccel: []};

    ionViewDidLoad() {
        console.log('ionViewDidLoad StatsPage');
    }

    ionViewWillEnter() {
        //accelService.getAllDataPoints().then(runsData => {
let runsData = [{timestamp: 0, z: 0}, {timestamp: 1, z: 9}, {timestamp: 2, z: 5}, {timestamp: 100000, z: 0}, {timestamp: 100001, z: 5}, {timestamp: 100002, z: 5}];
            this.runs = segmentRuns(runsData);
            if (!this.selectedRun) this.selectRun(0);
        //};
    }
    formatRunName(run) {
        if (!this.runs[run]) return "WHAT";
        return new Date(this.runs[run][0].timestamp).toString();
    }
    selectRun(theRun) {
        this.selectedRunIndex = theRun;
        this.selectedRun = this.runs[this.selectedRunIndex];
        this.eventCount = countEvents(this.selectedRun);
        this.accelChartDataSets = [{label: "acceleration", data: eventsToChart(this.runs[theRun])}, {label: "heavy acceleration", data: eventsToChart(this.eventCount.hardaccel)}];
console.log(this.accelChartDataSets);
    }

    getOptimalAccelBrakingRatio() {
        return "1.0";
    }
}

