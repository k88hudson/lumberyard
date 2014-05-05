var request = require('request');
var jwt = require('jsonwebtoken');

exports = module.exports = function (config) {
  const url = config.BADGEKIT_USER_API_URL);
  return {
    setUserPermissions: function setUserPermissions(options, callback) {
      var data = {
        email: options.email,
        context: options.context,
        permissions: options.permissions
      }

      var token = {
        prn: JSON.parse(JSON.stringify(data)),
        method: 'POST',
        exp: new Date().getTime() + (1000 * 60),
        typ: 'JWT'
      }

      data.auth = jwt.sign(token, config.BADGEKIT_USER_API_SECRET);

      request.post(url, {form: data}, function (err, resp, body) {
        if (callback) {
          return callback(err);
        }
      });
    }
  };
};
