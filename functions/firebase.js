const FCM = require('fcm-node');
const serverKey = 'AAAAihaAVx0:APA91bFCGHRn_Ch4HcbmE4ignRV5RA6kFyV81FhJZZEOV2YEZ53qiJUm8JntZ44CxyZrsDdMSbI8PqPa8DOxNfyA1GDUOlt3agEkdLjnRx_BDlUG_XGksHR4rgdGBMz3tKGIVdfKxJKQ';

function sendPushNotification(user, title, body, data) {
        let fcm = new FCM(serverKey);
        let message = {
        to: user.firebase_token,
        notification: {
            title: title,
            body: body
        },

        data: data
        };

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
}

module.exports.sendPushNotification = sendPushNotification;