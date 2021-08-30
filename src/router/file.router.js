const Router = require("koa-router");
const fileRouter = new Router({ prefix: "/uploads" });

const { verifyAuth } = require("../middleware/auth.middleware");
const {
  avatarHandle,
  pictureHandle,
  pictureResize,
} = require("../middleware/file.middleware");

const {
  saveAvatarInfo,
  savePictureInfo,
} = require("../controller/file.controller");

fileRouter.post("/avatar", verifyAuth, avatarHandle, saveAvatarInfo);
fileRouter.post(
  "/picture",
  verifyAuth,
  pictureHandle,
  pictureResize,
  savePictureInfo
);

module.exports = fileRouter;
