const apiError = require('../functions/apierror');

async function isAdmin(req, res, next) {

    let errors = [];
    
    try {
    
        if(res.user.role === "admin")
        {
            return next();
        }

        errors.push(apiError.createError("1", 'Введен неверный токен, или срок действия токена истек'));
        return res.status(403).json({
            errors
        });
       
    } catch (err) {
        throw err;
    }
}

module.exports = isAdmin;