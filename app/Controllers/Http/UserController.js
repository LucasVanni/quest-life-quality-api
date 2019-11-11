"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");

class UserController {
  async create({ request, response }) {
    try {
      const erroMessage = {
        "username.required": "Esse campo é obrigatório",
        "username.unique": "Esse usuário já existe",
        "username.min": "O username deve ter mais que 5 caractéres",
        "email.required": "Esse campo é obrigatório",
        "email.unique": "Esse e-mail já existe",
        "password.required": "Esse campo é obrigatório",
        "password.min": "O password deve ter mais que 6 carácteres",
      };

      const validation = await validateAll(
        request.all(),
        {
          username: "required|min:5|unique:users",
          email: "required|email|unique:users",
          password: "required|min:6",
        },
        erroMessage,
      );

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }

      const data = request.only(["username", "email", "password"]);

      const user = await User.create(data);

      return user;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async login({ request, response, auth }) {
    try {
      const { email, password } = request.all();

      const validaToken = await auth.attempt(email, password);

      return validaToken;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }
}

module.exports = UserController;
