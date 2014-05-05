module.exports = function(badgekitClient, userClient, syste) {

  var BADGEKIT_API_SYSTEM = 'webmaker';

  return function(data, cb) {
    var permissionOptions = {
      email: data.email,
      context: { system: BADGEKIT_API_SYSTEM },
      permissions: { canReview: 'true' }
    };

    badgekitUserApi.setUserPermissions(permissionOptions);
    userClient.update.byEmail(data.email, {
      isCollaborator: true
    }, cb);

  };
};
