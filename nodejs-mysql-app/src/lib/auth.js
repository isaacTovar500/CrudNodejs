module.exports = {

    isLogeedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggrdIn(req, res, next){
        if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/profile');
    }
};