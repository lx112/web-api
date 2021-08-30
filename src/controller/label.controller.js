const service = require("../service/label.service");
class LabelController {
  async create(ctx) {
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }
  async list(ctx) {
    const { size, offset } = ctx.request.query;
    const result = await service.list(size, offset);
    ctx.body = result;
  }
}

module.exports = new LabelController();
