const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


router.get('/register', (req, res) => {
    let messages = req.session.messages?.message;
    // clear session error msg
    req.session.messages = [];

    res.render('auth/register', { 
        title: 'Register',
        messages: messages
    });
});

router.post('/register', (req, res) => {
    //this is patch the virables for us, ensure we're not allow duplicate users
    //use User model to try creating a new user
    // User model extends passport-local-mongoose, so it does duplicate checks and hashes passwords
    User.register(new User({
            username: req.body.username
        }), req.body.password,
        (err, user) => {
            if (err) {
                // store error in session var so we can display it after redirecting
                console.log(err);
                req.session.messages = err;
                res.redirect('/auth/register');
            }
            else {
                res.redirect('/myhobby');
            }
        });
});


router.get('/login', (req, res) => {
    let messages = req.session.messages;
    req.session.messages = [];

    res.render('auth/login', { 
        title: 'Login',
        messages: messages
    });
});

//is success to login, take the users to myhobby page, if not, take them to login page
router.post('/login', passport.authenticate('local', {
    successRedirect: '/hobby/myhobby',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}));

// if there is error, then redirect to the main homepage
router.get('/logout', (req, res) => {
    req.session.messages = [];
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/');
    })
})

// google auth login
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}), (req, res) => {});
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/hobby/myhobby',
    failureRedirect: '/auth/login',
    failureMessage: 'Could not authenticate with Goggle'
}))

module.exports = router;