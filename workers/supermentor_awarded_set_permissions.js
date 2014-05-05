module.exports = function(badgekitUserApi, userClient, system) {

  return function(data, cb) {
    var permissionOptions = {
      email: data.email,
      context: { system: system },
      permissions: { canReview: 'true' }
    };

    badgekitUserApi.setUserPermissions(permissionOptions);
    userClient.update.byEmail(data.email, {
      isCollaborator: true
    }, cb);

  };
};
