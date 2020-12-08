const express = require('express');
const { route } = require('./links');
const router = express.Router();

const passport = require('passport');
const { isLogeedIn, isNotLoggrdIn } = require('../lib/auth');

router.get('/signup', isNotLoggrdIn, (req, res) =>{
    res.render('auth/signup');
});

router.post('/signup', isNotLoggrdIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggrdIn, (req, res) => {
    res.render('auth/signin');
});

router.get('/signin', isNotLoggrdIn, (req, res) => {
    res.render('auth/signin');
});
router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLogeedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLogeedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;