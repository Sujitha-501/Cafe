const Order = require('../models').order;
const Bills = require('../models').bills;

// To create Order
const createOrder = async function (req, res) {
  let err;
  let body = req.body;
  [err, order] = await to(Order.bulkCreate(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { order });
}
module.exports.createOrder = createOrder;

// To GET All Order
const getAllOrders = async function (req, res) {
  let err;
  [err, response] = await to(Order.findAll({
    where: {
      email: req.body.email,
      modified: req.body.modified
    },
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getAllOrders = getAllOrders;

// Get the count of Orders
const getOrderCount = async function (req, res) {
  let err;
  [err, response] = await to(Bills.count());
  if (err) return ReE(res, err, 422);
  const count = response.length;
  return ReS(res, { response });
}
module.exports.getOrderCount = getOrderCount;

// To create Bills
const createBills = async function (req, res) {
  let err;
  let body = req.body;
  [err, bills] = await to(Bills.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { bills });
}
module.exports.createBills = createBills;

// To GET All Bills
const getAllBills = async function (req, res) {
  let err;
  [err, response] = await to(Bills.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getAllBills = getAllBills;