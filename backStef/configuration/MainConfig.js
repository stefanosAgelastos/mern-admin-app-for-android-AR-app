/* Local module for database*/
const database = require("./databaseConnection");
/* standard file of knex that contains the database connection data */
const knexConfig = require("./knexfile.js");

module.exports = {
    getAndSetDATABASE_URL: function () {
        return new Promise(function (resolve, reject) {
            /* Figure out in which environment you are running */
            if (process.env.NODE_ENV == "LOCAL_DEV") {
                /* This is the local dev environment. It is your PC. */
                console.log("Running on LOCAL_DEV mode. Initiating script for setting DATABASE_URL.");
                database.getDataBaseURLonLocal()
                    .then(result => {
                        return database.isConnecting(result);
                    })
                    .then(function (result) {
                        console.log("Set DATABASE_URL, for LOCAL_DEV mode");
                        process.env.DATABASE_URL = result;
                        knexConfig.development.connection = process.env.DATABASE_URL;
                        resolve(knexConfig.development);
                        console.log("Resolved knexConfig.development");
                    })
                    .catch(err => reject(err));
            } else {
                /* For the moment the other option is staging on Heroku */
                database.isConnecting(knexConfig.staging.connection)
                    .then(function () {
                        resolve(knexConfig.staging);
                        console.log("Resolved knexConfig.staging");
                    }).catch(err => reject(err));
            }

        })
    }
}