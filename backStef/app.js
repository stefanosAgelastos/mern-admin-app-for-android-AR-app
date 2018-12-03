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
/* Objection.js is an ORM for Node.js that aims to stay out of your way
An easy declarative way of defining models and relationships between them
Simple and fun way to fetch, insert, update and delete objects using the full power of SQL
Powerful mechanisms for eager loading, inserting and upserting object graphs
A way to store complex documents as single rows
Completely Promise based API
Easy to use transactions
Optional JSON schema validation*/
const objection = require("objection");

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
/* convenience object that contains all the models and easy access to knex */
const db = {
    "Knex": undefined,
    "Location": require("./model/Location.js")
}
/* Provide Knex with appropirate configuration of database */
async function connectDatabase() {
    console.log("Started async method for setting Knex connection");
    const databaseConfig = await MainConfig.getAndSetDATABASE_URL();
    console.log("Setting to Knex the databaseConfig: ");
    console.log(databaseConfig);
    const knex = Knex(databaseConfig);
    const Model = objection.Model;
    // give the knex connection to objection.js
    Model.knex(knex);
    db.Knex = knex;
}
connectDatabase();


/* 
    4. Define middleware
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



/* 
   5 . Define Routes
*/
/* Serves index file */
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

/* Serves all locations */
app.get("/location", function (req, res) {
    console.log("HTTP: serve all locations");
    db.Location.query().select()
        .then(data => {
            console.log("OK");
            res.setHeader('Content-Type', 'application/json');
            res.status = "200";
            res.json(JSON.stringify(data, null, 3));
        })
        .catch(err => {
            console.log(err)
            res.status = 500;
            res.send(err);
        });
});

/* DELETES ALL LOCATIONS */
app.delete("/location", function (req, res) {
    console.log("HTTP: delete all locations");

    db.Location.query().del().then(data => {
        console.log("OK");
        res.sendStatus(200);
    })
        .catch(err => {
            console.log(err)
            res.status = 500;
            res.send(err);
        });
});

/* ADD ONE NEW LOCATION */
app.post("/location", function (req, res) {
    console.log("HTTP: add one location");
    console.log(req.body);

    db.Location.query().insert(req.body).then(data => {
        console.log("OK");
        res.status = "200";
        res.send(data);
    })
        .catch(err => {
            console.log(err)
            res.status = 500;
            res.send(err);
        });
});
/* ADD THREE DEFAULT LOCATIONS */
app.post("/dump", function (req, res) {
    console.log("HTTP: add default locations");

    db.Location.query().insert([
        {
            "name": 'Rundetaarn',
            "lat": '1',
            "lon": '2',
            "link": 'https://files.guidedanmark.org/files/382/304_Rundetaarn.jpg?qfix'
        },
        {
            "name": 'christiania',
            "lat": '2',
            "lon": '2',
            "link": 'http://sermitsiaq.ag/files/styles/930x500/public/media/christiania.jpg?itok=OM19TO4X'
        },
        {
            "name": 'the_little_mermaid_statue',
            "lat": '3',
            "lon": '3',
            "link": 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Copenhagen_-_the_little_mermaid_statue_-_2013.jpg/800px-Copenhagen_-_the_little_mermaid_statue_-_2013.jpg'
        }
    ])
        .then(data => {
            console.log("OK");
            res.sendStatus(200);
        }).catch(err => {
            console.log(err)
            res.status = 500;
            res.send(err);
        });
});



/* 
    6. Start Server 
*/
/* All OK - fire (emit) a ready event. */
app.emit('ready')
/* 
    7. Spawn workers with clusters
*/

