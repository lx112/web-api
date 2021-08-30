const fs = require("fs");
const { AVATAR_PATH } = require("../constans/file-path");
const userService = require("../service/user.service");
const fileService = require("../service/file.service");
class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;

    const result = await userService.create(user);
    ctx.body = result;
  }
  async avatarInfo(ctx) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
