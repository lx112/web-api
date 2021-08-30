const Router = require("koa-router");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { create, remove, list } = require("../controller/comment.controller");
const commentRouter = new Router({ prefix: "/comment" });

commentRouter.post("/", verifyAuth, create);
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);
commentRouter.get("/", list);

module.exports = commentRouter;
