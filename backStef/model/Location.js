const Model = require('objection').Model;

class Location extends Model {
    static get tableName() {
        return 'locations';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            require: ['location'],

            properties: {
                id: {type: "string"},
                name: {type: "string" },
                lat: {type: "string", minLength: 1},
                lon: {type: "string", minLength: 1},
                link: {type: "string", minLength: 1}
            }
        }        
    }
}

module.exports = Location;