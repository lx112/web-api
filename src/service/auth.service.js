const connections = require("../app/database");

class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE user_id = ? AND id = ?;`;
    const result = await connections.execute(statement, [userId, id]);
    return result[0].length;
  }
}

module.exports = new AuthService();
