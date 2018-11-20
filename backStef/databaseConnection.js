/* node-postgres is a collection of node.js modules for interfacing with your PostgreSQL database.*/
const { Client } = require('pg');
/* this is a node module for running scripts on the console, the {} I am not sure why it is there */
const { exec } = require('child_process');
/* Functions for dealing with a PostgresSQL connection string */
/* var parse = require('pg-connection-string').parse; */

exports.getUrl = function () {
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
            /* remove last character,  its a new line character*/
            out = out.substring(0, out.length - 1);
            var connectionString = out + "?ssl=true";
            /* create a client with the database connection uri, ssl must be on. */
            const client = new Client({
                connectionString: connectionString
            });

            /* connect to DB */
            client.connect((err) => {
                if (err) {
                    console.error('connection error', err.stack)
                } else {
                    console.log('connected')
                    //Takes a URL connection string (with every element being optional)
                    //and converts it into an object that contains only what's specified
                    /* set environment variables */
                    return connectionString;
                    /* process.env['DATABASE_URL'] = connectionString;
                    console.log("DATABASE_URL enviroment variable now is: " + process.env.DATABASE_URL); */
                }
            });
        }
    });
}