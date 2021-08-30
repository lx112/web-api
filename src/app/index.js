const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const errorHandle = require("./error-handle");
const useRoute = require("../router");

const app = new Koa();
app.use(bodyparser());
useRoute(app);

app.on("error", (err, ctx) => errorHandle(err, ctx));

module.exports = app;
