const Signup = require('../models').signup;

const signup = async function (req, res) {
  let err;
  let body = req.body;
  console.log('body:',req.body);
  [err, customer] = await to(Signup.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { customer });
}
module.exports.signup = signup;

const getDetails = async function (req, res) {
  let err;
  [err, response] = await to(Signup.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getDetails = getDetails;

const getCustomerDetails = async function (req, res) {
  let err;
  let body = req.body;
  [err, response] = await to(Signup.findAll({
    where: {
      role: body.role
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getCustomerDetails = getCustomerDetails;

const updateCustomer = async function (req, res) {
  let err;
  let body = req.body;
  [err, customerDetails] = await to(Signup.update(body, {
    where: {
      email: body.email
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { customerDetails });
}
module.exports.updateCustomer = updateCustomer;