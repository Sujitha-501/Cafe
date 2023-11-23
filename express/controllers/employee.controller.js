const Signup = require('../models').signup;

const signUp = async function (req, res) {
  let err;
  let body = req.body;
  console.log('signUp: ', body);
  if (err) return ReE(res, err, 422);
  return ReS(res, { body });
}
module.exports.signUp = signUp;

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