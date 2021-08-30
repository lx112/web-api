const errorTypes = require("../constans/error-types");

const errorHandle = (error, ctx) => {
  let message, status;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或密码不能为空！";
      break;
    case errorTypes.USER_ALLREADY_EXISTS:
      status = 409; // conflict
      message = "用户名已存在~";
      break;
    case errorTypes.USER_DOSE_NOT_EXISTS:
      status = 400; // Bad Request
      message = "用户不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400; // Bad Request
      message = "密码错误~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401; // 权限
      message = "无效token~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401; // 权限
      message = "您没有操作权限~";
      break;
    default:
      status = 500;
      message = "参数错误";
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;
