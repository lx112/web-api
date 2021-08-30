const errorTypes = require("../constans/error-types");
const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");
const { UNAUTHORIZATION } = require("../constans/error-types");
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  //   不为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  //   用户名存在
  const user = (await userService.getUserByName(name))[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOSE_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  //   校验密码
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log("验证授权");
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(UNAUTHORIZATION);
    console.log(err);
    ctx.app.emit("error", error, ctx);
  }
};

const verifyPermission = async (ctx, next) => {
  console.log("验证权限的middleware~");
  const tableName = Object.keys(ctx.params)[0].slice(0, -2);
  const tableId = ctx.request.params[`${tableName}Id`];
  const { id } = ctx.user;
  try {
    const isPermission = await authService.checkResource(
      tableName,
      tableId,
      id
    );
    if (!isPermission) throw new Error();
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
