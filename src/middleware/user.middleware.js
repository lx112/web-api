const errorTypes = require("../constans/error-types");
const UserService = require("../service/user.service");
const md5password = require("../utils/password-handle");

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //   不为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //   用户名已存在
  const result = await UserService.getUserByName(ctx.request.body.name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALLREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

// 加密中间件
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
