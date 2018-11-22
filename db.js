/* "batteries included" SQL query builder for Postgres etc */
const Knex = require("knex");
/* standard file of knex that contains the database connection data */
const knexConfig = require("./knexfile.js");




module.exports = {
    delete: function () {
        const knex = Knex(knexConfig.development);
        knex('locations').del().then(out => {
            console.log(out);
        }).catch(err => {
            console.log(err);
        });
    },
    create: function () {
        const knex = Knex(knexConfig.development);
        knex.schema
            .createTable('locations', function (table) {
                table.increments('id').primary();
                table.string('name');
                table.string('lat');
                table.string('lon');
                table.string('link');
            }).then(out => {
                console.log(out);
            }).catch(err => {
                console.log(err);
            });
    
    },
    insert:  function () {
        const knex = Knex(knexConfig.development);
        knex('locations').insert([
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
            .then(persistedLocation => {
                console.log(persistedLocation);
            }).catch(err => {
                console.log(err);
            });
    }

}

module.exports.create();

require('make-runnable');