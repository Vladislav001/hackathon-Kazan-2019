const fs = require('fs');
const User = require('../../../../../models/user');
const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');
const firebase = require('../../../../../functions/firebase');

exports.post = async function(req, res) {
    try {
        let newPoll = new Poll();
        newPoll.title = req.body.title;
        newPoll.text = req.body.text;
        newPoll.video = req.body.video;
        newPoll.geo = req.body.geo;
        newPoll.date_created = new Date().getTime();
        newPoll.is_company = req.body.is_company;
        newPoll.age = req.body.age;
        newPoll.gender = req.body.gender;
        newPoll.location = req.body.location;
        newPoll.legal_type = req.body.legal_type;

        var file=req.body.image;
        console.log(file);
        if(file!=''){
            let expantion = file.split('.')[1];
            fs.renameSync('./public' + file, `./public/uploads/${newPoll.id}.${expantion}`);
            newPoll.image = '/uploads/' + newPoll.id + '.' + expantion;
        }

        newPoll.save();
       
        var newQuestions = [];
        req.body.questions.forEach(function(item, i, arr) {
            let newQuestion = new Question();
            newQuestion.title = item.title;
            newQuestion.type = item.type;
            newQuestion.options = item.options;
            newQuestion.poll_id = newPoll.id;
            newQuestion.save();
            newQuestions.push(newQuestion);
        });

        let newQuestion=newQuestions;
        
        let notificationData = {
            my_key: 'my value',
            my_another_key: 'my another value'
        };

        // filter
        let usersFilter = {};
        if (req.body.is_company == 1) {
            usersFilter.is_company = 1;
        } else if (req.body.is_company == 0) {
            usersFilter.is_company = 0;
            usersFilter.gender = gender;
            usersFilter['age.min'] = {$lte: age};
            usersFilter['age.max'] = {$gte: age};
        }

        let users = await User.find(usersFilter);

        users.forEach(function (item, i, arr) {
            if (item.firebase_token) {
                firebase.sendPushNotification(item.firebase_token, 'Пожалуйста, пройдите опрос',  item.title, notificationData);
            }
        });

        res.status(200).send({newPoll, newQuestion});
    } catch (err) {
        res.status(403).send('');
        throw err;
    }
};
