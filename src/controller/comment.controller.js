const service = require("../service/comment.service");
class CommentController {
  async create(ctx) {
    const { momentId, comment, commentId } = ctx.request.body;
    const { id } = ctx.user;
    if (comment) {
      const result = await service.create(momentId, comment, commentId, id);
      ctx.body = result;
    }
  }
  async remove(ctx) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = result;
  }
  async list(ctx) {
    const { momentId } = ctx.query;
    const result = await service.getCommentListByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();
