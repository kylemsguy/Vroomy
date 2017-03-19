import { Storage } from './storage';

declare var navigator : any;

export class Accelerometer 
{
    db : Storage;
    recording : boolean = false;

    private watchID;

    private static _instance : Accelerometer;

    constructor() {
        if(Accelerometer._instance){
            throw new Error("Error: Instantiation failed: Use Accelerometer.getInstance() instead of new.");
        }

        // set up database
        this.db = new Storage();

    }

    public static getInstance() : Accelerometer{
        if (Accelerometer._instance) return Accelerometer._instance;
        if (navigator.accelerometer) {
            Accelerometer._instance = new Accelerometer();
        } else {
            Accelerometer._instance = new BrowserAccelerometer();
        }
        return Accelerometer._instance;
    }


    protected addDataPoint(acceleration: any) 
    {
        this.db.addObject(acceleration);

        // TODO implement pruning
        //console.log(JSON.stringify(acceleration));
    }

    startRecording(){
        if(!navigator.accelerometer){
            throw "Operation not supported.";
        }
        // set up accelerometer callback
        console.log('adding callback');
        this.watchID = navigator.accelerometer.watchAcceleration(
            (acceleration) => {
                this.addDataPoint(acceleration);
                console.log('adding', acceleration);
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

export class BrowserAccelerometer extends Accelerometer {
    bindMe = this.handleEvent.bind(this);
    startRecording() {
        setTimeout(()=>{
            window.addEventListener("devicemotion", this.bindMe);
        }, 1000);
    }
    stopRecording() {
        window.removeEventListener("devicemotion", this.bindMe);
    }
    handleEvent(event) {
        let a = event.accelerationIncludingGravity;
        this.addDataPoint({x: a.x, y: a.y, z: a.z, timestamp: Date.now()});
    }
}
window["Accelerometer"] = Accelerometer; // for debugging