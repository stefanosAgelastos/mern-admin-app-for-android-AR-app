
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('audios', function (table) {
        table.increments('id').primary();
        table.string('audio_title');
        table.string('audio_url');
        table.integer('locations_id').references('locations.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('audios');
};
