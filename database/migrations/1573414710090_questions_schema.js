"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class QuestionsSchema extends Schema {
  up() {
    this.create("questions", table => {
      table.increments();
      table
        .integer("patientes_id")
        .unsigned()
        .references("id")
        .inTable("patientes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("Titulo").notNullable();
      table.integer("Resposta").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("questions");
  }
}

module.exports = QuestionsSchema;
