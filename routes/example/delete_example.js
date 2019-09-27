const Example = require('../../models/example');

exports.post = async function (req, res) {
    try {

        await Example.deleteOne({ _id: req.params._id });

        res.status(200).send();
    } catch (err) {
        throw err;
    }
};