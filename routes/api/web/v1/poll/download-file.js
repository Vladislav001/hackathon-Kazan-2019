const fs = require('fs');

exports.post = function (req, res) {
    if(req.file){
        res.status(200).send({'href': '/public/uploads/' + req.file.originalname});
    }
}