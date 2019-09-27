function createError(id, message) {
    let error = {
        "error": id,
        "message": message,
    };

    return error;
}

module.exports.createError = createError;