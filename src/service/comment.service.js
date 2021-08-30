const connections = require("../app/database");
class CommentService {
  async create(momentId, comment, commentId = null, userId) {
    const statement = `INSERT INTO comment (moment_id, content, comment_id, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connections.execute(statement, [
      momentId,
      comment,
      commentId,
      userId,
    ]);
    return result;
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connections.execute(statement, [commentId]);
    return result;
  }
  async getCommentListByMomentId(momentId) {
    const statement = `
        SELECT 
            m.id, m.content, m.comment_id commentId, m.createAt createTime,
            JSON_OBJECT('id', u.id, 'name', u.name) user
        FROM comment m
        LEFT JOIN users u ON m.user_id = u.id
        WHERE moment_id = 40;
    `;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();
