/* node-postgres is a collection of node.js modules for interfacing with your PostgreSQL database.*/
const { Client } = require('pg');
/* this is a node module for running scripts on the console, the {} I am not sure why it is there */
const { exec } = require('child_process');


exports.getWorkingURI = function() {

        /* execute console command, 
        retreives the database uri from Heroku CLI in DEV, you have to be logged in
        and if no error then it tries to get a connection */
        exec('heroku config:get DATABASE_URL -a gps-tourist-app', (err, out) => {
            if (err) {
                console.error(err)
            }
            else {
                /* If there is no error, we store the uri */
                console.log(out)
                /* create a client with the database connection uri, ssl must be on. */
                const client = new Client({
                    connectionString: out,
                    ssl: true
                });

                /* connect to DB */
                client.connect((err) => {
                    if (err) {
                        console.error('connection error', err.stack)
                    } else {
                        console.log('connected')
                        /* If there is no error, return the right credentials */
                        return {
                            connectionString: out,
                            ssl: true
                        }
                    }
                });
            }
        });

}