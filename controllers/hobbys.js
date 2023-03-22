const express = require('express');
const router = express.Router();

// use Employer model for CRUD w/mongoose
const Hobby = require('../models/hobby');

/** GET hobby index */
router.get('/myhobby', (req, res) => {
    res.render('hobby/myhobby', {
        title: 'myhobby'
    });
});

router.get('/recommendation', (req, res) => {
    res.render('hobby/recommendation', {
        title: 'recommendation'
    });
});

// GET
router.get('/create', (req, res) => {
    res.render('hobby/create', {
        title: 'create'
    });
});

// POST
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