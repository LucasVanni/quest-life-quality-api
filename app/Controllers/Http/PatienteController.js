"use strict";

const Patiente = use("App/Models/Patiente");
const Database = use("Database");
const { validateAll } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with patientes
 */
class PatienteController {
  /**
   * Show a list of all patientes.
   * GET patientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    //const patiente = Patiente.all();
    const patiente = await Patiente.query()
      .where("user_id", auth.user.id)
      .fetch();
    // const patiente = await Database.select("name", "birth_date", "pontuation")
    //   .from("patientes")
    //   .where("user_id", auth.user.id);

    return patiente;
  }

  /**
   * Create/save a new patiente.
   * POST patientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const { id } = auth.user;

      const data = request.only(["name", "birth_date"]);

      const patiente = await Patiente.create({
        ...data,
        pontuation: 0,
        user_id: id
      });

      return patiente;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  /**
   * Display a single patiente.
   * GET patientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {
    const patiente = await Patiente.query()
      .where("id", params.id)
      .where("user_id", "=", auth.user.id)
      .first();

    if (!patiente) {
      return response
        .status(404)
        .send({ message: "Nenhum registro foi encontrado" });
    }

    await patiente.load("users");

    return patiente;
  }

  /**
   * Render a form to update an existing question.
   * GET questions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async edit({ params, request, response, auth }) {
    const { name, birth_date } = request.all();

    const patiente = await Patiente.query()
      .where("id", params.id)
      .where("user_id", "=", auth.user.id)
      .first();

    if (!patiente) {
      return response
        .status(404)
        .send({ message: "Nenhum registro foi encontrado" });
    }

    patiente.name = name;
    patiente.birth_date = birth_date;
    patiente.id = params.id;

    await patiente.save();

    return patiente;
  }

  /**
   * Update patiente details.
   * PUT or PATCH patientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const { pontuation } = request.all();

    const patiente = await Patiente.query()
      .where("id", params.id)
      .where("user_id", "=", auth.user.id)
      .first();

    if (!patiente) {
      return response
        .status(404)
        .send({ message: "Nenhum registro foi encontrado" });
    }

    patiente.pontuation = pontuation;
    patiente.id = params.id;

    await patiente.save();

    return patiente;
  }

  /**
   * Delete a patiente with id.
   * DELETE patientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    const patiente = await Patiente.query()
      .where("id", params.id)
      .where("user_id", "=", auth.user.id)
      .first();

    if (!patiente) {
      return response
        .status(404)
        .send({ message: "Nenhum registro foi encontrado" });
    }

    await patiente.delete();
    return response.status(200).send({ message: "Deletou os dados" });
  }
}

module.exports = PatienteController;
