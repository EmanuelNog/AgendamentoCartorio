exports.up = function(knex) {
    return knex.schema.createTable('schedules', function (table) {
        table.string('id').primary();
        table.string('description').notNullable();
        table.string('date_init_string').notNullable();
        table.int('date_init_int').notNullable();
        table.string('date_final_string').notNullable();
        table.int('date_final_int').notNullable();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('schedules');
};