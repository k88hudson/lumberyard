var UserClient = require("webmaker-user-client");

module.exports = function(config) {

  var mailer = require("webmaker-postalservice")({
    key: config.accessKeyId,
    secret: config.secretAccessKey
  });

  var badgekitClient = require("badgekit-api-client")(
    config.badgekitApiUrl, {
    key: config.badgekitApiKey,
    secret: config.badgekitApiSecret
  });

  var userClient = new UserClient({
    endpoint: config.loginUrlWithAuth
  });

  return {
    send_new_user_email: require("./create_user_emailer")(mailer),
    send_event_host_email: require("./create_event_emailer")(mailer),
    sign_up_for_bsd: require("./sign_up_for_bsd"),
    send_mofo_staff_email: require("./send_mofo_staff_email")(config.mofoStaffEmail, mailer),
    badge_awarded_send_email: require("./badge_awarded_send_email")(mailer),
    supermentor_awarded_set_permissions: require("./supermentor_awarded_set_permissions")(badgekitClient, userClient)
  };
};
