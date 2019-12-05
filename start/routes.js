"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/create", "UserController.create");
Route.post("/login", "UserController.login");

Route.resource("/patiente", "PatienteController")
  .apiOnly()
  .middleware("auth");

Route.get("/patiente/:id/edit", "PatienteController.edit").middleware("auth");
