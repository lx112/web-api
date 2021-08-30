const connections = require("../app/database");
class UserService {
  async create(user) {
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`;
    const result = await connections.execute(statement, [
      user.name,
      user.password,
    ]);
    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT id, name, password FROM users WHERE name=?;`;
    const result = await connections.execute(statement, [name]);

    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
    const result = await connections.execute(statement, [avatarUrl, userId]);

    return result;
  }
}

module.exports = new UserService();
