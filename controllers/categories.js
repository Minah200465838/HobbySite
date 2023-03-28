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
router.post('/create', async (req, res) => {
    Category.create(req.body, async (err, newDocument) => {
        // if (err) {
        //     console.log(err);
        // }
        // else {
        //     res.redirect('/');
        // }
        // try {
        //     const employers = await Employer.find().sort('name');
        //     return res.json(employers).status(200);
        // }
        // catch (err) {
        //     return res.json(err).status(400);
        // }
    });
});

module.exports = router;