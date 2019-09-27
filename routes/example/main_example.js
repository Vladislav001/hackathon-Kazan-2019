const Example = require('../../models/example');

exports.get = async function (req, res) {
    try {
        let examples = await Example.find({});

        res.render('example/main_example', {
            examples: examples
        });
    } catch (err) {
        throw err;
    }
};