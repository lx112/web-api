const Router = require("koa-router");

const { verifyLabelExists } = require("../middleware/label.middleware");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
momentRouter.get("/list", list);
momentRouter.get("/:momentId", detail);

momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
