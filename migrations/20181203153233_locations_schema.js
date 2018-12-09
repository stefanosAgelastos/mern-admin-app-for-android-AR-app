
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('locations', function(table) {
        table.increments('id').primary();
        table.string('location_title');
        table.string('lat');
        table.string('lon');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('locations');
};
