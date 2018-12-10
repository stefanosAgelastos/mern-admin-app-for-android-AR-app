const assert = require('assert');
const Location = require('../models_mongo/Location');
const locationData = require('./data_test');



// Describe our tests
describe('Finding records', function () {

  // Add the location record to test against before running tests
  beforeEach(function (done) {
    // instantiate Location with full schema test data
    const loc = new Location(locationData);
    // save the record
    loc.save().then(function () {
      assert(!loc.isNew);
      done();
    });
  });

  // Create tests
  it('Finds a record from the database, assert name', function (done) {

    Location.findOne({ name: locationData.name}).then(function (result) {
      assert(result.name === locationData.name);
      done();
    }).catch(err => {
      console.log(err)
      assert(false);
      done();
    });
  });

  // another test
  it('Finds a record from the database, assert lat', function (done) {

    Location.findOne({ name: locationData.name }).then(function (result) {
      assert(result.lat === locationData.lat);
      done();
    });

  });
  // another test
  it('Finds a record from the database, assert lon', function (done) {

    Location.findOne({ name: locationData.name }).then(function (result) {
      assert(result.lon === locationData.lon);
      done();
    });

  });
  // another test
  it('Finds a record from the database, assert content[0]', function (done) {

    Location.findOne({ name: locationData.name }).then(function (result) {
      assert(result.content[0].image_title === locationData.content[0].image_title);
      done();
    });

  });
  // another test
  it('Finds a record from the database, assert content[1]', function (done) {

    Location.findOne({ name: locationData.name }).then(function (result) {
      assert(result.content[1].image_title === locationData.content[1].image_title);
      done();
    });

  });

  // another test
  it('Finds a record from the database, assert content[2]', function (done) {
    Location.findOne({ name: locationData.name }).then(function (result) {
      assert(result.content[2].image_title === locationData.content[2].image_title);
      done();
    });

  });

});
