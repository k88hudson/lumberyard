var workers = require("./workers")({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  mofoStaffEmail: process.env.MOFO_STAFF_EMAIL,
  BADGEKIT_SYSTEM: process.env.BADGEKIT_SYSTEM || 'webmaker',
  BADGEKIT_USER_API_SECRET: process.env.BADGEKIT_USER_API_SECRET,
  BADGEKIT_USER_API_URL: process.env.BADGEKIT_USER_API_URL,
  MENTOR_BADGE_SLUG: process.env.MENTOR_BADGE_SLUG || 'webmaker-super-mentor',
  LOGIN_URL_WITH_AUTH: process.env.LOGIN_URL_WITH_AUTH
});

var SqsQueueParallel = require('sqs-queue-parallel');
var config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  name: process.env.INCOMING_QUEUE_NAME,
  region: process.env.AWS_QUEUE_REGION,
  debug: process.env.DEBUG
};

var queue = new SqsQueueParallel(config);

queue.on("message", function(m) {
  if (!workers[m.data.event_type] || !m.data.data) {
    return m.next();
  }

  workers[m.data.event_type](m.data.data,function(err) {
    if ( err ) {
      console.log(err);
      return m.next();
    }

    m.delete(function(err) {
      if ( err ) {
        console.log(err);
      }

      m.next();
    });
  });
});
