const app = require("./app");
require("./app/database");
const { APP_PORT } = require("./app/config");

app.listen(APP_PORT, () => {
  console.log(`监听端口：${APP_PORT}`);
});
