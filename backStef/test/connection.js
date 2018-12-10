const mongoose = require('mongoose');

<<<<<<< HEAD
// this module I think is used only by mocha 
=======
// this module I think is used only by mocha
>>>>>>> ed0a9b1... tests for mongo db. just reasearching at the moment

// ES6 Promises, is set as the mongooses promise object
mongoose.Promise = global.Promise;

// Connect to db before tests run
// this is a mocha hook, wow new stuff
before(function (done) {

    // Connect to mongodb
    // if there is no testDB, it creates it, easy
    // (node:39598) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, 
    // pass option { useNewUrlParser: true } to Mongo Client.connect.
    mongoose.connect('mongodb://localhost/testDB', { useNewUrlParser: true });
    //the .once sets an event listener for one event of type 'open'
    mongoose.connection.once('open', function () {
        console.log('Connection has been made, now make fireworks...');
        done();
    })
        // the .on sets a listener for any event type 'error'
        .on('error', function (error) {
            console.log('Connection error:', error);
        });

});

// Drop the locations collection before each test
beforeEach(function (done) {
    // Drop the collection
    mongoose.connection.collections.locations.drop(function () {
        done();
    });
});
