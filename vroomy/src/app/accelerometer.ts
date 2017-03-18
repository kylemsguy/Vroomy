import { Storage } from './storage';


declare var navigator : any;

export class accelerometer {
    db : Storage;
    constructor() {
        if(!navigator.accelerometer){
            throw "Operation not supported.";
        }

        // set up database
        db = new Storage();

        // set up accelerometer callback
        navigator.accelerometer.watchAcceleration(
            (acceleration) => {
                this.addDataPoint(acceleration);
            },
            () => {
                console.log("Failed to get current acceleration");
            },
            {
                frequency: 100; // in ms
            }
        );
    }

    private addDataPoint(acceleration: any) {
        db.addObject(acceleration);
    }
}