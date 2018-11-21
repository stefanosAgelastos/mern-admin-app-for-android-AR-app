/* 
    HOW THIS SHOULD BE STRUCTURED:
    1. Require dependencies
    2. Configure Settings
    3. Connect to database
    4. Define middleware
    5. Define Routes
    6. Start Server
    7. Spawn workers with clusters

*/

/* 
    1. REQUIRE DEPENDENCIES
*/
/* "batteries included" SQL query builder for Postgres etc */
const Knex = require("knex");
/* Main configuration module */
const MainConfig = require("./configuration/MainConfig");
const express = require("express");
const http = require('http');
//const server = require('http').Server(app);
/* Parse incoming request bodies in a middleware before your handlers, available under the req.body property. */
const bodyParser = require('body-parser');

/* 
    2. CONFIGURE SETTINGS
*/

let app = express();
/* *note* 
app is an instance of EventEmitter 
so we can easily subscribe to events 
aka: listen for the 'ready' event 
*/
app.on('ready', function () {
    /* initialize server */
    /* The || 3000, is for development, when there is no PORT environment variable set. */
    app.listen(process.env.PORT || 3000, function (err) {
        if (err) {
            console.log("Error starting the server", err);
        }
        console.log("Starting the server on port ", this.address().port);
    });
});

/* 
    3. CONNECT TO DATABASE
*/
/* Provide Knex with appropirate configuration of database */
async function connectDatabase() {
    console.log("Started async method for connecting Knex");
    const databaseConfig = await MainConfig.getAndSetDATABASE_URL();
    const knex = Knex(databaseConfig);
    const objection = require("objection");
    const Model = objection.Model;
    // give the knex connection to objection.js
    Model.knex(knex);
    // convenience object that contains all the models and easy access to knex
    const db = {
        "Knex": knex,
        "Location": require("./model/Location.js")
    }
}
//connectDatabase().then(    // All OK - fire (emit) a ready event. 
//app.emit('ready'));


/* 
    4. Define middleware
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



/* 
    5. Define Routes
*/
/* Serves all locations */
app.get("/location", function (req, res) {
    db.Location.query().select()
        .then(data => {
            console.log(data);
            res.status = "200";
            res.send(data);
        })
        .catch(err => {
            console.log(err)
        });
});

/* 
    6. Start Server 
*/

/* 
    7. Spawn workers with clusters
*/


/* initialize server */
/* The || 3000, is for development, when there is no PORT environment variable set. */
/* server.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log("Error starting the server", err);
    }
    console.log("Starting the server on port", server.address().port);
}); */

/* this methods inserts a location to the database */
/* db.Location.query().insert({
    "lat": 'testLat2',
    "lon": 'testLon2',
    "name": 'TEST2'
})
    .then(persistedLocation => {
        console.log(persistedLocation);
    }).catch(err => {
        console.log(err);
    });
 */




//db.Location.query().select().then(data => { console.log(data); }).catch(err => { console.log(err) });



/* this methods inserts a location to the database */
/* db.Location.query().insert({
    "lat": 'testLat2',
    "lon": 'testLon2',
    "name": 'TEST2'
})
    .then(persistedLocation => {
        console.log(persistedLocation);
    }).catch(err => {
        console.log(err);
    }); */