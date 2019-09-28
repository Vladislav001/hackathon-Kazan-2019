const fs = require('fs');
const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');

exports.post = async function (req, res) {
    
    // var poll = await Poll.findOneAndUpdate({'_id': req.body._id}, function ());

    // console.log(poll);

    await Poll.updateOne({
        "_id": req.body._id
    }, {
        $set: {
            "title": req.body.title,
            "text": req.body.text,
            "video": req.body.video,
            "geo": req.body.geo,
            "date_created": req.body.date_created,
            "is_company": req.body.is_company,
            "age": req.body.age,
            "gender": req.body.gender,
            "location": req.body.location
        }
    });

    if(req.file)
    {
        let expantion = req.file.originalname.split('.')[1];
        fs.renameSync(`./public/uploads/${req.file.originalname}`, `./public/uploads/${req.body._id}.${expantion}`);
        newPoll.image = '/uploads/' + req.body._id;
    }

    req.body.questions.forEach(function(item, i, arr) {
        if(item._id!=undefined){
            Question.updateOne({
                "_id": item._id
            }, {
                $set: {
                    "title": item.title,
                    "type": item.type,
                    "options": item.options
                }
            });
        }
        else{
            let newQuestion = new Question();
            newQuestion.title = item.title;
            newQuestion.type = item.type;
            newQuestion.options = item.options;
            newQuestion.poll_id = req.body._id;
            newQuestion.save();
        }
    });

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

        res.status(200).send('');
    // } catch (err) {
    //     res.status(403).send('');
    //     throw err;
    // }
}
