import { Storage } from './storage';

declare var navigator : any;

export class Accelerometer 
{
    db : Storage;
    recording : boolean = false;

    private watchID;

    private static _instance : Accelerometer = new Accelerometer();

    constructor() {
        if(Accelerometer._instance){
            throw new Error("Error: Instantiation failed: Use Accelerometer.getInstance() instead of new.");
        }

        if(!navigator.accelerometer){
            throw "Operation not supported.";
        }

        // set up database
        this.db = new Storage();

        Accelerometer._instance = this;
    }

    public static getInstance() : Accelerometer{
        return Accelerometer._instance;
    }


    private addDataPoint(acceleration: any) 
    {
        this.db.addObject(acceleration);

        // TODO implement pruning
        //console.log(JSON.stringify(acceleration));
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
        return this.db.getAllObjects();
    }


    /**
     * Returns data points between start_time and end_time
     * @param start_time: Start UNIX timestamp
     * @param end_time: End UNIX timestamp; defaults to now
     * @return Promise to return data
     */
    getDataPoints(start_time: number, end_time: number) 
    {
        if(!end_time) {
            end_time = Math.floor(Date.now() / 1000);
        }

        return this.db.getObjectTimestampRange(start_time, end_time);
    }
}