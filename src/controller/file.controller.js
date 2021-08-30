const { APP_HOST, APP_PORT } = require("../app/config");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
class FileController {
  async saveAvatarInfo(ctx) {
    console.log(ctx.req.file);
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    await fileService.createAvatar(filename, mimetype, size, id);

    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);

    ctx.body = "上传头像成功";
  }

  async savePictureInfo(ctx) {
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    for (const file of ctx.req.files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
      ctx.body = "动态图片上传成功";
    }
  }
}

module.exports = new FileController();
