const service = require("../service/label.service.js");
const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body;
  const arr = [];
  for (const name of labels) {
    const label = await service.getLabelByName(name);
    if (!label) {
      const result = await service.create(name);
      arr.push(result.insertId);
    } else {
      arr.push(label.id);
    }
  }
  ctx.labels = arr;
  await next();
};

module.exports = {
  verifyLabelExists,
};
