const Order = require('../models').order;

// To create Order
const createOrder = async function (req, res) {
  let err;
  let body = req.body;
  [err, order] = await to(Order.bulkCreate(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { order });
}
module.exports.createOrder = createOrder;