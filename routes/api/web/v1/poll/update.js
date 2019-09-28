const fs = require('fs');
const Poll = require('../../../../../models/poll');
const Question = require('../../../../../models/question');

exports.post = async function (req, res) {
    try{
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
        res.status(200).send('');
    } catch (err) {
        res.status(403).send('');
        throw err;
    }
}
