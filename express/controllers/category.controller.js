const Category = require('../models').category;

// To create categories
const createCategory = async function (req, res) {
  let err;
  let body = req.body;
  [err, category] = await to(Category.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { category });
}
module.exports.createCategory = createCategory;

// Get the count of categories
const getCategoryCount = async function (req, res) {
  let err, categoryCount;
  [err, categoryCount] = await to(Category.count());
  if (err) return ReE(res, err, 422);
  return ReS(res, { categoryCount });
}
module.exports.getCategoryCount = getCategoryCount;

// Fetch all categories
const getCategory = async function (req, res) {
  let err;
  [err, response] = await to(Category.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getCategory = getCategory;

// update the categories
const updateCategory = async function (req, res) {
  let err;
  let body = req.body;
  [err, response] = await to(Category.update(body, {
    where: {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.updateCategory = updateCategory;