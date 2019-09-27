const Example = require('../../models/example');

exports.get = async function (req, res) {
    try {
        let example = await Example.findOne({ _id: req.params._id });

        res.render('example/detail_example', {
            example: example
        });
    } catch (err) {
        throw err;
    }
};