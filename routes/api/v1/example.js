const Example = require('../../../models/example');

exports.post = async function (req, res) {
    try {
        let examples = await Example.find({});
        let data = [];

        examples.forEach(example => {
            example.file = `${req.headers['host']}/${example.file}`;
            data.push(example);
        });

        res.status(200).send(data);
    } catch (err) {
        throw err;
    }
};
