const jwt = require('jwt-decode');

/**
 * Get the user from the auth token.
 *
 * @param {String} token JWT token from client.
 * @return {String} user email
 */
function getUserFromToken(token) {
  if (token && token.length) {
    token = jwt(token.slice(7, token.length));
    return token.email;
  }
  return null;
}

module.exports = {
  getUserFromToken
};
