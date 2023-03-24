const express = require('express');
const router = express.Router();

// use Employer model for CRUD w/mongoose
const Hobby = require('../models/hobby');

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

// GET /create - 
router.get('/create', (req, res) => {
    res.render('hobby/create', {
        title: 'create'
    });
});

// POST /create - 
router.post('/create', (req, res) => {
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