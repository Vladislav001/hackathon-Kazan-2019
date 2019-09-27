const fs = require('fs');
const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');
const firebase = require('../../../../../functions/firebase');

exports.post = function (req, res) {
    try {
        let newPoll = new Poll();
        newPoll.title = req.body.title;
        newPoll.text = req.body.text;
        newPoll.video = req.body.video;
        newPoll.geo = req.body.geo;
        newPoll.date_created = new Date().getTime();
        newPoll.save();

        if(req.file)
        {
            let expantion = req.file.originalname.split('.')[1];
            fs.renameSync(`./public/uploads/${req.file.originalname}`, `./public/uploads/${newPoll._id}.${expantion}`);
            newPoll.image = '/uploads/' + newPoll._id;
        }
       
        req.body.questions.forEach(function(item, i, arr) {
            let newQuestion = new Question();
            newQuestion.title = item.title;
            newQuestion.type = item.type;
            newQuestion.options = item.options;
            newQuestion.poll_id = newPoll._id;
            newQuestion.save();
        });

        let notificationData = {
            my_key: 'my value',
            my_another_key: 'my another value'
        }
        firebase.sendPushNotification(res.user, 'Title of your push notification', 'Body of your push notification', notificationData);

        res.status(200).send('');
    } catch (err) {
        res.status(403).send('');
        throw err;
    }
}
