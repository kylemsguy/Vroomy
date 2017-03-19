export class Storage {
    public db: IDBDatabase;
    private IndxDb: IDBFactory;    
	private databaseName : string = 'accelDB';
	private databaseVersion : number = 1;

	constructor() {
        this.IndxDb = window.indexedDB;
		this.createDatabase();
	}

    private createDatabase(){
        var openRequest : IDBOpenDBRequest = this.IndxDb.open(this.databaseName, this.databaseVersion);

        openRequest.onsuccess = (event : any) => {
            this.db = event.target.result;
        }

        openRequest.onerror = this.openDBError;

        openRequest.onupgradeneeded = function (event : any) {
            // This is either a newly created database, ordatabaseVersion a new version number
            // has been submitted to the open() call.
            var db = event.target.result;
            db.onerror = function () {
                console.log(db.errorCode);
            };

            // Create an object store and indexes. A key is a data value used to organize
            // and retrieve values in the object store. The keyPath option identifies where
            // the key is stored. If a key path is specified, the store can only contain
            // JavaScript objects, and each object stored must have a property with the
            // same name as the key path (unless the autoIncrement option is true).
            var store = db.createObjectStore('acceldata', {
            	keyPath: 'key',
            	autoIncrement: true
            });

            // Define the indexes we want to use. Objects we add to the store don't need
            // to contain these properties, but they will only appear in the specified
            // index of they do.
            //
            // syntax: store.createIndex(indexName, keyPath[, parameters]);
            //
            // All these values could have duplicates, so set unique to false
            store.createIndex('timestamp', 'timestamp', { unique: false });
        };
    }

    addObject(obj : any){
    	var acceldataStore = this.db.transaction('acceldata', 'readwrite').objectStore('acceldata');
    	var request = acceldataStore.add(obj);
    }

    addObject2(obj : any){
        // use only if addObject doesn't work
        var openRequest = this.IndxDb.open(this.databaseName, this.databaseVersion);
        
        openRequest.onerror = this.openDBError;

        openRequest.onsuccess = (event : any) => {
            var db = event.target.result;
            var acceldataStore = db.transaction('acceldata', 'readwrite').objectStore('acceldata');
            var request = acceldataStore.add(obj);
        }
    }

    getAllObjects(){
        var trans : IDBTransaction = this.db.transaction('acceldata');
        var store : IDBObjectStore = trans.objectStore('acceldata');
        var request = store.openCursor();
        var entries = [];

        var promise = new Promise((callback) => {
            trans.oncomplete = () => {
                callback(entries);
            }
        });

        request.onsuccess = (evt : any) => {
            var cursor = evt.target.result;
            if (cursor) {
                var point = cursor.value;

                entries.push(point);
                
                cursor.continue();
            }
        };

        return promise;
    }

    getObjectTimestampRange(start_time : number, end_time : number){
        var range : IDBKeyRange = IDBKeyRange.bound(start_time, end_time);
        var trans : IDBTransaction = this.db.transaction('acceldata');
        var store : IDBObjectStore = trans.objectStore('acceldata');
        var request = store.openCursor(range);
        var entries = [];

        var promise = new Promise((callback) => {
            trans.oncomplete = () => {
                callback(entries);
            }
        });

        request.onsuccess = (evt : any) => {
            var cursor = evt.target.result;
            if (cursor) {
                var point = cursor.value;

                entries.push(point);
                
                cursor.continue();
            }
        };

        return promise;
    }

    private openDBError(event : any){
        console.log("Failed to open database");
    }

}