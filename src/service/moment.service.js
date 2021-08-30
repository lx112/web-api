const connections = require("../app/database");

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`;
    const result = await connections.execute(statement, [userId, content]);
    return result[0];
  }
  async getMomentById(momentId) {
    const statement = `
    SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        IF(COUNT(l.id),JSON_ARRAYAGG(
					JSON_OBJECT('id', l.id, 'name', l.name)
				),NULL) labels,
				(
					SELECT 
					IF(COUNT(c.id),
					JSON_ARRAYAGG(
						JSON_OBJECT(
						'id', c.id, 
						'content', c.content, 
						'commentId', c.comment_id, 
						'createTime', c.createAt, 
						'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
						)
					),NULL)
					FROM comment c 
					LEFT JOIN users cu ON c.user_id = cu.id 
					WHERE m.id = c.moment_id
				) comments
    FROM moment m 
    LEFT JOIN users u ON m.user_id = u.id
    LEFT JOIN moment_label ml ON ml.moment_id = m.id
    LEFT JOIN label l ON l.id = ml.label_id
    WHERE m.id = ?
    GROUP BY m.id;
    `;
    const result = await connections.execute(statement, [momentId]);
    return result[0];
  }
  async getList(size = 10, offset = 0) {
    const statement = `
    SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE m.id = c.moment_id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount
    FROM moment m 
    LEFT JOIN users u
    ON m.user_id = u.id 
    LIMIT ? OFFSET ?;
    `;
    const result = await connections.execute(statement, [size, offset]);
    return result[0];
  }
  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const result = await connections.execute(statement, [content, momentId]);
    return result[0];
  }
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const result = await connections.execute(statement, [momentId]);
    return result[0];
  }
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connections.execute(statement, [momentId, labelId]);
    return result.length;
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connections.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
