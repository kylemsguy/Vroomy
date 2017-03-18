export class Storage {
	private databaseName : string = 'accelDB';
	private databaseVersion : number = 1;

	constructor() {
		createDatabase();
	}

    private createDatabase(){
        var db;
        var openRequest = window.indexedDB.open(databaseName, databaseVersion);

        openRequest.onerror = this.openDBError;

        openRequest.onupgradeneeded = function (event) {
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

    addObject(obj){
    	var db;
        var openRequest = window.indexedDB.open(databaseName, databaseVersion);
        
        openRequest.onerror = this.openDBError;

        openRequest.onSuccess = (event) => {
        	var acceldataStore = db.transaction('acceldata', 'readwrite').objectStore('acceldata');
        	var request = acceldataStore.add(obj);
        }
    }

    private openDBError(event){
        console.log(openRequest.errorCode);
    }

}