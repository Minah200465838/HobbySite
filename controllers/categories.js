const express = require('express');
const router = express.Router();
const Category = require('../models/category.js');

// GET: /categories/create => show new category form
router.get('/create', (req, res) => {
    res.render('categories/create', {
        user: req.user
    });
});

// POST: /categories/create => process form submission to create a new category document in mongodb
router.post('/create', (req, res) => {
    Category.create(req.body, (err, newDocument) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

module.exports = router;