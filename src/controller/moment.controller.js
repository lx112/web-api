const service = require("../service/moment.service");
class MomentController {
  async create(ctx) {
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    const result = await service.create(userId, content);
    ctx.body = result;
  }
  async detail(ctx) {
    const { momentId } = ctx.params;
    const result = await service.getMomentById(momentId);
    result[0].test = 'test2';
    ctx.body = result[0];
  }
  async list(ctx) {
    const { size, offset } = ctx.query;
    const result = await service.getList(size, offset);
    ctx.body = result;
  }
  async update(ctx) {
    const result = await service.update(
      ctx.params.momentId,
      ctx.request.body.content
    );
    ctx.body = result;
  }
  async remove(ctx) {
    const result = await service.remove(ctx.params.momentId);
    ctx.body = result;
  }

  async addLabels(ctx) {
    const { momentId } = ctx.params;
    for (const label of ctx.labels) {
      const isExist = await service.hasLabel(momentId, label);
      if (!isExist) {
        await service.addLabel(momentId, label);
      }
    }
    ctx.body = "添加标签成功";
  }
}

module.exports = new MomentController();
