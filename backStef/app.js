const objection = require("objection");
/* "batteries included" SQL query builder for Postgres etc */
const Knex = require("knex");
/* standard file of knex that contains the database connection data */
const knexConfig = require("./knexfile.js");
const knex = Knex(knexConfig.development);

const express = require("express");
let app = express();
const server = require('http').Server(app);
/* Parse incoming request bodies in a middleware before your handlers, available under the req.body property. */
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const Model = objection.Model;

// give the knex connection to objection.js
Model.knex(knex);

// convenience object that contains all the models and easy access to knex
const db = {
    "Knex": knex,
    "Location": require("./model/Location.js")
}

/* initialize server */
server.listen("3001", function (err) {
    if (err) {
        console.log("Error starting the server", err);
    }
    console.log("Starting the server on port", server.address().port);
});

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