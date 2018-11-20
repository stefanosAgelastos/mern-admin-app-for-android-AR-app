/* node-postgres is a collection of node.js modules for interfacing with your PostgreSQL database.*/
const { Client } = require('pg');
/* this is a node module for running scripts on the console, the {} I am not sure why it is there */
const { exec } = require('child_process');


/* THE CLASS EXPOSES 2 METHODS*/
module.exports = {
    /* SETS AND RETURNS THE DATABASE_URL */
    setDataBaseURLonLocal: function () {
        /* execute console command, 
        retreives the database uri from Heroku CLI in DEV, you have to be logged in
        and if no error then it tries to get a connection */
        exec('heroku config:get DATABASE_URL -a gps-tourist-app', (err, out) => {
            if (err) {
                console.error("ERROR in getting URL from Heroku CLI: " + err)
                return undefined;
            }
            else {
                /* If there is no error, we store the uri */
                console.log("Got URL from Heroku CLI: " + out)
                /* remove last character,  its a new line character*/
                out = out.substring(0, out.length - 1);
                /* add parameter to enable ssl*/
                //var connectionString = out + "?ssl=true";
                /* set environment variables */
                process.env['DATABASE_URL'] = out;
                return out;                
            }
        });
    },
    /* RETURNS THE CONNECTION STATUS OF THE STORED DATABASE_URL */
    isConnecting: function(){
        /* create a client with the database connection uri, ssl must be on. */
        const client = new Client({
            connectionString: connectionString
        });

        /* connect to DB */
        client.connect((err) => {
            if (err) {
                console.error('ERROR in connection with DB', err.stack)
                return false;
            } else {
                console.log("DATABASE_URL is connecting: " + process.env.DATABASE_URL);
                return true;
            }
        });
    }
}