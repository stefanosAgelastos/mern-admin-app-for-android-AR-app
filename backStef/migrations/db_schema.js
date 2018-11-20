exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('locations', function(table) {
            table.increments('id').primary();
            table.string('lat');
            table.string('lon');
            table.string('name');
        });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('locations');
};