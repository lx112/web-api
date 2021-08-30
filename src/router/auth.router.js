const Router = require("koa-router");
const { verifyLogin } = require("../middleware/auth.middleware");
const authRouter = new Router();

const { login } = require("../controller/auth.controller.js");

authRouter.post("/login", verifyLogin, login);

module.exports = authRouter;
