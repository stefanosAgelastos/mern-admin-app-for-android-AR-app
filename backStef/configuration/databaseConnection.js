/* node-postgres is a collection of node.js modules for interfacing with your PostgreSQL database.*/
const { Client } = require('pg');
/* this is a node module for running scripts on the console, the {} I am not sure why it is there */
const { exec } = require('child_process');



/* THE CLASS EXPOSES 2 METHODS*/
module.exports = {

    /* SETS THE DATABASE_URL when in LOCAL_DEV */
    /* you have to be logged in to Heroku CLI locally*/
    getDataBaseURLonLocal: function () {
        return new Promise(function (resolve, reject) {
            /*  execute console command, 
            retreives the database uri from Heroku CLI in DEV */
            exec('heroku config:get DATABASE_URL -a gps-tourist-app', (err, out) => {
                if (err) {
                    console.error("ERROR in getting URL from Heroku CLI: " + err)
                    reject(err);
                }
                else {
                    /* If there is no error, we store the uri */
                    console.log("Got URL from Heroku CLI: " + out)
                    /* remove last character,  its a new line character*/
                    //out = out.substring(0, out.length - 1);
                    /* add parameter to enable ssl*/
                    //var connectionString = out + "?ssl=true";
                    /* set environment variables */
                    //process.env['DATABASE_URL'] = out;
                    resolve(out);
                }
            })
        })
    },

    /* RETURNS THE CONNECTION URL IF IT CONNECTS TO THE DATABASE */
    isConnecting: function(urlString){
        return new Promise( function (resolve, reject) {
            /* create a client with the database connection uri, ssl must be on. */
            const client = new Client({
                connectionString: urlString,
                ssl: true
            });
    
            /* connect to DB */
            client.connect((err) => {
                if (err) {
                    console.error('ERROR url is not connecting', err.stack)
                    reject(err);
                } else {
                    console.log("Url is connecting");
                    resolve(urlString);
                }
            });
        })
    }

}