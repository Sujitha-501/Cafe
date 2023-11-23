const Products = require('../models').products;
const Category = require('../models').category;

const createProduct = async function (req, res) {
  let err;
  let body = req.body;
  [err, product] = await to(Products.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { product });
}
module.exports.createProduct = createProduct;

const getProduct = async function (req, res) {
  let err;
  [err, response] = await to(Products.findAll({
    include: [
      { model: Category}
    ]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getProduct = getProduct;

const updateProduct = async function (req, res) {
  let err;
  let body = req.body;
  [err, response] = await to(Products.update(body,{
    where : {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.updateProduct = updateProduct;

const deleteProduct = async function (req, res) {
  let err;
  let body = req.body;
  [err, deletePro] = await to(Products.destroy({
    where: {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { deletePro });
}
module.exports.deleteProduct = deleteProduct;