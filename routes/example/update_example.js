const Example = require('../../models/example');

exports.post = async function (req, res) {
    try {

        await Example.updateOne(
            {"_id": req.params._id},
            {
                $set:
                    {
                        name: req.body.name
                    }
            }
        );

        res.status(200).send();
    } catch (err) {
        throw err;
    }
}; 