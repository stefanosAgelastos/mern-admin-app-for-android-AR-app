const Model = require('objection').Model;

class Image extends Model {
    static get tableName() {
        return 'images';
    }

    static get idColumn() {
        return 'id';
      }

}

  
module.exports =  Image; 

