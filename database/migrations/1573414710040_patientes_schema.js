"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PatientesSchema extends Schema {
  up() {
    this.create("patientes", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name", 80).notNullable();
      table.date("birth_date").notNullable();
      table
        .integer("pontuation")
        .notNullable()
        .defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("patientes");
  }
}

module.exports = PatientesSchema;
