const mysql = require("mysql2");

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require("./config");

const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    err ? console.log("数据库连接失败") : console.log("数据库连接成功");
  });
});

module.exports = connections.promise();
