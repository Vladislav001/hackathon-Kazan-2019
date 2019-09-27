exports.get = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    }

    res.render('auth/login', { expressFlash: req.flash('message')} );
};