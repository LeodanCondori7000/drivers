const { Router } = require("express");
const {
  getDriversHandler,
  getDriverHandler,
  createDriverHandler,
} = require("../handlers/driversHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);

driversRouter.get("/:idDriver", getDriverHandler);

driversRouter.post("/", createDriverHandler);

module.exports = driversRouter;
