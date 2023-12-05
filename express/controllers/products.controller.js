const Products = require('../models').products;
const Category = require('../models').category;

// To Create the product
const createProduct = async function (req, res) {
  let err;
  let body = req.body;
  [err, product] = await to(Products.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { product });
}
module.exports.createProduct = createProduct;

// To get the product count
const getProductCount = async function (req, res) {
  let err;
  [err, productCount] = await to(Products.count({}));
  if (err) return ReE(res, err, 422);
  return ReS(res, { productCount });
}
module.exports.getProductCount = getProductCount;

// To fetch all product
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

// To fetch one product
const getOneProduct = async function (req, res) {
  let err;
  [err, response] = await to(Products.findOne({
    where: {
      id: req.body.id
    },
    include: [
      { model: Category}
    ]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getOneProduct = getOneProduct;

// To fetch one product
const getProductById = async function (req, res) {
  let err;
  [err, response] = await to(Products.findAll({
    where: {
      categoryId: req.body.id,
      status: req.body.status
    },
    include: [
      { model: Category}
    ]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getProductById = getProductById;

// To update the product
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

// To delete the product
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