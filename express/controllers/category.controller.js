const Category = require('../models').category;

const createCategory = async function (req, res) {
  let err;
  let body = req.body;
  [err, category] = await to(Category.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { category });
}
module.exports.createCategory = createCategory;

const getCategory = async function (req, res) {
  let err;
  [err, response] = await to(Category.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getCategory = getCategory;

const updateCategory = async function (req, res) {
  let err;
  let body = req.body;
  [err, response] = await to(Category.update(body,{
    where : {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.updateCategory = updateCategory;