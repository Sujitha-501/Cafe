const validator = require('validator');
const Signup = require('../models').signup;

const authUser = async function (userAccountInfo) {
  let emailId = userAccountInfo.email;
  let user;
  //Check the given email is valid email
  if (validator.isEmail(emailId)) {
    //findOne method to find the user for the given email id.
    [err, user] = await to(Signup.findOne({
      where: {
        email: emailId,
      },
    }));
    if (err) TE(err.message);
    if (!user) {
      TE(ERROR.invalid_credentials);
    }
  } else {
    TE(ERROR.invalid_email);
  }

  //For comparing the given password to the user instance
  [err, user] = await to(user.comparePassword(userAccountInfo.password));

  if (err) TE(err.message);

  return user;
}
module.exports.authUser = authUser;