import { Storage } from './storage';

declare var navigator : any;

export class Accelerometer 
{
    db : Storage;
    recording : boolean = false;

    private watchID;

    constructor() {
        if(!navigator.accelerometer){
            throw "Operation not supported.";
        }

        // set up database
        this.db = new Storage();
    }


    private addDataPoint(acceleration: any) 
    {
        this.db.addObject(acceleration);
        console.log(JSON.stringify(acceleration));
    }

    startRecording(){
        // set up accelerometer callback
        this.watchID = navigator.accelerometer.watchAcceleration(
            (acceleration) => {
                this.addDataPoint(acceleration);
            },
            () => {
                console.log("Failed to get current acceleration");
            },
            {
                frequency: 100 // in ms
            }
        );
    }

    stopRecording(){
        navigator.accelerometer.clearWatch(this.watchID);
    }

    getAllDataPoints(){
        return db.getAllObjects();
    }


    /**
     * Returns data points between start_time and end_time
     * @param start_time: Start UNIX timestamp
     * @param end_time: End UNIX timestamp; defaults to now
     * @return array of data points
     */
    getDataPoints(start_time: number, end_time: number) 
    {
        if(!end_time) {
            end_time = Math.floor(Date.now() / 1000);
        }

        // TODO finishme
    }
}