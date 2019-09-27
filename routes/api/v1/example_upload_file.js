const Example = require('../../../models/example');

exports.post = async function (req, res) {
    try {
        await Example.findOneAndUpdate(
            {"_id": req.body.id},
            {file: `uploads/${req.file.originalname}`}
        );

        res.status(200).send();
    } catch (err) {
        throw err;
    }
};
