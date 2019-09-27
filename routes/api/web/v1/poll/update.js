const fs = require('fs');
const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');

exports.post = function (req, res) {
    console.log(req.body._id);
    // try {
    //     let newPoll = new Poll();
    //     newPoll.title = req.body.title;
    //     newPoll.text = req.body.text;
    //     newPoll.video = req.body.video;
    //     newPoll.geo = req.body.geo;
    //     newPoll.date_created = new Date().getTime();
    //     newPoll.is_company = req.body.is_company;
    //     newPoll.age = req.body.age;
    //     newPoll.gender = req.body.gender;
    //     newPoll.location = req.body.location;
    //     newPoll.save();

    //     if(req.file)
    //     {
    //         let expantion = req.file.originalname.split('.')[1];
    //         fs.renameSync(`./public/uploads/${req.file.originalname}`, `./public/uploads/${newPoll._id}.${expantion}`);
    //         newPoll.image = '/uploads/' + newPoll._id;
    //     }
       
    //     req.body.questions.forEach(function(item, i, arr) {
    //         let newQuestion = new Question();
    //         newQuestion.title = item.title;
    //         newQuestion.type = item.type;
    //         newQuestion.options = item.options;
    //         newQuestion.poll_id = newPoll._id;
    //         newQuestion.save();
    //     });

    //     res.status(200).send('');
    // } catch (err) {
    //     res.status(403).send('');
    //     throw err;
    // }
}
