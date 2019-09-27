const bCrypt = require('bcrypt-nodejs');

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports.isValidPassword = isValidPassword;
module.exports.createHash = createHash;