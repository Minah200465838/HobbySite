const express = require('express');
const router = express.Router();

// use Employer model for CRUD w/mongoose
const Hobby = require('../models/hobby');

// global auth check to make most methods private
const global = require('../controllers/globalFunctions');

/** GET hobby index */
router.get('/myhobby', (req, res) => {
    res.render('hobby/myhobby', {
        title: 'myhobby'
    });
     //** get data from mongodb using the hobby model ** -> cause errors..//
    /*Hobby.find((err, hobby) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(employers);
            res.render('hobby/myhobby', {
                title: 'Hobby List',
                hobbys: hobbys,
                user: req.user
            });
        }
    });*/
    
});

router.get('/recommendation', (req, res) => {
    res.render('hobby/recommendation', {
        title: 'recommendation'
    });
});

// GET /create - display form to add an hobby */
// injected our auth check function as middleware for security
router.get('/create', global.isAuthenticated,  (req, res) => {
    res.render('hobby/create', {
        title: 'create'
    });
});
/*
// injected our auth check function as middleware for security
router.get('/create', global.isAuthenticated, (req, res) => {
    // use City model to fetch list of categories from db to populate city dropdown
    City.find((err, categories) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('hobby/create', {
                categories: categories,
                title: "Create a New Hobby you've done",
                user: req.user
            });
        }
    }).sort('name');    
});*/

// POST /create - 
router.post('/create', global.isAuthenticated, (req, res) => {
    Hobby.create(req.body, (err, newDocument) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/myhobby');
        }
    });
});





// make public
module.exports = router;