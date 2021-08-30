const connections = require("../app/database");

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUE (?);`;
    const [result] = await connections.execute(statement, [name]);
    return result;
  }
  async getLabelByName(name) {
    const statement = `SELECT id FROM label WHERE name = ?;`;
    const [result] = await connections.execute(statement, [name]);
    return result[0];
  }
  async list(size = 10, offset = 0) {
    const statement = `SELECT * FROM label LIMIT ? OFFSET ?;`;
    const [result] = await connections.execute(statement, [size, offset]);
    return result;
  }
}

module.exports = new LabelService();
