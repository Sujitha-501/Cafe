const randToken = require('rand-token');
const authService = require('../services/auth.service');
const refreshTokens = {};

const login = async function (req, res) {
  let body = req.body;
  console.log('body: ', req.body);
  let err;
  [err, user] = await to(authService.authUser(body));
  if (user) {
    delete user.dataValues.password;
    var refreshToken = randToken.uid(256);
    refreshTokens[refreshToken] = {
      user: user
    };
    [err, token] = await to(user.getJWT());
    if (err) return ReE(res, err, 422);
    return ReS(res, { token, refreshToken: refreshToken, user: user });
  }
  if (err) return ReE(res, err, 422);
}
module.exports.login = login;

const refreshToken = async function (req, res) {
  const rToken = req.body.refreshToken;
  if (rToken in refreshTokens) {
    let err, token;
    [err, token] = await to(refreshTokens[rToken].user.getJWT());
    delete refreshTokens[rToken];
    return ReS(res, { accessToken: token });
  } else {
    return ReE(res, ERROR.invalid_token, 422);
  }
}
module.exports.refreshToken = refreshToken;