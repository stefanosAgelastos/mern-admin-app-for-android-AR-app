const Model = require('objection').Model;

class Location extends Model {
    static get tableName() {
        return 'locations';
    }

    static get idColumn() {
        return 'id';
      }

    static get jsonSchema() {
        return {
            type: 'object',
            require: ['location'],

            properties: {
                id: {type: "string"},
                name: {type: "string" },
                lat: {type: "string", minLength: 1},
                lon: {type: "string", minLength: 1}
            }
        }        
    }

    static get relationMappings () {
        return {
          images: {
            relation: Model.HasManyRelation,
            modelClass: Image,
            join: {
              from: 'locations.id',
              to: 'images.location_id'
            }
          }
        }
      }
}
module.exports =  Location; 
