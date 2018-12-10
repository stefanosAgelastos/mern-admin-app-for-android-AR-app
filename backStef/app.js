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
    "Location": require("./model/Location.js"),
    "Image": require("./model/Image.js")
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

/* serve hardoced JSON. used for fast unity integration when the database is not up to date */
app.get("/hardcodedlocations", function (req, res) {
    console.log("HTTP: get hard coded json");

    var data = [{

        "Id": 1,
        "Lat": 55.6928992,
        "Lon": 12.5990655,
        "Name": "The Little Mermaid",
        "Images": [
            {
                "id": 1,
                "image_title": "The little mermaid",
                "image_url": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Copenhagen_-_the_little_mermaid_statue_-_2013.jpg/800px-Copenhagen_-_the_little_mermaid_statue_-_2013.jpg"
            },
            {
                "id": 2,
                "image_title": "Headless",
                "image_url": "https://hazlitt.net/sites/default/files/styles/article-header-image/public/field/image/mermaid.jpg?itok=8SN_VACD"
            },
            {
                "id": 3,
                "image_title": "hc Andersen",
                "image_url": "http://visithcandersen.dk/julen-2010/hcandersen-odense.jpg"
            }

        ]
    },
    {
        "Id": 2,
        "Lat": 55.706413,
        "Lon": 12.539542,
        "Name": "The round tower",
        "Images": [
            {
                "id": 1,
                "image_title": "the round tower",
                "image_url": "https://files.guidedanmark.org/files/382/304_Rundetaarn.jpg?qfix"
            },
            {
                "id": 2,
                "image_title": "The round tower - old",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24811/=36822674.jpg"
            },
            {
                "id": 3,
                "image_title": "The round tower - night",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24808/=252723.501.jpg"
            }

        ]
    },
    {
        "Id": 3,
        "Lat": 55.706413,
        "Lon": 12.519542,
        "Name": "Christiania",
        "Images": [
            {
                "id": 1,
                "image_title": "Chritiania",
                "image_url": "http://sermitsiaq.ag/files/styles/930x500/public/media/christiania.jpg?itok=OM19TO4X"
            },
            {
                "id": 2,
                "image_title": "Police",
                "image_url": "https://static01.nyt.com/images/2018/08/26/world/26Freetown1/merlin_141931104_98147bfa-d0e0-4d95-83ea-0aa9a4deab5e-superJumbo.jpg?quality=90&auto=webp"
            },
            {
                "id": 3,
                "image_title": "Chritiania - colourfull",
                "image_url": "https://farm9.static.flickr.com/8416/30153305035_725e999748_b.jpg"
            }

        ]
    },
    {
        "Id": 4,
        "Lat": 55.706413,
        "Lon": 12.539542,
        "Name": "The round tower",
        "Images": [
            {
                "id": 1,
                "image_title": "the round tower",
                "image_url": "https://files.guidedanmark.org/files/382/304_Rundetaarn.jpg?qfix"
            },
            {
                "id": 2,
                "image_title": "The round tower - old",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24811/=36822674.jpg"
            },
            {
                "id": 3,
                "image_title": "The round tower - night",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24808/=252723.501.jpg"
            }

        ]
    }, {
        "Id": 5,
        "Lat": 55.706413,
        "Lon": 12.539542,
        "Name": "The round tower",
        "Images": [
            {
                "id": 1,
                "image_title": "the round tower",
                "image_url": "https://files.guidedanmark.org/files/382/304_Rundetaarn.jpg?qfix"
            },
            {
                "id": 2,
                "image_title": "The round tower - old",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24811/=36822674.jpg"
            },
            {
                "id": 3,
                "image_title": "The round tower - night",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24808/=252723.501.jpg"
            }

        ]
    }, {
        "Id": 6,
        "Lat": 55.706413,
        "Lon": 12.539542,
        "Name": "The round tower",
        "Images": [
            {
                "id": 1,
                "image_title": "the round tower",
                "image_url": "https://files.guidedanmark.org/files/382/304_Rundetaarn.jpg?qfix"
            },
            {
                "id": 2,
                "image_title": "The round tower - old",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24811/=36822674.jpg"
            },
            {
                "id": 3,
                "image_title": "The round tower - night",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24808/=252723.501.jpg"
            }

        ]
    }, {
        "Id": 7,
        "Lat": 55.706413,
        "Lon": 12.539542,
        "Name": "The round tower",
        "Images": [
            {
                "id": 1,
                "image_title": "the round tower",
                "image_url": "https://files.guidedanmark.org/files/382/304_Rundetaarn.jpg?qfix"
            },
            {
                "id": 2,
                "image_title": "The round tower - old",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24811/=36822674.jpg"
            },
            {
                "id": 3,
                "image_title": "The round tower - night",
                "image_url": "http://denstoredanske.dk/@api/deki/files/24808/=252723.501.jpg"
            }

        ]
    },
    ]
    res.status = "200";
    res.send(data);

});



/* 
    6. Start Server 
*/
/* All OK - fire (emit) a ready event. */
app.emit('ready')
/* 
    7. Spawn workers with clusters
*/

