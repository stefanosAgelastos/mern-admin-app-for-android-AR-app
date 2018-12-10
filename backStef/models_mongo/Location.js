const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const LocationSchema = new Schema({
    name: String,
    // maybe replace these with coordinates: { lon: Number, lat: Number }
    lat: Number,
    lon: Number,
    // todo: define the schema of the children better.
    content: Object
});

const Location = mongoose.model('locations', LocationSchema);

module.exports = Location;
