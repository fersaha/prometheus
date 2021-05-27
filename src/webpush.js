const webpush = require('web-push');
//console.log(process.env.PUBLIC_VAPID_KEY,process.env.PRIVATE_VAPID_KEY);
webpush.setVapidDetails('mailto:desarrollo@babuinotech.com',
                            process.env.PUBLIC_VAPID_KEY,
                            process.env.PRIVATE_VAPID_KEY);
module.exports = webpush;