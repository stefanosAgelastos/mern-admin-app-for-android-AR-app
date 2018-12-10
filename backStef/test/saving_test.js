const assert = require('assert');
const Location = require('../models_mongo/Location');
const locationData = require('./data_test');

// Describe our tests
describe('Saving records', function () {

  // Create tests
  it('Saves a Location record to the database, simple record only name parameter', function (done) {
    
    // here we make a new Location object
    const loc = new Location({
      name: 'CPH'
    });

    // here we call the save method of the Location model instance.
    loc.save().then(function () {
      // assert that the instance is not new anymore, means that it has been saved to the db
      assert(!loc.isNew);
      done();
    });

  });
  
  // another test
  it('Saves a Location record to the database, from data_test.js ', function (done) {
    
    // here we make a new Location object
    const loc = new Location(locationData);

    // here we call the save method of the Location model instance.
    loc.save().then(function () {
      // assert that the instance is not new anymore, means that it has been saved to the db
      assert(!loc.isNew);
      done();
    });

  });

});
