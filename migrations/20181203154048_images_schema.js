
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('images', function (table) {
            table.increments('id').primary();
            table.string('image_title');
            table.string('image_url');
            table.integer('locations_id').references('locations.id');
        });
};

exports.down = function (knex, Promise) {
    return knex.schema
    .dropTableIfExists('images');
};
