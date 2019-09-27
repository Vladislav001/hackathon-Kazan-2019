exports.post = function (req, res) {
    let data = {
        key: "value"
    };

    res.status(200).send(data);
};